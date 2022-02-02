import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import Buildings from "@/views/Buildings";
import {merge} from "lodash";
import snackbar from "@/store/modules/snackbar";

describe('Buildings.vue', () => {
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

		return mount(Buildings, merge(defaultMountingOptions, overrides));
	}

	it('should render component Buildings', () => {
		const wrapper = createWrapper()

		expect(wrapper.is(Buildings)).toBe(true);
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
