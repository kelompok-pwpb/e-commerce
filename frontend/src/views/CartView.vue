<script>
import MainNavigation from '@/components/NavBar.vue';
let id = 0;
export default {
  data() {
    return {
      navHeight: 0,
      counter: 3
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
    decrement() {
      this.counter = Math.max(0, this.counter - 1);
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
  <div class="hero">
    <section class="py-1">
      <div class="product-head">
        <div class="text-head">Keranjang Anda</div>
      </div>
    </section>
  </div>
  <section class="body py-5">
    <div class="cart mx-5">
      <div class="container">
        <div class="title px-4 py-1 border-3"><span>Keranjang Anda</span></div>
        <section class="item my-3 p-4 border border-black border-3">
          <div class="d-flex align-items-between">
            <img src="../assets/img/products/udeng/udeng1.jpeg" alt="" />
            <div class="des mx-5">
              <h1>Udeng Putih Sutra</h1>
              <div class="star d-flex my-4">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <div class="deskripsi">
                <h4>deskripsi</h4>
                <p>
                  Udeng Batik Bali dengan Motif Bunga Eksotis. Udeng ini dibuat dengan teliti
                  menggunakan kain katun berkualitas tinggi
                </p>
              </div>
              <div class="d-flex y-5">
                <div class="item-counter d-flex align-items-center border border-black border-2">
                  <button @click="decrement" class="py-2 px-3" id="decrement-btn">-</button>
                  <div id="counter-value" class="number py-2 px-3">{{ counter }}</div>
                  <button @click="increment" class="py-2 px-3" id="increment-btn">+</button>
                </div>
                <div class="price mx-4 py-2 px-3 border border-2 border-black">
                  <span>Rp.150.000</span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between mx-3 mt-3">
            <h3>Stok: 30</h3>
            <div class="addcart">
              <div type="button" class="btn btn-outline-warning px-5 py-2">Checkout</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
<style scoped>
.hero {
  background-color: #fcf5ed;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(@/assets/img/products/banner.jpg);
  /* padding-top: calc(var(--nav-height) + 10px); */
}

.product-head {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-repeat: no-repeat;
  padding: 60px 0px;
  transition: all 500ms;
  background-attachment: fixed;
  margin-bottom: 30px;
}

.text-head {
  font-size: 2rem;
  font-family: 'poppins', sans-serif;
  font-weight: 600;
}

.body {
  background-color: #fcf5ed;
}

.title {
  border-radius: 10px;
  max-width: fit-content;
  font-size: 1.5rem;
  font-weight: 500;
  border-style: solid;
  border-color: #dc5f00;
  color: #dc5f00;
}

.item img {
  width: 30%;
}

.star i {
  color: #ffd600;
  font-size: 1.4rem;
  margin: 0 2px;
}

.deskripsi p {
  font-size: 1.2rem;
}

.item {
  border-radius: 20px;
}

.price {
  border-radius: 5px;
  max-width: fit-content;
}

.item-counter {
  width: fit-content;
  border-radius: 5px;
}

.item-counter button {
  border: none;
  background-color: transparent;
}

.item-counter button:hover {
  background-color: #ffc55a;
}
</style>
