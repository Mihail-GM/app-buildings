<template>
	<v-dialog
		v-model="dialog"
		max-width="600px"
		@click:outside=close
	>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="primary"
				dark
				class="mb-2 px-8"
				:color="'green'"
				v-bind="attrs"
				v-on="on"
			>
				Add building
			</v-btn>
		</template>

		<v-card>
			<v-card-title class="d-flex justify-center">
				<span id="dialog-title" class="text-h5 text-center">{{ formTitle }}</span>
			</v-card-title>

			<v-card-text>
				<v-container>
					<v-row>
						<v-col
							cols="12"
							sm="12"
							md="12"
							class="py-0"
						>
							<v-text-field
								:disabled="!isCreateTable"
								v-model="editedItem.id"
								dense
								label="Building id"
								outlined
								required
								number
								:error-messages="buildingIdError"
								@blur="$v.editedItem.id.$touch()"
							/>

							<v-text-field
								v-model="editedItem.name"
								dense
								label="Building name"
								outlined
								required
								:error-messages="buildingNameError"
								@blur="$v.editedItem.name.$touch()"
							/>

							<v-text-field
								v-model="editedItem.area"
								dense
								label="Building area (m2)"
								outlined
								required
								type="number"
								:error-messages="buildingAreaError"
								@blur="$v.editedItem.area.$touch()"
							/>

							<v-text-field
								v-model="editedItem.location"
								dense
								label="Building location"
								outlined
							/>

							<v-select
								v-model="editedItem.type"
								dense
								label="Building type"
								:items="types"
								item-text="name"
								item-value="value"
								outlined
							/>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					id="cancel-button"
					color="red darken-1"
					style="color:white"
					@click.native="close"
					text
				>
					Cancel
				</v-btn>

				<v-btn
					id="create-edit-button"
					color="green darken-1"
					style="color:white"
					@click.native="save"
					:disabled="$v.$anyError || buildingIdError.length !== 0"
					text
				>
					{{ buttonText }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import {validationMixin} from 'vuelidate'
	import {required, minValue} from 'vuelidate/lib/validators'
	import {mapGetters} from "vuex";

	export default {
		name: "BuildingCreateEditDialog",

		components: {},

		props: {
			value: {
				Boolean,
				default: false
			},

			editedItemProp: {
				type: Object,
				required: true,
				default: {
					id: null,
					name: '',
					area: '',
					location: '',
					type: '',
					img: '',
				}
			},

			editedIndexProp: {
				type: Number,
				required: true,
				default: false
			},
		},

		mixins: [validationMixin],

		validations: {
			editedItem: {
				id: {required, minValue: minValue(1)},
				name: {required},
				area: {required, minValue: minValue(1)},
			}
		},

		data() {
			return {
				complete: false,
				editedItem: this.editedItemProp,
				editedIndex: this.editedIndexProp,

				defaultItem: {
					id: null,
					name: '',
					area: null,
					location: '',
					type: null,
					img: '',
				},

				types: [
					{
						value: 'residential',
						name: 'Residential'
					},
					{
						value: 'industrial',
						name: 'Industrial'
					},
					{
						value: 'educational',
						name: 'Educational'
					},
					{
						value: 'special',
						name: 'Special'
					},
				]
			}
		},

		methods: {
			close() {
				this.dialog = false;
				this.$emit('resetEditedItem');
				this.editedIndex = -1;
				this.editedItem = Object.assign({}, this.defaultItem);
				this.$v.$reset();
			},

			save() {
				this.$v.$touch();

				if (this.$v.$anyError) {
					this.$store.dispatch('snackbar/showSnackbarMessage', {
						message: 'Please enter valid data',
						duration: 6000,
						mode: 'fail'
					});
					return
				}

				this.$emit('save', this.editedItem);
				this.close();
			},
		},

		computed: {
			...mapGetters(
				{
					buildings: 'buildings/getBuildings',
				}
			),

			isCreateTable() {
				return this.editedIndex === -1;
			},

			formTitle() {
				return this.isCreateTable ? 'Create new building' : 'Edit building';
			},

			buttonText() {
				return this.isCreateTable ? 'CREATE PROJECT' : 'EDIT PROJECT';
			},

			isIdUniqueRequired() {
				return this.isCreateTable && this.buildings.some(oneBuilding => oneBuilding.id === this.editedItem.id)
			},

			dialog: {
				get() {
					return this.value
				},

				set(value) {
					this.$emit('input', value)
				}
			},

			buildingIdError() {
				const errors = []
				if (!this.$v.editedItem.id.$dirty) {
					return errors
				}

				!this.$v.editedItem.id.minValue && errors.push('Enter positive number for id')
				!this.$v.editedItem.id.required && errors.push('Building id is required.')
				this.isIdUniqueRequired && errors.push('Building id needs to be unique.')

				return errors
			},

			buildingNameError() {
				const errors = []
				if (!this.$v.editedItem.name.$dirty) {
					return errors
				}

				!this.$v.editedItem.name.required && errors.push('Building name is required.')
				return errors
			},

			buildingAreaError() {
				const errors = []
				if (!this.$v.editedItem.area.$dirty) {
					return errors
				}

				!this.$v.editedItem.area.minValue && errors.push('Enter positive number for area')
				!this.$v.editedItem.area.required && errors.push('Building area is required.')
				return errors
			},
		},
	}
</script>

<style lang="scss" scoped>
	.v-label {
		font-size: 14px !important;
	}

	.stripe-card {
		width: 100%;
		height: 45px;
		border-radius: 4px;
	}
</style>