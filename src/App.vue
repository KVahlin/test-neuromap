<template>
	<div id="app" >
		<div class="header">
			<div class="wrapper">
				<router-link class="logo" to="/">Vue test app</router-link>
			</div>
		</div>
		<div class="content">
			<div class="wrapper">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>	
		<div class="footer">
			<div class="wrapper">
				&copy; 2019 VAHLIN
			</div>
		</div>			
	</div>
</template>

<script>
	export default {
		
		//
		//	--components
		//	

		components:{
			
		},
		
		//
		//	--data
		//

		data: function(){
		  return {
			 dialogVisible: false
		  }
		},
		
		
		//
		//	--mounted
		//
		
		mounted: function(){
			window.addEventListener('storage', this.updateStore)
		},

		//
		//
		//	

		beforeDestroy: function(){
			window.removeEventListener("storage", this.updateStore);
		},
		
		//
		//	--created
		//
		
		created: function(){
			
		},
		
		//
		//	--computed
		//
		
		computed: {
			
		},

		//
		//	--watch
		//

		watch:{

		},

		
		//
		//	--beforeMount
		//
		
		beforeMount: function(){
			this.sync(['users','events'])
		},
		
		//
		//	--methods
		//
		
		methods: {
			updateStore: function(event){
				this.sync(['users','events'])
			}
		}

	}
</script>

<style>

	* {
		font-family: 'Roboto'
	}

	html,body,#app {
		height: 100%
	}

	body {
		overflow-y: scroll
	}

	#app {
		display: flex;
		flex-direction: column
	}

	a {
		color: #409EFF;
		font-size: 13px;
	}

	.wrapper {
		margin: 0 auto;
		width: 1180px;
	}

	.header {
		flex: 0 0 auto;
		height: 50px;
		border-bottom: solid 1px #ddd
	}

		.header a {
			line-height: 50px;
		}

		.header .logo {
			color: #000;
			text-decoration: none;
			font-weight: 700;
			font-size: 18px
		}

	.content {
		flex: 1 0 auto;
		padding: 20px 0
	}

	.footer {
		flex: 0 0 auto;
		background: #303133;
		height: 100px;
		line-height: 100px;
		color: #fff
	}

</style>
