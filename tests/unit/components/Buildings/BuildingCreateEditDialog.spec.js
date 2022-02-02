import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import {merge} from "lodash";

import BuildingCreateEditDialog from "@/components/Buildings/BuildingCreateEditDialog";
import buildingsStore from "../../../../src/store/modules/buildings";
import flushPromises from "flush-promises";

describe('BuildingCreateEditDialog.vue', () => {
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

		return mount(BuildingCreateEditDialog, merge(defaultMountingOptions, propsData, overrides))
	}

	it('should render component ', () => {
		const wrapper = createWrapper();

		expect(wrapper.is(BuildingCreateEditDialog)).toBe(true);
	})


	it('should update computed value when prop value changed', async () => {
		const wrapper = createWrapper();
		await wrapper.setProps({value: true});

		expect(wrapper.vm.dialog).toBe(true);
	})

	it('should emit input with false value when click close button', async () => {
		const closeChanged = jest.spyOn(BuildingCreateEditDialog.methods, "close");

		const wrapper = createWrapper();
		await wrapper.setProps({value: true});

		let closeButton = wrapper.find('#cancel-button');
		closeButton.trigger('click.stop');

		await flushPromises();
		expect(closeChanged).toHaveBeenCalled();
		expect(wrapper.emitted().input[0]).toEqual([false]);
	})

	it('should emit input with false value when confirm create', async () => {
		const closeChanged = jest.spyOn(BuildingCreateEditDialog.methods, "close");

		const wrapper = createWrapper();
		await wrapper.setProps({value: true});

		let confirmButton = wrapper.find('#create-edit-button');
		confirmButton.trigger('click.stop');

		await flushPromises();

		expect(closeChanged).toHaveBeenCalled();
	})

	it('should render text for edit dialog when we edit', async () => {
		const wrapper = createWrapper();
		await wrapper.setProps({value: true});
		await wrapper.setProps({editedIndexProp: 1});

		let dialogTitle = wrapper.find('#dialog-title');

		await flushPromises();

		expect(wrapper.vm.editedIndexProp).toBe(1);
		expect(dialogTitle.text()).toBe('Edit building');
	})

	it('should render text for create dialog when we add new buildings', async () => {
		const wrapper = createWrapper();
		await wrapper.setProps({value: true});
		await wrapper.setData({editedIndex: -1});

		let dialogTitle = wrapper.find('#dialog-title');

		expect(dialogTitle.text()).toBe('Create new building');
	})

	it('should not emit save event if data is not correct', async () => {
		const wrapper = createWrapper();

		await wrapper.setProps({value: true});
		await wrapper.setData({editedIndex: -1});
		await wrapper.setData({
			editedItem: {
				id: 5,
				name: null,
				area: null,
				location: 'Str. Address',
				type: 'apartment',
				img: '',
			}
		});
		await flushPromises();

		let confirmButton = wrapper.find('#create-edit-button');
		confirmButton.trigger('click.stop');
		await flushPromises();

		expect(wrapper.emitted().save).toBeFalsy();
	})

	it('should not emit save event if all data is not correct', async () => {
		const wrapper = createWrapper();

		await wrapper.setProps({value: true});
		await wrapper.setData({editedIndex: -1});
		await wrapper.setData({
			editedItem: {
				id: null,
				name: null,
				area: null,
				location: null,
				type: null,
				img: '',
			}
		});
		await flushPromises();

		let confirmButton = wrapper.find('#create-edit-button');
		confirmButton.trigger('click.stop');
		await flushPromises();

		expect(wrapper.emitted().save).toBeFalsy();
	})

	it('should emit save event if data is correct', async () => {
		const wrapper = createWrapper();

		await wrapper.setProps({value: true});
		await wrapper.setData({editedIndex: 0});
		await wrapper.setData({
			editedItem: {
				id: 5,
				name: 'Luxury building',
				area: '120',
				location: 'Str. Address',
				type: 'apartment',
				img: '',
			}
		});
		await flushPromises();

		let confirmButton = wrapper.find('#create-edit-button');
		confirmButton.trigger('click.stop');
		await flushPromises();

		expect(wrapper.emitted().save).toBeTruthy()
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
