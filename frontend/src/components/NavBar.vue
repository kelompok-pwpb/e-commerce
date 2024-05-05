<script>
export default {
  data(){
    return{
      paddingBottom: 0 
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const nav = document.querySelector(".navbar");  
      if (nav.clientHeight < window.scrollY) {
        nav.classList.add("nav-move");
        return;
      }
      nav.classList.remove("nav-move");
    },
    handleResize(){
      const nav = document.querySelector(".navbar");
      // const app = document.querySelector('#app');
      console.log(document.body.paddingBottom);  
      if(this.$route.meta.navPad){

         document.body.style.paddingTop = `${nav.clientHeight}px`; 
     }
    }
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light position-fixed">
    <div class="container">
      <a href="#" class="navbar-brand">
        <img src="@/assets/img/LogoPragos.jpg" alt="" class="logo" width="100" height="50"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav px-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
        </ul>
        <div class="user justify-content-end align-items-center w-100 d-flex">
          <div class="search px-4"><i class="bi bi-search"></i></div>
          <img src="@/assets/img/userlogo.png" alt="" width="40" height="40" />
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar {
  z-index: 99999;
  width: 100%;
  top: 0;
  transition: all 200ms;
  background: none;
}

.navbar-brand img {
  border-radius: 50%;
}

.logo {
  width: 100%;
}
.nav-link {
  color: black;
  font-weight: 500;
  border-radius: 10px;
}
.nav-link:hover {
  color: #dc5f00;
}
.navbar-nav {
  font-family: 'barlow', sans-serif;
}
.nav-item {
  color: #83818c;
  padding: 5px;
  text-decoration: none;
  transition: 0.3s;
  margin: 0 6px;
  z-index: 1;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #dc5f00;
    border-radius: 8px 8px 0 0;
    opacity: 0;
    transition: 0.3s;
  }
}
.nav-item:not(.is-active):hover:before {
  opacity: 1;
  bottom: -10px;
}
.nav-item:not(.is-active):hover {
  color: #333;
}
.search {
  font-size: 22px;
  cursor: pointer;
}
.search:hover {
  color: #dc5f00;
}
.nav-move {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 1);
  color: black;
}

.nav-move .text-brand-main {
  color: black;
}

.nav-move .nav-link {
  color: black;
}
:global(body){
  padding-bottom: var(--padding-bottom);
}
</style>
