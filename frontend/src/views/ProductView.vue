<script>
import MainNavigation from '@/components/NavBar.vue';
let id = 0;
export default {
  data() {
    return {
      navHeight: 0,
      counter: 1
    };
  },
  components: {
    Navigation: MainNavigation
  },
  methods: {
    wrap(array) {
      return array.map((element) => {
        return {
          ...element,
          id: id++
        };
      });
    },
    increment() {
      this.counter++;
    },
    decrement(){
      this.counter = Math.max(0,this.counter - 1);
      // this.counter--;  
    }
  },

  mounted() {
    const nav = document.querySelector('.navbar');

    this.navHeight = nav.clientHeight;
  }
};
</script>
<template>
  <navigation />
  <section class="hero py-5">
    <div class=" py-5">
      <div class="container product">
        <div class="row gx-5">
          <div class="col-md-4 col-12">
            <img src="../assets/img/products/udeng/udeng1.jpeg" class="pro-img  shadow w-100" alt="" />
          </div>
          <div class="col-md-6 col-12">
            <div class="name pt-5">
              <h1>Udeng Putih Sutra</h1>
              <div class="star d-flex my-4">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <div class="price text-start my-4 py-2 px-3 border border-2 border-black">
                <span>Rp. 150.000</span>
              </div>
            </div>
            <h4 class="text-end">Stock : 30</h4>
          </div>
        </div>
        <div class="deskripsi mt-5 mb-4">
          <h3>Deskripsi</h3>
          <div class="des-body">
            <h5>
              Udeng Batik Bali dengan Motif Bunga Eksotis. Udeng ini dibuat dengan teliti
              menggunakan kain katun berkualitas tinggi
            </h5>
          </div>
        </div>
        <div class="add d-flex justify-content-between">
          <div class="item-counter d-flex align-items-center border border-black border-2">
            <button @click="decrement" class="py-2 px-3" id="decrement-btn">-</button>
            <div id="counter-value" class="number py-2 px-3">{{ counter }}</div>
            <button @click="increment" class="py-2 px-3" id="increment-btn">+</button>
          </div>
          <div class="addcart">
            <div type="button" class="btn btn-outline-warning px-3">Masukan keranjang</div>
          </div>
        </div>
        <div class="review my-5">
          <h3>Review</h3>
          <div class="user border border-black border-3 p-3">
            <div class="profile d-flex align-items-center">
              <img src="..\assets\img\mengesa.jpg" alt="">
              <div class="username mx-4">
                <h4>Mang Esa</h4>
                <div class="star d-flex">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              </div>
            </div>
            <div class="comments my-2">
              <h5>Comments</h5>
              <p>makin lama produk bali semakin hitam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero {
  /* background-color: #fcf5ed; */
  font-family: 'Poppins', serif;
}

.product {
  width: 80%;
}

.pro-img {
  border-radius: 20px;
  width: 400px;
}

.title h1 {
  color: #000000;
  font-weight: 700;
}

.star i {
  color: #ffd600;
  font-size: 1.4rem;
  margin: 0 2px;
}

.price {
  font-size: 1.4rem;
  border-radius: 15px;
  max-width: fit-content;
  font-family: 'Poppins', serif;
  font-weight: 500;
}

h3 {
  font-weight: 700;
}

.item-counter{
  width: fit-content; 
  border-radius: 5px;
}

.item-counter button{
  border: none;
  background-color: transparent;
}

.item-counter button:hover{
  background-color: #FFC55A;
}

.user{
  border-radius: 20px;
}

.profile img{
  width: 90px;
  border-radius: 50%;
}
</style>
