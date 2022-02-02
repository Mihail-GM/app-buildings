<template>
	<v-app id="app">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>

		<AppSnackbar/>
	</v-app>
</template>

<script>

	import AppSnackbar from "./components/Base/AppSnackbar";

	export default {
		name: 'App',
		components: {AppSnackbar},

		data: () => ({

		}),
	};
</script>
