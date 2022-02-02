<template>
	<v-dialog v-model="dialogDelete" max-width="500px">
		<v-card >
			<v-card-title style="background: #000000;">
				<h4 class="white--text"> Delete Building </h4>
			</v-card-title>

			<v-card-subtitle class="py-10 text--primary text-justify">
				This will delete the building, all data for this building. This cannot be undone.
				To confirm you wish to delete all data related to this building, enter the building
				name in the box below, and click CONFIRM.
			</v-card-subtitle>

			<v-card-text>
				<v-text-field
					dense
					v-model="inputName"
					label="Building name"
					outlined
				>
				</v-text-field>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					id="cancel-button"
					color="red darken-1"
					text
					@click.native="closeDelete"
				>
					Cancel
				</v-btn>

				<v-btn
					id="confirm-delete-button"
					color="green darken-1"
					text
					@click.native="deleteItemConfirm"
				>
					CONFIRM
				</v-btn>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: "BuildingDeleteDialog",

		props: {
			value: {
				Boolean,
				default: false
			},

			editedItemProp: {
				type: Object,
				required: true,
				default: {
					uuid: null,
					id: null,
					name: '',
					area: null,
					location: '',
					type: null,
					img: '',
				}
			},
		},

		data() {
			return {
				editedItem: this.editedItemProp,
				inputName: '',
			}
		},

		methods: {
			deleteItemConfirm() {
				if (this.editedItemProp.name === this.inputName) {
					this.$emit('deleteItemConfirm', this.editedItem);
					this.$store.dispatch('snackbar/showSnackbarMessage', {
						message: 'Building was deleted successfully',
						duration: 4000,
						mode: 'success'
					});
					this.closeDelete();
					return;
				}

				this.$store.dispatch('snackbar/showSnackbarMessage', {
					message: 'To delete building names must mach',
					duration: 6000,
					mode: 'fail'
				});
			},

			closeDelete() {
				this.dialogDelete = false;
			},
		},

		computed: {
			dialogDelete: {
				get() {
					return this.value
				},

				set(value) {
					this.$emit('input', value)
				}
			},
		},
	}
</script>

<style scoped>

</style>