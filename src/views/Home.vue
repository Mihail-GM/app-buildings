<template>
		<TheLayoutWrap>
			<div class="d-flex justify-center align-center flex-column">
				<h1
					id="app-title"
					class="text-decoration-underline py-10"
					style="cursor: pointer"
					@click.stop="$router.push('/buildings')"
				>
					BUILDINGS APP
				</h1>

				<div id="home-main-text" class="text-center px-2">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae commodi distinctio enim ipsum iste
					laudantium magnam minima modi mollitia necessitatibus nemo provident, quam qui quia reiciendis velit, voluptate
					voluptatum?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae commodi distinctio enim ipsum iste
					laudantium magnam minima modi mollitia necessitatibus nemo provident, quam qui quia reiciendis velit, voluptate
					voluptatum?
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci beatae commodi distinctio enim ipsum iste
					laudantium magnam minima modi mollitia necessitatibus nemo provident, quam qui quia reiciendis velit, voluptate
					voluptatum?
				</div>
			</div>
		</TheLayoutWrap>
</template>

<script>
	import TheLayoutWrap from "../layouts/TheLayoutWrap";

	export default {
		name: 'Home',

		components: {
			TheLayoutWrap,
		},
	}
</script>
