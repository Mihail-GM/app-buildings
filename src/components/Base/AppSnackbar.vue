<template>
	<div class="text-center">
		<v-snackbar
			color="deep-purple accent-4"
			class="mb-15"
			elevation="12"
			v-model="showSnackbar"
			:multi-line="multiLine"
			:timeout="snackbarMessageData.duration"
			id="snackbar-message"
		>
			{{ snackbarMessageData.message }}

			<template v-slot:action="{ attrs }">
				<v-btn
					id="snackbar-close-button"
					text
					v-bind="attrs"
					@click="closeSnackbar()"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "AppSnackbar",

		data: () => ({
			multiLine: false,
			showSnackbar: false,
		}),

		methods: {
			closeSnackbar() {
				this.showSnackbar = false;
			},
		},

		computed: {
			...mapGetters(
				{
					snackbarMessageData: 'snackbar/getSnackbarMessage'
				}
			)
		},

		watch: {
			snackbarMessageData() {
				this.showSnackbar = true;
			},
		},
	};

</script>

<style lang="scss" scoped>

</style>