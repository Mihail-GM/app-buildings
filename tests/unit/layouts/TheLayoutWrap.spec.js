import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import {merge} from "lodash";

import TheLayoutWrap from "@/layouts/TheLayoutWrap";
import snackbar from "@/store/modules/snackbar";


describe('TheLayoutWrap.vue', () => {
	const localVue = createLocalVue();
	localVue.use(Vuex);
	let vuetify

	beforeEach(() => {
		vuetify = new Vuetify()
	})

	function createStore(overrides) {
		let snackbarMessageData = {
			message: 'Test',
			duration: 3000,
			mode: 'success'
		};

		const defaultStoreConfig = {
			modules: {
				snackbar: {
					namespaced: true,
					state: {
						snackbarMessageData
					},
					getters: snackbar.getters,
					mutations: snackbar.mutations,
					actions: snackbar.actions,
				}
			}
		};

		return new Vuex.Store(merge(defaultStoreConfig, overrides));
	}

	const createWrapper = (overrides) => {
		const defaultMountingOptions = {
			localVue,
			vuetify,
			store: createStore(),

			mocks: {
				$route: {
					path: '/',
				},
				// Vue Router
				$router: {
					push: jest.fn(),
				},
			},
		}

		const dataOptions = {
			data() {
				return {
					drawer: false,
					appTitle: 'Buildings App',
					menuItems: [
						{
							icon: 'mdi-home-circle',
							title: 'Home',
							path: '/'
						},
						{
							icon: 'mdi-home-circle',
							title: 'Buildings',
							path: '/buildings'
						},
					]
				}
			}
		}

		return mount(TheLayoutWrap, merge(defaultMountingOptions, dataOptions, overrides))
	}

	it('should render component ', () => {
		const wrapper = createWrapper()

		expect(wrapper.is(TheLayoutWrap)).toBe(true);
	})

	it('app title link should redirect to home "/"', () => {
		const wrapper = createWrapper();

		const spy = jest.fn();
		wrapper.vm.$router.push = spy;

		let homeButton = wrapper.find('#app-title-navigation')
		homeButton.trigger('click');

		expect(spy).toHaveBeenCalledWith('/');
	})

	it('should render first item on mobile menu with correct link', async () => {
		const wrapper = createWrapper();

		let menuLink = wrapper.findAll({name: 'v-list-item'}).at(0);

		expect(menuLink.props().to).toBe('/');
	})

	it('should render second item on mobile menu with correct link', async () => {
		const wrapper = createWrapper();

		let menuLink = wrapper.findAll({name: 'v-list-item'}).at(1);

		expect(menuLink.props().to).toBe('/buildings');
	})


	it('should open /buildings page when click on buildings button on the bottom toolbar', async () => {
		const wrapper = createWrapper();
		const spy = jest.fn();
		wrapper.vm.$router.push = spy;

		let button = wrapper.find('#navigation-buildings')
		button.trigger('click');

		expect(spy).toHaveBeenCalledWith('/buildings');
	})

	it('should open / page when click on home button on the bottom toolbar', async () => {
		const wrapper = createWrapper();
		const spy = jest.fn();
		wrapper.vm.$router.push = spy;

		let button = wrapper.find('#navigation-home')
		button.trigger('click');

		expect(spy).toHaveBeenCalledWith('/');
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
