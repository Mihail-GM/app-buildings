const state = {
	snackbarMessageData: {
		message: '',
		duration: 3000,
		mode: 'success'
	},
};

const getters = {
	getSnackbarMessage(state) {
		return state.snackbarMessageData;
	},
};

const mutations = {
	setSnackbarMessage(state, {message, duration = 4000, mode = 'success', buttonText = 'Close'}) {
		state.snackbarMessageData = {message, duration, mode, buttonText};
	},
}

const actions = {
	showSnackbarMessage(vuexContext, messageData) {
		vuexContext.commit('setSnackbarMessage', messageData);
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}