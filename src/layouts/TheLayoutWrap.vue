<template>
	<div>
		<v-main class="mt-5">
			<v-container>
				<slot></slot>
			</v-container>
		</v-main>

		<v-navigation-drawer v-model="drawer" app>
			<v-list>
				<v-list-item
					v-for="item in menuItems"
					:key="item.title"
					:to="item.path"
					:id="'mobile-navigation-' + item.title"
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>{{ item.title }}</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-toolbar dark bottom width="100%" class="px-md-10 px-sm-0 px-xs-0" style="position: fixed;">
			<span class="hidden-md-and-up">
		        <v-app-bar-nav-icon @click="drawer = !drawer"/>
	        </span>

			<v-btn
				class="hidden-sm-and-down"
				text
				x-large
				v-for="item in menuItems"
				:key="item.title"
				:id="'navigation-' + item.title.toLowerCase()"
				@click.stop="$router.push(item.path)"
			>
				<v-icon left dark> {{ item.icon }}</v-icon>
				{{ item.title }}
			</v-btn>

			<v-spacer></v-spacer>

			<v-toolbar-title>
				<h3
					id="app-title-navigation"
					@click.stop="$router.push(`/`)"
					style="cursor: pointer"
				>
					{{ appTitle }}
				</h3>
			</v-toolbar-title>

		</v-toolbar>
	</div>
</template>

<script>

	export default {
		name: "TheLayoutWrap",

		data: () => ({
			drawer: false,
			appTitle: 'Buildings App',
			menuItems: [
				{
					icon: 'mdi-home-circle',
					title: 'Home',
					path: '/'
				},
				{
					icon: 'mdi-office-building',
					title: 'Buildings',
					path: '/buildings'
				},
			]
		}),
	};
</script>

<style scoped>

</style>