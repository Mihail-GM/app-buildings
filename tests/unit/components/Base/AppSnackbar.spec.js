// test/AppSnackbar.spec.js

import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import AppSnackbar from "@/components/Base/AppSnackbar";
import {merge} from "lodash";
import snackbar from "@/store/modules/snackbar";
import flushPromises from "flush-promises";

describe('AppSnackbar.vue', () => {
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

		const dataOptions = {
			data() {
				return {
					showSnackbar: true
				}
			}
		};

		return mount(AppSnackbar, merge(defaultMountingOptions, dataOptions, overrides));
	}

	it('should close dialog when close button is clicked', () => {
		const wrapper = createWrapper();
		expect(wrapper.vm.showSnackbar).toBe(true);

		const button = wrapper.find('#snackbar-close-button');
		button.trigger('click');

		expect(wrapper.vm.showSnackbar).toBe(false);
	})

	it('change message when new message is set to store', async () => {
		let store = createStore();
		const wrapper = createWrapper(store);

		await wrapper.vm.$store.dispatch('snackbar/showSnackbarMessage', {
			message: 'Changed.',
			duration: 4000,
			mode: 'success'
		});
		await flushPromises;

		const element = wrapper.find('.v-snack__content');
		expect(element.text()).toBe('Changed.');
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
