// test/Home.spec.js

import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import Home from "@/views/Home";
import {merge} from "lodash";
import snackbar from "@/store/modules/snackbar";

describe('Home.vue', () => {
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
		};

		return mount(Home, merge(defaultMountingOptions, overrides));
	}

	it('should render component ', () => {
		const wrapper = createWrapper()

		expect(wrapper.is(Home)).toBe(true);
	})

	it('should render app title on h1', () => {
		const wrapper = createWrapper()
		const title = wrapper.find('h1#app-title');

		expect(title.text()).toBe('BUILDINGS APP');
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
