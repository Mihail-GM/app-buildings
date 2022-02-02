<template>
	<TheLayoutWrap>
		<div class="d-flex justify-center align-center flex-column">
			<div class="blue--text text-h1"> 404 </div>
			<h1 class=""> PAGE NOT FOUND </h1>

			<div class="px-10">
				<h2 class="text--secondary"> Oops! You weren't supposed to see this </h2>
				<small class="text--secondary"> The page you are looking for doesn't exist.</small>
			</div>
		</div>
	</TheLayoutWrap>
</template>

<script>
	import TheLayoutWrap from "../layouts/TheLayoutWrap";

	export default {
		name: 'PageNotFound',

		components: {
			TheLayoutWrap,
		},
	}
</script>
