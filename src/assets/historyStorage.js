export default {
	STORAGE_KEY: 'rssFeedApp', 
	fetch: function () {
		var historyArray = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
		return historyArray;
	},
	save: function (historyArray) {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(historyArray));
}
}