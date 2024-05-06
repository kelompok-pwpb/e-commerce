<script>
import MainNavigation from '@/components/NavBar.vue';
let id = 0;
export default {
  data() {
    return {
      navHeight: 0,
      products: [{
        name: 'udeng putih',
        price: 150000,
        img: 'udeng1.jpeg'
      },
      {
        name: 'udeng hitam',
        price: 200000,
        img: 'udeng5.jpg'
      }],
    };
  },
  components: {
    Navigation: MainNavigation
  },
  methods: {
    wrap(array) {
      return array.map(element => {
        return {
          ...element,
          id: id++
        }
      });
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
  <section class="hero" :style="{ '--nav-height': `${navHeight}px` }">
    <section class="">
      <div class="product-head">
        <div class="text-head">Udeng</div>
      </div>
    </section>
  </section>
  <section class="products px-5">
    <div class="container">
      <div class="ass d-flex align-items-center mt-5 justify-content-between">
        <div class="filter me-5">
          <select class="form-select filter border-black" aria-label="Default select example">
            <option selected>Udeng</option>
            <option value="1">Kemeja Pria</option>
            <option value="2">Saput Songket</option>
            <option value="3">kamen Batik</option>
            <option value="4">Sandal</option>
          </select>
        </div>
        <div class="search-con input-group shadow">
          <input class="search px-4 py-2" type="text" placeholder="search">
          <button class="search button px-3"><i class="bi bi-search"></i></button>
        </div>
      </div>
      <div class="py-5 row ">

        <!-- <div class="product col-3" v-for="product in wrap(products)" :key="product.id">
          <img :src="`@/assets/img/products/udeng/${ product.img }`" class="card-img-top" alt="..." />
          <div class="product-text text-center">
            <h4 class="my-3">{{ product.name }}</h4>
            <div class="star d-flex justify-content-center">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="price my-3 py-2 px-3 border border-3 border-black mx-auto">
              <span> Rp. {{ product.price }}</span>
            </div>
          </div>
        </div> -->
        <div class="product p-3 col-3">
          <div>
            <div  class="d-block position-relative product-img shadow">
              <a href="/product" class=" product-img-wrapper">
                <!-- <img src="../assets/img/products/udeng/udeng4.jpeg" class="card-img-top" alt="..." /> -->
                <img src="../assets/img/products/udeng/udeng1.jpeg" class="card-img-top" alt="..." />
              </a>
              <div class="product-detail-button">
                <a href="/product" class="text-decoration-none">Lihat Detail</a>
              </div>
            </div>
            <div class="product-text text-center">
              <h1 class="product-title">Udeng Putih Sutra</h1>
              <div class="star d-flex justify-content-center">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <div class="price my-3 py-2 px-3 border border-3 border-black mx-auto">
                <span>$15.00</span>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="product shadow p-3 col-3" >
          <img src="../assets/img/products/udeng/udeng3.jpeg" class="card-img-top" alt="..." />
          <div class="product-text text-center">
            <h4 class="my-3">Udeng Putih Sutra</h4>
            <div class="star d-flex justify-content-center">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="price my-3 py-2 px-3 border border-3 border-black border-black mx-auto">
              <span>$15.00</span>
            </div>
          </div>
        </div>
        <div class="product shadow p-3 col-3" >
          <img src="../assets/img/products/udeng/udeng4.jpeg" class="card-img-top" alt="..." />
          <div class="product-text text-center">
            <h4 class="my-3">Udeng Putih Sutra</h4>
            <div class="star d-flex justify-content-center">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="price my-3 py-2 px-3 border border-3 border-black mx-auto">
              <span>$15.00</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero {
  padding-top: calc(var(--nav-height) + 10px);
  background-color: #fcf5ed;
}

.product-head {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(@/assets/img/products/banner.jpg);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  padding: 5rem 0px;
  transition: all 500ms;
  background-attachment: fixed;
  margin-bottom: 30px;
}

.text-head {
  font-size: 2rem;
  font-family: 'poppins', sans-serif;
  font-weight: 600;
}



.button{
  background-color: #DC5F00;
  color: #fcf5ed;
}

.button:hover{
  background-color: #C40C0C;
}

.filter {
  width: 150px;
}

.product {
  margin: 0.5rem 0;
  border-radius: 15px;
}

.product img {
  border-radius: 35px;
  object-fit: cover;
}

.product-text h4 {
  font-family: "Poppins", serif;
  color: #000000;
  font-weight: 700;

}

.star i {
  color: #FFD600;
  font-size: 1.4rem;
  margin: 0 5px;
}

.price {
  border-radius: 15px;
  max-width: fit-content;
}


.product-title {
  font-size: 1.5rem;
  margin-block: 15px;

}
.product-detail-button a{
  color: white;

}
.product-detail-button {
  position: absolute;
  opacity: 0;
  width: 100%;
  visibility: hidden;
  background-color: black;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  padding-block: 5px;
  /* font-family: 'Poppins',sans-serif; */
  text-align: center;
  bottom: 0;
  transition: all 500ms;
}

.product-img {
  border-radius: 8px;
  overflow: hidden;
}

.product-img:hover>.product-detail-button,.product-img:active>.product-detail-button{
  opacity: 100%;
  visibility: visible
}

.search-con{
  width: fit-content;   
  border-radius: 5px;

}

.search{
  border-radius: 5px;
  border: none;
}

@media only screen and (min-width:1700px) {
  .product {
    width: 500px;
  }

  .product img {
    height: 600px;
  }
}

@media only screen and (max-width:1000px) {
  .filter {
    width: 100%;
  }

  .product {
    width: 100%;
  }

  .search-con{
    margin: 1rem;
  }

  .ass{
    flex-direction: column;
  }
}
</style>
