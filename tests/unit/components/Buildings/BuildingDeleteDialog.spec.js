// test/BuildingDeleteDialog.spec.js

import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import {merge} from "lodash";

import BuildingDeleteDialog from "@/components/Buildings/BuildingDeleteDialog";
import buildingsStore from "../../../../src/store/modules/buildings";
import flushPromises from "flush-promises";

describe('BuildingDeleteDialog.vue', () => {
	const localVue = createLocalVue();
	localVue.use(Vuex);
	let vuetify;
	let getters;

	beforeEach(() => {
		vuetify = new Vuetify();
	})

	function createStore(overrides) {
		let currentState = "DATA_LOADED";
		let buildings = [
			{
				area: "55",
				id: "2",
				img: "",
				location: "Sofia",
				name: "Luxury house 3",
				type: "house",
				uuid: "-MukqrOCyJiAZW1BCwI0",
			},
			{
				area: "55",
				id: "2",
				img: "",
				location: "Sofia",
				name: "Luxury house 3",
				type: "house",
				uuid: "-MukqrOCyJiAZW1BCwI0",
			}
		];

		getters = {
			getBuildings: () => currentState,
			getCurrentState: () => buildings
		}

		const defaultStoreConfig = {
			modules: {
				buildings: {
					namespaced: true,
					state: {
						currentState,
						buildings,
					},
					getters: buildingsStore.getters,

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
				// Vue Router
				$router: {
					push: () => {
					}
				},
			},
		};

		const propsData = {
			value: false,

			editedItemProp: {
				uuid: null,
				id: null,
				name: '',
				area: null,
				location: '',
				type: null,
				img: '',
			}
		}

		return mount(BuildingDeleteDialog, merge(defaultMountingOptions, propsData, overrides))
	}

	it('should render component ', () => {
		const wrapper = createWrapper();

		expect(wrapper.is(BuildingDeleteDialog)).toBe(true);
	})

	it('should update computed value when prop value changed', async () => {
		const wrapper = createWrapper();
		await wrapper.setProps({value: true});

		expect(wrapper.vm.dialogDelete).toBe(true);
	})

	it('should emit input with false value when click cancel button', async () => {
		const closeDeleteChanged = jest.spyOn(BuildingDeleteDialog.methods, "closeDelete");

		const wrapper = createWrapper();
		await wrapper.setProps({value: true});

		let closeButton = wrapper.find('#cancel-button');
		closeButton.trigger('click.stop');

		await flushPromises();
		expect(closeDeleteChanged).toHaveBeenCalled();
		expect(wrapper.emitted().input[0]).toEqual([false]);
	})

	it('should emit input with false value when confirm delete', async () => {
		const wrapper = createWrapper();
		await wrapper.setProps({value: true});

		let confirmButton = wrapper.find('#confirm-delete-button');
		confirmButton.trigger('click.stop');

		await flushPromises();

		expect(wrapper.emitted().input[0]).toEqual([false]);
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
