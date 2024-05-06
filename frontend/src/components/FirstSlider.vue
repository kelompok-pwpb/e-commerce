<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
const gap = 16;

const carousel = ref();
const content = ref();
const next = ref();
const prev = ref();

function nexthandler() {
  carousel.value.scrollBy(width.value + gap, 0);
  if (carousel.value.scrollWidth !== 0) {
    prev.value.style.display = 'flex';
  }
  if (content.value.scrollWidth - width.value - gap <= carousel.value.scrollLeft + width.value) {
    next.value.style.display = 'none';
  }
}

function handlePrev() {
  carousel.value.scrollBy(-(width.value + gap), 0);
  if (carousel.value.scrollLeft - width.value - gap <= 0) {
    prev.value.style.display = 'none';
  }
  if (!content.value.scrollWidth - width.value - gap <= carousel.value.scrollLeft + width.value) {
    next.value.style.display = 'flex';
  }
}

let width = ref(200);
function handleResize() {
  // width.value = carousel.value.offsetWidth;
}
let abortController;
onMounted(() => {
  abortController = new AbortController();
  const { signal } = abortController;
  window.addEventListener('resize', handleResize, { signal: signal });
});
onUnmounted(() => {
  abortController.abort();
});
</script>
<template>
  <div class="slider px-3 justify-content-center d-flex py-3">
    <div id="wrapper">
      <div ref="carousel" class="carousel px-3 py-3">
        <div ref="content" class="content">
          <div class="sub-content py-3 d-flex flex-column align-items-center">
            <img src="@/assets/img/slider1/Kamen1.png" class="item" />
            <h5>Saput Songket & Udeng</h5>
            <div class="star">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
          </div>
          <div class="sub-content py-3 d-flex flex-column align-items-center">
            <img src="@/assets/img/slider1/Kamen2.png" class="item" />
            <h5>Saput Songket & Udeng</h5>
            <div class="star">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
          </div>
          <div class="sub-content py-3 d-flex flex-column align-items-center">
            <img src="@/assets/img/slider1/Kamen3.png" class="item" />
            <h5>Saput Songket & Udeng</h5>
            <div class="star">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
          </div>
          <div class="sub-content py-3 d-flex flex-column align-items-center">
            <img src="@/assets/img/slider1/Kamen4.png" class="item" />
            <h5>Saput Songket & Udeng</h5>
            <div class="star">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
          </div>
          <div class="sub-content py-3 d-flex flex-column align-items-center">
            <img src="@/assets/img/slider1/Kamen5.png" class="item" />
            <h5>Saput Songket & Udeng</h5>
            <div class="star">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
          </div>
          <div class="sub-content py-3 d-flex flex-column align-items-center">
            <img src="@/assets/img/slider1/Kamen6.png" class="item" />
            <h5>Saput Songket & Udeng</h5>
            <div class="star">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
          </div>
          <div class="sub-content py-3 d-flex flex-column align-items-center">
            <img src="@/assets/img/slider1/Kamen1.png" class="item" />
            <h5>Saput Songket & Udeng</h5>
            <div class="star">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
          </div>
          <div class="sub-content d-flex flex-column align-items-center">
            <div class="px-5 py-3">
              <img src="@/assets/img/slider1/Kamen2.png" class="item" />
              <h5>Saput Songket & Udeng</h5>
              <div class="star text-center">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <div class="harga py-3">
                <h5>$ 15.00</h5>
            </div>
            </div>
          </div>
        </div>
      </div>
      <button ref="prev" class="prev" @click="handlePrev">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
        </svg>
      </button>
      <button ref="next" class="next" @click="nexthandler">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
.slider {
}

#wrapper {
  width: 100%;
  max-width: 1080px;
  position: relative;
}

.carousel {
  overflow: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.carousel::-webkit-scrollbar {
  height: 0;
}

.prev,
.next {
  display: flex;
  justify-content: center;
  align-content: center;
  background: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  outline: 0;
  cursor: pointer;
  position: absolute;
  box-shadow: 5px 5px 8px 5px rgba(0, 0, 0, 0.1);
}

.prev {
  top: 50%;
  left: -70px;
  transform: translate(50%, -50%);
  display: none;
}

.next {
  top: 50%;
  right: -70px;
  transform: translate(-50%, -50%);
}

.content {
  display: grid;
  grid-gap: 16px;
  grid-auto-flow: column;
  margin: auto;
  box-sizing: border-box;
}

.item {
  width: 220px;
  height: 220px;
  border-radius: 10%;
  padding: 10px;
}

.sub-content {
  /* background-color: white; */
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8%;
  width: 251px;
  font-family: 'poopins', sans-serif;
}

.sub-content h5 {
  text-align: center;
  font-weight: 600;
  font-family: 'pragati narrow', sans-serif;
  font-size: 1.4rem;
}

.star {
  row-gap: 10px;
}

.bi {
  padding-inline: 3px;
}

.harga  {
  border-color: black;
}
</style>
