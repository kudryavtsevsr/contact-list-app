import { createWebHistory, createRouter } from 'vue-router'

export const enum RouteName {
  Home = 'home',
  ContactList = 'contact-list',
  ContactEditor = 'contact-editor',
  ContactAdd = 'contact-add',
  NotFound = 'not-found'
}

const routes = [
  { path: '/:pathMatch(.*)*',
    name: RouteName.NotFound,
    component: () => import('@/pages/NotFoundPage.vue')
  },
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
  },
  {
    path: '/contact-add',
    name: RouteName.ContactAdd,
    component: () => import('@/pages/ContactAddPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
