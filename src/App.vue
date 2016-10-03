<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <div class="header">
      <div class="container">
        <h1>RSS FEED</h1><br>
        <rssInput :list="rssData" placeholder="Enter your rss feed url"></rssInput>
      </div>
    </div>
    <rssResults :list="rssData"></rssResults> 
    <rss-history></rss-history>
    <rss-modal></rss-modal>
  </div>
</template>

<script>

import rssInput from './components/rss-input.vue'
import rssResults from './components/rss-results.vue'
import rssHistory from './components/rss-history.vue'
import rssModal from './components/rss-modal.vue'


export default {
  data(){
    return{
      rssData:[],
      showModal: false,
      modalInfo: {},
    }
  },
  components: {
    rssInput, rssResults, rssHistory, rssModal
  }
}
</script>

<style>
html,body,h1 {
  margin:0;
  padding:0;
  font-family: Helvetica, sans-serif;
}
body{
  background: #fafafa;
}
.container{
  max-width:1200px;
  display:flex;
  align-self: center;
  flex-direction: column;
  width: 100%;
}
.header{
  width:100%;
  height:180px;
  background: #e65100;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.16),0 0px 0px 1px rgba(0, 0, 0, 0.06);
}
h1{
  color:white;
  font-size: 40px;
}
@media(max-width: 1024px){
  .container{
    padding: 10px;
  }
}  
</style>
