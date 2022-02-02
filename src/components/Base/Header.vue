<template>
	<v-app-bar app dense app class="px-md-10 px-sm-0 px-xs-0">
		<v-toolbar-title>
			Welcome
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-icon x-large> mdi-account-circle</v-icon>
	</v-app-bar>
</template>

<script>
	export default {
		name: "Header",

		data: () => ({
			drawer: false,
		})
	}
</script>

<style scoped>

</style>