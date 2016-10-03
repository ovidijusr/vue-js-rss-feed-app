<template>
	<div class="rss-results">
		<div class="container">
			<ul v-show="list">
				<h2 v-show="list.length < 1" >{{this.$parent.resultText}}</h2>
				<li v-for="item in list">
					<h3 @click="showModal(item)">{{item.title}}</h3> <span><i>{{item.publishedDate}}</i></span><br>
					<span>{{item.contentSnippet}}</span>
				</li>
			</ul>
		</div>	
	</div>
</template>
<script>
	import historyStorage from '../assets/historyStorage';
	export default {
		props:['list'],
		computed: {
		},
		methods: {
			showModal: function (item) {
				this.$parent.modalInfo = item;
				this.$parent.showModal = true;
			}
		}
	}
</script>
<style>
	.rss-results{
		display: flex;
		justify-content: center;
	}
	.rss-results ul{
		padding-left: 0;
	}
	.rss-results h3{
		font-size:30px;
		padding:0;
		margin:0;
	}
	.rss-results h3:hover{
		color:gray;
		cursor:pointer;
	}
	.rss-results li{
		font-size: 20px;
		margin-bottom: 30px;
		list-style: none;
	}
</style>