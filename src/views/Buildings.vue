<template>
	<div>
		<Header/>

		<TheLayoutWrap>
			<BuildingsTable/>
		</TheLayoutWrap>
	</div>
</template>

<script>
	import BuildingsTable from "../components/Buildings/BuildingsTable";
	import Header from "../components/Base/Header";
	import TheLayoutWrap from "../layouts/TheLayoutWrap";

	export default {
		name: "Buildings",
		components: {TheLayoutWrap, Header, BuildingsTable},
	}
</script>

<style scoped>

</style>