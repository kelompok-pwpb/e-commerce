import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserView.vue'
import ProductsView from '../views/ProductsView.vue'
import AboutView from '@/views/AboutView.vue'
import ProductView from '@/views/ProductView.vue'
import LoginView from '@/views/LoginView.vue'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      component: UserView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/products',
      component: ProductsView,
    },
    {
      path: '/about',
      component: AboutView
    },
    {
      path: '/product',
      component: ProductView
    },
    {
      path: '/cart',
      component: CartView
    }
  ]
})

export default router
