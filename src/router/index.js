import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
		path: '/',
		name: 'HomePage',
		component: HomePage,
  }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		return { top: 0 }
	},
})

export default router