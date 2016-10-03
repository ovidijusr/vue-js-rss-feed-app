<template>
	<transition name="modal" >
		<div class="modal-mask" v-show="this.$parent.showModal">
			<div class="modal-wrapper">
				<div class="modal-container">

					<div class="modal-header">
						<h2 name="header">
							{{this.$parent.modalInfo.title}}
						</h2>
						Written by <b>{{this.$parent.modalInfo.author}}</b>
					</div>

					<div class="modal-body">
						<slot name="body" v-html="this.$parent.modalInfo.content">
							<span v-html="$parent.modalInfo.content"></span>
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							{{this.$parent.modalInfo.publishedDate}} <br>
							<div class="buttonContainer">
								<button class="modal-default-button" @click="hideModal">
									Back
								</button>
								
								<button class="modal-default-button" @click="openPage($parent.modalInfo.link)">
									Go to page
								</button>
							
								
							</div>
							
							
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		data(){ return{
			showModal: this.$parent.modalInfo
		}},
		methods: {
			hideModal: function(){
				this.$parent.showModal=false;
			},
			openPage(link){
				document.location.href = link;
			}
		}
	}
	
</script>
<style>
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		display: table;
		transition: opacity .3s ease;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}
	.buttonContainer{
		text-align: right;
	}
	.modal-container {
		max-width: 1024px;
		margin: 0px auto;
		padding: 20px 30px;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
		transition: all .3s ease;
		font-family: Helvetica, Arial, sans-serif;
	}

	.modal-header h2 {
		margin-top: 0;
		color: #e65100;
	}

	.modal-body {
		margin: 20px 0;
	}
	.modal-header slot{
		
	}
	
	.modal-default-button {
		
		margin: 0 10px;
		border:none;
		background: #e65100;
		color:white;
		padding:15px;
		font-size:17px;
		border-radius: 5px;
	}
	.modal-default-button:hover{
		cursor: pointer;
		background: rgba(230, 81, 0, 0.77);
	}

	
	.modal-enter {
		opacity: 0;
	}

	.modal-leave-active {
		opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	}
</style>