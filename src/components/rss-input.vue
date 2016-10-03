<template>
	<div class="rssInput">
		<input @load="init" type="text" v-model="enteredUrl" :placeholder="placeholder" v-on:keyup.enter="fetchFeed">
		<button @click="fetchFeed">Search</button>
		<span class="input-guide" v-show="this.$parent.rssData.length < 1" >{{bottomText}}</span>
		<div class="input-guide orderby" v-show="this.$parent.rssData.length > 0">
			<span>Order by:</span>
			<button @click="sortByName">Name</button>
			<button @click="sortByDate">Date</button>
		</div>
	</div>
</template>
<script>
	import historyStorage from '../assets/historyStorage';
	export default {

		props: ['placeholder', 'list', 'ajaxUrl'],

		methods: {
			fetchFeed: function (e, rssUrl = this.enteredUrl) {
				this.$parent.resultText = "Loading data... Sometimes server is really slow";
				this.$http.get('https://crossorigin.me/https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' + rssUrl ).then((response) => {
					var responseObject = JSON.parse(response.body);
					if (responseObject.responseStatus == 200) {
						this.$parent.rssData = responseObject.responseData.feed.entries;
						var historyLocation = this.history.indexOf(rssUrl);
						if (historyLocation > -1) {
							this.history.splice(historyLocation, 1);
						}
						this.history.push(rssUrl);
						historyStorage.save(this.history);
					} else {
						this.bottomText = "Sorry but we could not find your rss feed."
						this.$parent.rssData = [];
						this.$parent.resultText = "This is very empty place. You should add RSS feed :)";
					}
				}, (response) => {
					this.bottomText = ("oh noes server is down :(");
				});
			},
			init: function () {
				var historySize = history.length;
				if (historySize > 0) {
					this.fetchFeed(history[historySize - 1]);
				}
			},
			sortByName: function(){
				if(this.currentOrder == "name"){
					this.$parent.rssData.reverse();
				}else{
					this.$parent.rssData.sort(function(a,b){
						if(a.title < b.title) return -1;
						if(a.title > b.title) return 1;
						return 0;
					});
					this.currentOrder = "name";
				}	
				
			},
			sortByDate: function () {
				if(this.currentOrder == "date"){
					this.$parent.rssData.reverse();
				}else{
					this.$parent.rssData.sort(function(a,b){
						var dateA = new Date(a.date).getTime();
						var dateB = new Date(b.date).getTime();
						if(dateA < dateB) return -1;
						if(dateA > dateB) return 1;
						return 0;
					});
					this.currentOrder = "date";
				}
				
			}
		},
		data () {
			return {
				history: historyStorage.fetch(),
				enteredUrl: "",
				currentOrder: "",
				bottomText: "Start your journey by entering rss feed url. Made with love and vue.js 2.0"
			}
		},
		mounted() {
			var historySize = this.history.length;
			if (historySize > 0) {
				this.fetchFeed("", this.history[historySize - 1]);
			}
		},

	}
</script>
<style>
	.rssInput input {
		padding: 10px;
		font-size: 18px;
		border: 1px solid #d0d0d0;
		border-radius: 5px;
		width: calc(100% - 110px);
		box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.16), 0 0px 0px 1px rgba(0, 0, 0, 0.06);
	}

	.rssInput button {
		text-transform: uppercase;
		background: #ff7043;
		color: white;
		font-size: 14px;
		border: none;
		border-radius: 5px;
		font-weight: bold;
		box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.16), 0 0px 0px 1px rgba(0, 0, 0, 0.06);
		padding: 16px 10px 13px;
	}

	.rssInput .input-guide {
		display: block;
		padding-top: 15px;
		color: white;
	}
</style>