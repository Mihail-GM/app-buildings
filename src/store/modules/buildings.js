import BuildingsService from "@/services/buildings.service";

const actionStates = {
	INITIAL: "INITIAL",
	LOADING: "LOADING",
	ERRORED: "ERRORED",
	NOT_FOUND: "NOT_FOUND",
	DATA_LOADED: "DATA_LOADED",
};

const state = {
	currentState: actionStates.INITIAL,
	buildings: [],
};

const getters = {
	getBuildings(state) {
		return state.buildings;
	},

	getCurrentState(state) {
		return state.currentState;
	},
};

const mutations = {
	setActionState(state, actionState) {
		state.currentState = actionState;
	},

	setBuildings(state, buildings) {
		state.buildings = buildings ?? [];
	},
};

const actions = {
	async fetchBuildings(vuexContext) {
		vuexContext.commit('setActionState', actionStates.LOADING);

		try {
			let buildingsResponseData = [];
			let data = await BuildingsService.getBuildings();

			if (data) {
				buildingsResponseData = Object.entries(data)
					.map(([key, value]) => ({
						...value,
						uuid: key,
					}));
			}

			vuexContext.commit('setBuildings', buildingsResponseData);
			vuexContext.commit('setActionState', actionStates.DATA_LOADED);
		} catch (e) {
			if (e && e.response && e.response.status === 404) {
				vuexContext.commit('setActionState', actionStates.NOT_FOUND);
			} else {
				vuexContext.commit('setActionState', actionStates.ERRORED);
			}
		}
	},
};

export {actionStates};
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};