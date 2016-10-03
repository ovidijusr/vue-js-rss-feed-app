<template>
	<div class="rssInput">
		<input @load="init" type="text" v-model="enteredUrl" :placeholder="placeholder">
		<button @click="fetchFeed">Search</button>
		<span class="input-guide">{{bottomText}}</span>
	</div>
</template>
<script>
	import historyStorage from '../assets/historyStorage';
	export default {
		
		props: ['placeholder', 'list', 'ajaxUrl'],
		
		methods: {
			fetchFeed: function (e, rssUrl = this.enteredUrl) {
				console.log(rssUrl);
				this.$http.get('https://crossorigin.me/https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' + rssUrl + '&m=10').then((response) => {
					var responseObject = JSON.parse(response.body);
					if (responseObject.responseStatus == 200) {
						this.$parent.rssData = responseObject.responseData.feed.entries;
						var historyLocation = this.history.indexOf(rssUrl);
						if (historyLocation > -1){
							this.history.splice(historyLocation,1);
						}
						this.history.push(rssUrl);
						historyStorage.save(this.history);
					} else {
						this.bottomText = "Sorry but we could not find your rss feed."
					}
				}, (response) => {
					this.bottomText = ("oh noes server is down :(");
				});
			},
			init: function(){
				var historySize = history.length;
				if(historySize > 0){
					this.fetchFeed(history[historySize-1]);
				}
			}
		},
		data () {
			return {
				history: historyStorage.fetch(),
				enteredUrl: "",
				bottomText: "Start your journey by entering rss feed url. Made with love and vue.js 2.0"
			}
		},
		mounted() {
			var historySize = this.history.length;
			if(historySize > 0){
				this.fetchFeed("",this.history[historySize-1]);
			}
		},
		
	}
</script>
<style>
	.rssInput input{
		padding: 10px;
		font-size: 18px;
		border: 1px solid #d0d0d0;
		border-radius: 5px;
		width: calc(100% - 110px);
		box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.16),0 0px 0px 1px rgba(0, 0, 0, 0.06);
	}
	.rssInput button{
		text-transform: uppercase;
		padding: 13px 10px;
		background: #ff7043;
		color: white;
		font-size: 14px;
		border: none;
		border-radius: 5px;
		font-weight: bold;
		box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.16),0 0px 0px 1px rgba(0, 0, 0, 0.06);
	}
	.rssInput .input-guide{
		display: block;
		padding-top: 15px;
		color:white;
	}
</style>