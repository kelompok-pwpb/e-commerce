<script>
import MainNavigation from '@/components/NavBar.vue';

export default {
    data() {
        return {
            navHeight:0
        };
    },
    components: {
        Navigation: MainNavigation
    },
    mounted() {
        const nav = document.quesrySelector('.navbar');

        this.navHeight = nav.ClientHeight;
    }
};
</script>
<template>
    <navigation />
    <section class="hero" :style="{ '--nav-height': `${navHeight}px` }">
    <div class="container">
      <section class="py-1">
        <div class="product-head">
          <div class="text-head">Our Crew</div>
        </div>
        <Slider />
      </section>
    </div>
  </section>
  <section class="about py-5"> 
    <div class="person d-flex justify-content-center align-items-center">
        <img class="mx-3" src="../assets/img/about/awek.jpg" alt="">
        <div class="about-text p-4 border border-black border-3 mx-5">
            <div class="ps-5">
                <h1>I Made Widya Pratama</h1> 
                <h2>SMKN 1 Denpasar</h2>
                <h2>30613</h2>
            </div>
        </div>
    </div>
    <div class="person d-flex justify-content-center align-items-center">
        <img class="mx-3" src="../assets/img/about/mangesa.jpg" alt="">
        <div class="about-text p-4 border border-black border-3 mx-5">
            <div class="ps-5">
                <h1>I Nyoman Kesava Mas Dhananjaya Rangkan</h1>
                <h2>SMKN 1 Denpasar</h2>
                <h2>30614</h2>
            </div>
        </div>
    </div>
    <div class="person d-flex justify-content-center align-items-center">
        <img class="mx-3" src="../assets/img/about/yoga.jpg" alt="">
        <div class="about-text p-4 border border-black border-3 mx-5">
            <div class="ps-5">
                <h1>I Wayan Yogi Natya Paramartha</h1> 
                <h2>SMKN 1 Denpasar</h2>
                <h2>30620</h2>
            </div>
        </div>
    </div>
    <div class="person d-flex justify-content-center align-items-center">
        <img class="mx-3" src="../assets/img/about/rheino.jpg" alt="">
        <div class="about-text p-4 border border-black border-3 mx-5">
            <div class="ps-5">
                <h1>Ngurah Gde Rheino Dharma Tenaya Perean</h1> 
                <h2>SMKN 1 Denpasar</h2>
                <h2>30628</h2>
            </div>
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

.about{
    background-color: #fcf5ed;
}

.about img{
    width: 300px;
    height: 400px;
    object-fit: cover;
    border-radius: 15px ;
    filter: grayscale(100%);
}

.person{
    margin-bottom: 30px;
}

.about-text{
    border-radius: 20px;
    width: 60%;
}

.about-text h1{
    font-weight: 700;
}
</style>