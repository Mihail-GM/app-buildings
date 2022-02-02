import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Buildings from "../views/Buildings";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/buildings',
		name: 'Buildings',
		component: Buildings
	},
	{ path: '/404', component: PageNotFound },
	{ path: '*', redirect: '/404' },
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
