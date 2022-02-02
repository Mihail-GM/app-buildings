import Vuetify from 'vuetify'
import Vuex from "vuex";

import {createLocalVue, mount} from '@vue/test-utils'
import {merge} from "lodash";

import BuildingsTable from "@/components/Buildings/BuildingsTable";
import buildingsStore from "../../../../src/store/modules/buildings";
import flushPromises from "flush-promises";


describe('BuildingsTable.vue', () => {
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
				type: "residential",
				uuid: "-MukqrOCyJiAZW1BCwI0",
			},
			{
				area: "55",
				id: "2",
				img: "",
				location: "Sofia",
				name: "Luxury house 3",
				type: "educational",
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

		return mount(BuildingsTable, merge(defaultMountingOptions, overrides))
	}

	it('should render component ', () => {
		const wrapper = createWrapper();

		expect(wrapper.is(BuildingsTable)).toBe(true);
	})

	it('should set state to DATA_LOADED ', async () => {
		const store = createStore()
		const wrapper = createWrapper({store});

		expect(store.state.buildings.currentState).toBe('DATA_LOADED')
	})

	it('should set buildings from store to computed property buildings ', async () => {
		const store = createStore()
		const wrapper = createWrapper({store});

		expect(wrapper.vm.buildings.length).toBe(2);
	})

	it('should open edit dialog when edit button is clicked', async () => {
		const wrapper = createWrapper();

		let editButton = wrapper.find('#edit-building-button-0');
		editButton.trigger('click');
		await flushPromises();

		expect(wrapper.vm.dialog).toBe(true);
	})

	it('should open delete dialog when delete button is clicked', async () => {
		const wrapper = createWrapper();

		let editButton = wrapper.find('#delete-building-button-0');
		editButton.trigger('click');

		await flushPromises();

		expect(wrapper.vm.dialogDelete).toBe(true);
	})

	it('should show edited successfully message when call save with correct edit data', async () => {
		const store = createStore();
		store.dispatch = jest.fn(() => Promise.resolve());
		const wrapper = createWrapper({store});

		wrapper.setData({editedIndex: 2});
		let editedItem = {
			id: 5,
			name: 'Luxury building',
			area: '120',
			location: 'Str. Address',
			type: 'residential',
			img: '',
		}
		wrapper.vm.save(editedItem);

		await flushPromises();

		expect(store.dispatch).toHaveBeenCalledWith("snackbar/showSnackbarMessage", {
				message: 'Building was edited successfully',
				duration: 4000,
				mode: 'success'
			}
		);
	})

	it('should show add successfully message when call save with correct add data', async () => {
		const store = createStore();
		store.dispatch = jest.fn(() => Promise.resolve());
		const wrapper = createWrapper({store});

		wrapper.setData({editedIndex: -1});
		let editedItem = {
			id: 5,
			name: 'Luxury building',
			area: '120',
			location: 'Str. Address',
			type: 'residential',
			img: '',
		}
		wrapper.vm.save(editedItem);

		await flushPromises();

		expect(store.dispatch).toHaveBeenCalledWith("snackbar/showSnackbarMessage", {
				message: 'Building was added successfully',
				duration: 4000,
				mode: 'success'
			}
		);
	})

	it('should set editIndex to -1 when reseting data for dialogs', async () => {
		const wrapper = createWrapper();

		wrapper.setData({editedIndex: 5});
		let defaultItem = {
			id: null,
			name: '',
			area: null,
			location: '',
			type: null,
			img: '',
		};

		wrapper.vm.resetEditedItem(defaultItem);

		await flushPromises();

		expect(wrapper.vm.editedIndex).toBe(-1);
	})

	it('should set dialog to false when call closeDelete', async () => {
		const wrapper = createWrapper();

		await wrapper.setData({dialogDelete: true});
		await flushPromises();

		wrapper.vm.closeDelete();

		expect(wrapper.vm.dialogDelete).toBe(false);
		expect(wrapper.vm.editedIndex).toBe(-1);
	})

	it('should match snapshot', () => {
		const wrapper = createWrapper()

		expect(wrapper.html()).toMatchSnapshot()
	})
})
