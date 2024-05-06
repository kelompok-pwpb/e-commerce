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
          <div class="text-head">Contact</div>
        </div>
        <Slider/>
      </section>
    </div>
  </section>

    <section id="contact">
        <div class="wpp">
            <div class="container5">          
              <div class="card-container5">
                <div class="left">
                  <div class="left-container5">
                    <h2>Terimakasih</h2>
                    <h2>Telah Berkunjung</h2>
                    <br>
                    </div>
                </div>
                    <div class="right">
                      <div class="right-container5">
                        <form action="">
                          <h2 class="lg-view">Contact</h2>
                          <input type="text" placeholder="Nama...">
                          <input type="text" placeholder="Nama Belakang...">
                          <input type="email" placeholder="Email...">
                          <input type="phone" placeholder="Telp..." autocomplete="off">
                          <textarea rows="10" placeholder="Pesan..."></textarea>
                          <button>Kirim</button>
                        </form>
                      </div>
                    </div>
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

.contact{
    width: 100%;
    height: 100vh;
}

.wpp {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  height: 100vh;
  padding: 30px;
  padding-top: 120px;
  padding-bottom: 60px;
}

.container5 {
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.80), 0 10px 10px rgba(0, 0, 0, 0.80);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 522px;
  min-width: 370px;
}

.card-container5 {
  display: flex;
  flex-wrap: wrap;
}

.left {
  flex: 1;
  height: 480px;
  background-image: linear-gradient(rgba(0,0,0,0.30),rgba(0,0,0,0.30)),url(@/assets/img/products/balibatik.jpg);
}

.right {
  display: flex;
  flex: 1;
  height: 460px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  color: black;
}

.left {
  display: flex;
  flex: 1;
  height: 522px;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-shadow: 3px 3px black;
}

.left-container5 {
  height: 50%;
  width: 80%;
  text-align: center;
  line-height: 22px
}

h2 {
  font-weight: 750;
  font-size: 2.1rem;
  margin-bottom: 1rem;
}

.right-container5 {
  width: 70%;
  height: 80%;
  text-align: center;
}

input,
textarea {
    border-radius: 7px;
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  font-size: 0.8rem;
}

input:focus,
textarea:focus {
  outline: 2px solid #750E21;
}

button {
  border-radius: 20px;
  border: 1px solid #750E21;
  background-color: #750E21;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-out;
  cursor: pointer;
}

button:hover {
  opacity: 0.7;
}

textarea {
  height: 90px;
}
@media (max-width: 700px){
  #contact .wpp{
      padding-top: 140px;
  }
  #contact .left {
      display: none;
      flex: none;
      height: 522px;
      justify-content: center;
      align-items: center;
      color: #ffffff;
  }
}
</style>