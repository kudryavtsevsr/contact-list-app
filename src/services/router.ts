import { createWebHistory, createRouter } from 'vue-router'

export const enum RouteName {
  Home = 'home',
  ContactList = 'contact-list',
  ContactEditor = 'contact-editor'
}

const routes = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/contact-list',
    name: RouteName.ContactList,
    component: () => import('@/pages/ContactListPage.vue')
  },
  {
    path: '/contact-editor/:id',
    name: RouteName.ContactEditor,
    component: () => import('@/pages/ContactEditorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
