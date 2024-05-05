<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, defineModel, onMounted, onBeforeMount } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const insertForm = ref();
const toast = useToast();

const insertModel = ref({
  name: '',
  stock: 0,
  price: 0,
  category: '',
  img: '',
  description: ''
});
const handleOnchangeFile = (e) => {
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;

  console.log(files[0]);
  insertModel.value.img = files[0];
};
// const send =
const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
  { label: 'INSTOCK', value: 'instock' },
  { label: 'LOWSTOCK', value: 'lowstock' },
  { label: 'OUTOFSTOCK', value: 'outofstock' }
]);
const card = ref();
const cardWidth = ref();

onMounted(() => {
  cardWidth.value = card.value.clientWidth;
});
const productService = new ProductService();

const getBadgeSeverity = (inventoryStatus) => {
  switch (inventoryStatus.toLowerCase()) {
    case 'instock':
      return 'success';
    case 'lowstock':
      return 'warning';
    case 'outofstock':
      return 'danger';
    default:
      return 'info';
  }
};

onBeforeMount(() => {
  initFilters();
});
onMounted(() => {
  productService.getProducts().then((data) => (products.value = data));
});
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};

const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
const errorMapper = (error) => {
  const obj = {};
  error.forEach((e) => {
    obj[e.path[0]] = e.message;
  });

  return obj;
};

const insertErrorField = ref();
const saveProduct = async () => {
  const value = insertModel.value;

  const form = new FormData();

  Object.keys(value).forEach((formKey) => {
    form.append(formKey, value[formKey]);
  });
  console.log(Object.fromEntries(form), 'form');
  let err;
  const result = await axios.post('/product/create', form).catch((e) => {
    err = e;
  });

  if (err) {
    console.log(err);
    const errorInstance = err.response.data;
    if (errorInstance.code === 'ERR_CATEGORY_NOT_FOUND') {
      insertErrorField.value = {
        category: 'category not found'
      };
      return;
    }
    insertErrorField.value = errorMapper(errorInstance.error);
    console.log(insertForm.value);
    console.log(err.response.data.error);
  }
};

const editProduct = (editProduct) => {
  product.value = { ...editProduct };
  productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
  product.value = editProduct;
  deleteProductDialog.value = true;
};

const deleteProduct = () => {
  products.value = products.value.filter((val) => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const createId = () => {
  let id = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const exportCSV = () => {
  dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
  products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  };
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card" ref="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="New"
                icon="pi pi-plus"
                class="mr-2"
                severity="success"
                @click="openNew"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                severity="danger"
                @click="confirmDeleteSelected"
                :disabled="!selectedProducts || !selectedProducts.length"
              />
            </div>
          </template>

          <template v-slot:end>
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="products"
          v-model:selection="selectedProducts"
          dataKey="id"
          :rows="10"
          :filters="filters"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Manage Products</h5>
              <IconField iconPosition="left" class="block mt-2 md:mt-0">
                <InputIcon class="pi pi-search" />
                <InputText
                  class="w-full sm:w-auto"
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </IconField>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column
            field="code"
            header="Code"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.code }}
            </template>
          </Column>
          <Column
            field="name"
            header="Name"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Image" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <span class="p-column-title">Image</span>
              <img
                :src="'/demo/images/product/' + slotProps.data.image"
                :alt="slotProps.data.image"
                class="shadow-2"
                width="100"
              />
            </template>
          </Column>
          <Column
            field="price"
            header="Price"
            :sortable="true"
            headerStyle="width:14%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Price</span>
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column
            field="category"
            header="Category"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Category</span>
              {{ slotProps.data.category }}
            </template>
          </Column>

          <Column
            field="inventoryStatus"
            header="Status"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Status</span>
              <Tag :severity="getBadgeSeverity(slotProps.data.inventoryStatus)">{{
                slotProps.data.inventoryStatus
              }}</Tag>
            </template>
          </Column>
          <Column
            field="action"
            header="Action"
            :sortable="true"
            headerStyle="width:14%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rating</span>
              <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="mr-2"
                severity="success"
                rounded
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="mt-2"
                severity="warning"
                rounded
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>

          <!-- <ColumnGroup type="footer">
            <Row>
              <Column :colspan="5" footerStyle="text-align:right">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </Column>
            </Row>
          </ColumnGroup> -->
          <ColumnGroup type="footer">
            <Row>
              <Column
                :colspan="10"
                footerStyle="text-align:center"
                :style="{
                  width: `${cardWidth}px`
                }"
                :footer="'test'"
              />
            </Row>
          </ColumnGroup>
        </DataTable>
        <div>shjdbsdjk</div>

        <Dialog
          v-model:visible="productDialog"
          :style="{ width: '450px' }"
          header="Product Details"
          :modal="true"
          class="p-fluid"
        >
          <img
            :src="'/demo/images/product/' + product.image"
            :alt="product.image"
            v-if="product.image"
            width="150"
            class="mt-0 mx-auto mb-5 block shadow-2"
          />

          <div class="field">
            <label for="name">Name</label>
            <InputText name="name" id="name" required="true" v-model="insertModel.name" />
            <small class="p-invalid" v-if="insertErrorField?.name">{{
              insertErrorField.name
            }}</small>
          </div>
          <div class="field">
            <label for="description">Description</label>
            <Textarea
              name="description"
              id="description"
              v-model="insertModel.description"
              required="true"
              rows="3"
              cols="20"
            />
            <small class="p-invalid" v-if="insertErrorField?.description">{{
              insertErrorField.description
            }}</small>
          </div>
          <div class="field">
            <div>
              <label for="inventoryStatus" class="mb-3">Image</label>
              <input
                type="file"
                id="myFile"
                @change="handleOnchangeFile($event, insertModel.img)"
                name="img"
              />
            </div>
            <small class="p-invalid" v-if="insertErrorField?.img">img should be jpg,png</small>
          </div>
          <div class="field">
            <label class="mb-3">Category</label>
            <Dropdown
              name="category"
              id="inventoryStatus"
              v-model="insertModel.category"
              :options="statuses"
              optionLabel="label"
              placeholder="Select a Status"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.value">{{
                    slotProps.value.label
                  }}</span>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                    slotProps.value
                  }}</span>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
            </Dropdown>
            <small class="p-invalid" v-if="insertErrorField?.category">{{
              insertErrorField.category
            }}</small>
          </div>
          <div class="formgrid grid">
            <div class="field col">
              <label for="price">Price</label>
              <InputNumber
                name="price"
                id="price"
                mode="currency"
                v-model="insertModel.price"
                currency="IDR"
                locale="en-US"
                :required="true"
              />
              <small class="p-invalid" v-if="insertErrorField?.price">{{
                insertErrorField.price
              }}</small>
            </div>
            <div class="field col">
              <label for="quantity">Stock</label>
              <InputNumber id="quantity" integeronly name="stock" v-model="insertModel.stock" />
              <small class="p-invalid" v-if="insertErrorField?.stock">{{
                insertErrorField.stock
              }}</small>
            </div>
          </div>
          <template #footer>
            <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" text="" @click="saveProduct" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product"
              >Are you sure you want to delete <b>{{ product.name }}</b
              >?</span
            >
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteProductsDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete the selected products?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
