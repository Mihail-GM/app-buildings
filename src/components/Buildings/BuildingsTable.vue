<template>
	<div id="buildings-table-container" class="mb-16">
		<div id="buildings-table-loading" v-if="actionState === 'LOADING'">
			<v-progress-linear
				indeterminate
				color="green"
			>

			</v-progress-linear>
			<div class="d-flex justify-center align-center pa-10">
				Loading... Please wait
			</div>
		</div>

		<v-alert
			v-else-if="actionState === 'ERRORED'"
			id="buildings-table-errored"
			dense
			outlined
			type="error"
		>
			There was an error when loading data. Please try again later.
		</v-alert>

		<v-data-table
			v-else
			id="buildings-table"
			:headers="headers"
			:items="buildings"
			sort-by="primary_contact_email"
			class="elevation-2 px-10 text-xl-h4"
		>
			<template v-slot:item.img="{ item }">
				<div class="d-flex justify-center align-center py-1">
					<v-img
						v-if="item.type"
						class="pt-5 mt-2"
						max-height="60"
						max-width="60"
						:src="getImgUrl(item.type)"
						:alt="imageData[item.type].alt"
						:title="imageData[item.type].title"
					/>
				</div>
			</template>

			<template v-slot:top>
				<v-toolbar
					flat
				>
					<v-spacer></v-spacer>

					<BuildingCreateEditDialog
						:edited-item-prop.sync="editedItem"
						:key="dialogKeyCreateEditDialog + '-create-edit'"
						:edited-index-prop="editedIndex"
						v-model="dialog"
						@resetEditedItem="resetEditedItem"
						@save="save"
					/>

					<BuildingDeleteDialog
						:key="dialogKeyDeleteDialog + '-delete'"
						v-model="dialogDelete"
						:edited-item-prop.sync="editedItem"
						@deleteItemConfirm="deleteItemConfirm"
					/>
				</v-toolbar>
			</template>

			<template v-slot:item.actions="{ item, index }">
				<v-icon
					:id="'edit-building-button-' + index"
					class="mr-2"
					@click.stop="editItem(item)"
				>
					mdi-pencil
				</v-icon>

				<v-icon
					:id="'delete-building-button-' + index"
					@click.stop="openDeleteItemDialog(item)"
				>
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
	</div>
</template>

<script>

	import BuildingCreateEditDialog from "./BuildingCreateEditDialog";
	import BuildingDeleteDialog from "./BuildingDeleteDialog";
	import BuildingsService from "@/services/buildings.service";
	import {mapGetters} from "vuex";

	export default {
		name: 'BuildingsTable',

		components: {
			BuildingDeleteDialog,
			BuildingCreateEditDialog
		},

		data() {
			return {
				dialog: false,
				dialogDelete: false,
				dialogKeyCreateEditDialog: 0,
				dialogKeyDeleteDialog: 0,

				headers: [
					{text: 'ID', align: 'start', sortable: true, value: 'id'},
					{text: 'Name', align: 'start', sortable: true, value: 'name'},
					{text: 'Area', align: 'start', sortable: true, value: 'area'},
					{text: 'Location', align: 'start', sortable: true, value: 'location'},
					{text: 'Type', align: 'start', sortable: true, value: `type`},
					{text: 'Image', align: 'center', sortable: false, value: `img`},
					{text: '', value: 'actions', sortable: false, align: 'end'},
				],

				editedIndex: -1,
				defaultItem: {
					uuid: null,
					id: null,
					name: '',
					area: '',
					location: '',
					type: '',
				},
				editedItem: {
					uuid: null,
					id: null,
					name: '',
					area: '',
					location: '',
					type: '',
				},

				imageData: {
					residential: {
						path: 'img/type-apartment.png',
						alt: 'Type - residential',
						title: 'Residential'
					},

					industrial: {
						path: 'img/industrial-building.png',
						alt: 'Type - industrial',
						title: 'Industrial'
					},

					educational: {
						path: 'img/educational-building.png',
						alt: 'Type - educational',
						title: 'Educational'
					},

					special: {
						path: 'img/special-building.png',
						alt: 'Type - special',
						title: 'Special'
					},
				}
			}
		},

		methods: {
			getAllBuildings() {
				this.$store.dispatch('buildings/fetchBuildings');
			},

			editItem(item) {
				this.editedIndex = this.buildings.indexOf(item);
				this.dialogKeyCreateEditDialog++;
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			openDeleteItemDialog(item) {
				this.editedIndex = this.buildings.indexOf(item);
				this.dialogKeyDeleteDialog++;
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			resetEditedItem() {
				this.editedIndex = -1;
				this.editedItem = Object.assign({}, this.defaultItem);
			},

			save(editedItemFromForm) {
				if (this.editedIndex > -1) {
					BuildingsService.editBuilding(editedItemFromForm)
						.then((res) => {
							this.$store.dispatch('buildings/fetchBuildings');

							this.$store.dispatch('snackbar/showSnackbarMessage', {
								message: 'Building was edited successfully',
								duration: 4000,
								mode: 'success'
							});
						});

					return;
				}

				BuildingsService.createBuilding(JSON.stringify(editedItemFromForm))
					.then((res) => {
						this.$store.dispatch('buildings/fetchBuildings');

						this.$store.dispatch('snackbar/showSnackbarMessage', {
							message: 'Building was added successfully',
							duration: 4000,
							mode: 'success'
						});

						return res;
					});
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.resetEditedItem();
				});
			},

			deleteItemConfirm(deletedItem) {
				BuildingsService.deleteBuilding(deletedItem)
					.then((res) => {
						this.$store.dispatch('buildings/fetchBuildings');

						this.$store.dispatch('snackbar/showSnackbarMessage', {
							message: 'Building was deleted successfully',
							duration: 4000,
							mode: 'success'
						});

						return res;
					});

				this.closeDelete();
			},

			getImgUrl(type) {
				return require('@/assets/' + (this.imageData[type].path))
			}
		},

		computed: {
			...mapGetters(
				{
					buildings: 'buildings/getBuildings',
					actionState: 'buildings/getCurrentState'
				}
			)
		},
		created() {
			this.getAllBuildings();
		},
	}
</script>
