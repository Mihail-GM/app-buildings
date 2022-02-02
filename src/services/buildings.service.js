import $axios from '../plugins/axios'

class BuildingsService {
	getBuildings() {
		return $axios.get('/buildings.json')
			.then((res) => {
				return res.data;
			});
	}

	createBuilding(data) {
		return $axios.post('/buildings.json', data)
			.then((res) => {
				return res.data;
			});
	}

	editBuilding(data) {
		return $axios.put(`/buildings/${data.uuid}.json`, JSON.stringify(data))
			.then((res) => {
				return res.data;
			});
	}

	deleteBuilding(data) {
		return $axios.delete(`/buildings/${data.uuid}.json`)
			.then((res) => {
				return res.data;
			});
	}
}

export default new BuildingsService();
