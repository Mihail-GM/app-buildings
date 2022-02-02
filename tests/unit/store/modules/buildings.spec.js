// test/buildings.spec.js

import Vuex from "vuex";

import {createLocalVue} from "@vue/test-utils";
import {cloneDeep} from "lodash";

import BuildingsService from "@/services/buildings.service";
import buildings, {actionStates} from "@/store/modules/buildings";

jest.mock("@/services/buildings.service");

describe(`buildings module`, () => {
	const localVue = createLocalVue();
	localVue.use(Vuex);
	let store;

	beforeEach(() => {
		BuildingsService.getBuildings.mockReset();
		store = new Vuex.Store(cloneDeep(buildings));
	});

	describe("fetchBuildings action", () => {
		it("sets currentState to LOADING when fetchBuildings is pending", async () => {
			expect(store.state.currentState).toBe(actionStates.INITIAL);

			const promise = store.dispatch("fetchBuildings");
			expect(store.state.currentState).toBe(actionStates.LOADING);
			await promise;
		});

		it("sets currentState to DATA_LOADED when fetchBuildings is successful", async () => {
			BuildingsService.getBuildings.mockResolvedValue({data: []});
			await store.dispatch("fetchBuildings");

			expect(store.state.currentState).toBe(actionStates.DATA_LOADED);
		});

		it("sets currentState to ERRORED when fetchBuildings is unsuccessful", async () => {
			BuildingsService.getBuildings.mockRejectedValue();
			await store.dispatch("fetchBuildings");

			expect(store.state.currentState).toBe(actionStates.ERRORED);
		});

		it("updates state.buildings with buildings returned from getBuildings and sets uuid to each building", async () => {
			const apiResult = {
				testId: {
					name: "building",
				},
			};
			BuildingsService.getBuildings.mockResolvedValue(apiResult);
			await store.dispatch("fetchBuildings");

			expect(BuildingsService.getBuildings).toHaveBeenCalledTimes(1);
			expect(store.state.buildings).toStrictEqual([
				{name: "building", uuid: "testId"},
			]);
		});

		it.each`
	      response
	      ${null}
	      ${undefined}
	      ${{}}
        `(
			"sets state.buildings to an empty array when getBuildings returns $response",
			async ({response}) => {
				BuildingsService.getBuildings.mockResolvedValue(response);
				await store.dispatch("fetchBuildings");

				expect(store.state.buildings).toStrictEqual([]);
			}
		);
	});
});
