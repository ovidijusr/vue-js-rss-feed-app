<template>
	<div class="rss-history">
		<div class="container">
			<h3>Recent rss feeds:</h3>
			<ul>
				<li v-show="history.length < 1" >No recent feeds :(</li>
				<li @click="open" v-for="story in history">{{story}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import historyStorage from '../assets/historyStorage';
	export default {
		data () {
			return {
				history: historyStorage.fetch()
			}
		},
		methods: {
			open: function(){
				
			}
		}
	}
</script>
<style>
	.rss-history{
		display: flex;
		justify-content: center;
	}
</style>