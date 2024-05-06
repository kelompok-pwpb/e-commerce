<script>
import MainNavigation from '@/components/NavBar.vue';
import FirstSlider from '@/components/FirstSlider.vue';
import MainFooter from '@/components/MainFooter.vue';

export default {
  components: {
    Navigation: MainNavigation,
    Slider: FirstSlider,
    Footer: MainFooter
  }
};
</script>
<template>
  <Navigation />
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center">
          <div class="start-text">
            <h1>Balinesse <br />Yourself</h1>
            <h5>Make yourself look local but still Royal</h5>
            <div class="btn-conteiner">
              <a class="btn-content" href="#">
                <span class="btn-title">NEXT</span>
                <span class="icon-arrow">
                  <svg
                    width="66px"
                    height="43px"
                    viewBox="0 0 66 43"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path
                        id="arrow-icon-one"
                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        id="arrow-icon-two"
                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        id="arrow-icon-three"
                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 d-flex justify-content-center pic">
          <img src="@/assets/img/pasangan.png" alt="" class="hero-pic" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-1 product-bg">
    <div class="product-head">
      <div class="text-head">Make Your Own Style</div>
      <h3>Balinesse</h3>
    </div>
    <div class="order-now container-fluid">
      <div class="model py-3">
        <div class="row">
          <div class="col-lg-5 d-flex justify-content-end pt-5 px-5">
            <div class="model1 justify-content-end d-flex">
              <img src="@/assets/img/model/Model1.jpg" alt="" width="70%" />
            </div>
          </div>
          <div
            class="col-lg-7 d-flex align-items-start flex-column justify-content-center text-model"
          >
            <h3>Make Yourself Beautiful</h3>
            <p>
              Baliness Style is not just a common style, it is a fashion and art of the Baliness
              People. This Style is not just only for Baliness People of course, but the style can
              go international
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-lg-7 d-flex align-items-end flex-column justify-content-center text-model2"
          >
            <h3>Hot Style in The World</h3>
            <p>
              Baliness Style is Cool for a Man, and so Beautiful for Woman. The Pattern of Baliness
              style is so complicated, that's why our style is so Rare Find.
            </p>
          </div>
          <div class="col-lg-5 d-flex justify-content-start py-5 px-5">
            <div class="model1">
              <img src="@/assets/img/model/Model2.jpeg" alt="" width="70%" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="product-title">
        <div class="text-title">Discover</div>
        <h3>Our Product</h3>
      </div>
      <Slider />
    </div>
  </section>

  <Footer />
</template>
<style scoped>
.hero {
  background: #fcf5ed;
}
.hero-pic {
  padding-top: 8rem;
  padding-bottom: 3rem;
  height: 100vh;
}
.start-text {
  font-family: 'prata', sans-serif;
  padding-left: 5rem;
  padding-top: 2rem;
}
.start-text h1 {
  font-size: 8rem;
}
.start-text h5 {
  font-family: 'poppins', sans-serif;
  font-weight: 400;
  padding-left: 20px;
}
.btn-conteiner {
  display: flex;
  padding-block: 20px;
  padding-left: 20px;
  --color-text: #ffffff;
  --color-background: #dc5f00;
  --color-outline: #cf0a0a;
  --color-shadow: #00000080;
}
.btn-content {
  display: flex;
  padding: 2px 30px;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 30px;
  color: var(--color-text);
  background: var(--color-background);
  transition: 1s;
  border-radius: 100px;
  box-shadow: 0 0 0.2em 0 var(--color-background);
}
.btn-content:hover,
.btn-content:focus {
  transition: 0.5s;
  -webkit-animation: btn-content 1s;
  animation: btn-content 1s;
  outline: 0.1em solid transparent;
  outline-offset: 0.2em;
  box-shadow: 0 0 0.4em 0 var(--color-background);
}
.btn-content .icon-arrow {
  transition: 0.5s;
  margin-right: 0px;
  transform: scale(0.6);
}
.btn-content:hover .icon-arrow {
  transition: 0.5s;
  margin-right: 25px;
}
.icon-arrow {
  width: 20px;
  margin-left: 15px;
  position: relative;
  top: 0%;
}
/* SVG */
#arrow-icon-one {
  transition: 0.4s;
  transform: translateX(-60%);
}
#arrow-icon-two {
  transition: 0.5s;
  transform: translateX(-30%);
}
.btn-content:hover #arrow-icon-three {
  animation: color_anim 1s infinite 0.2s;
}
.btn-content:hover #arrow-icon-one {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.6s;
}
.btn-content:hover #arrow-icon-two {
  transform: translateX(0%);
  animation: color_anim 1s infinite 0.4s;
}
.product-head {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(@/assets/img/temple.jpg);
  background-position: center;
  background-repeat: no-repeat;
  padding: 60px 0px;
  transition: all 500ms;
  background-attachment: fixed;
}
.text-head {
  font-size: 2rem;
  font-family: 'poppins', sans-serif;
  font-weight: 600;
}
.product-head h3 {
  font-family: 'courgette', sans-serif;
  font-size: 2.5rem;
  color: #cf0a0a;
  margin: 0px;
}
.product-title {
  font-family: 'poppins', sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(@/assets/img/temple.jpg);
  background-position: center;
  background-repeat: no-repeat;
  padding: 60px 0px;
  transition: all 500ms;
  background-attachment: fixed;
}
.product-title h3 {
  font-weight: 600;
  font-size: 2.6rem;
  color: white;
  margin: 0px;
}
.product-bg {
  background: #fcf5ed;
}
.model1 {
  overflow: hidden;
  border-radius: 15px;
}
.model1 img {
  overflow: hidden;
  border-radius: 15px;
  aspect-ratio: 1/1;
  transition: all 500ms;
}
.model1 img:hover {
  transform: scale(1.1);
}
.text-model p {
  width: 60%;
  font-size: 1.3rem;
}
.text-model2 p {
  text-align: end;
  width: 60%;
  font-size: 1.3rem;
}
.text-model h3 {
  font-size: 2.6rem;
}
.text-model2 h3 {
  font-size: 2.6rem;
}
.text-title {
  font-family: 'courgette', sans-serif;
  font-size: 2rem;
  color: #dc5f00;
}

/* SVG animations */
@keyframes color_anim {
  0% {
    fill: white;
  }

  50% {
    fill: var(--color-background);
  }

  100% {
    fill: white;
  }
}

/* Button animations */
@-webkit-keyframes btn-content {
  0% {
    outline: 0.2em solid var(--color-background);
    outline-offset: 0;
  }
}

@keyframes btn-content {
  0% {
    outline: 0.2em solid var(--color-background);
    outline-offset: 0;
  }
}

@media screen and (max-width: 393px) {
  .start-text {
    padding-left: 0;
    padding-top: 2rem;
    text-align: center;
  }
  .start-text h1 {
    font-size: 3rem;
  }
  .start-text h5 {
    padding-left: 10px;
    font-size: 1.2rem;
  }
  .btn-conteiner {
    padding-left: 10px;
    justify-content: center;
  }
  .pic {
    order: -1;
  }
  .hero-pic {
    padding-top: 1rem;
    margin-top: 4rem;
    padding-bottom: 0;
    width: 100%;
    height: 50vh;
  }
}
</style>
