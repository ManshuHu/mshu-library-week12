import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import LogOutView from '../views/LogOutView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path:'/FireLogin',
    name:'FireLogin',
    component: FirebaseSigninView
  },
  {
    path:'/FireRegister',
    name:'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path:'/addbook',
    name:'AddBook',
    component: AddBookView
  },
  {
    path:'/logout',
    name:'LogOut',
    component: LogOutView
  },
  {
    path:'/GetBookCount',
    name:'GetBookCount',
    component: GetBookCountView
  },
  {
    path:'/WeatherCheck',
    name:'WeatherCheck',
    component: WeatherView
  },
  {
    path:'/CountBookAPI',
    name:'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router