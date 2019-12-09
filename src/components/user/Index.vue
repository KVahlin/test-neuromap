<template>
	<div id="users" >
		 <!-- users: начало -->
		 <template>
			 <h1>Управление пользователями</h1>
			<el-row :gutter="24">
				<el-col :span="11">
					<h4>Список добавленных</h4>
					<UserList></UserList>
				</el-col>
				<el-col :span="2">
					&nbsp;
				</el-col>
				<el-col :span="11">
					<h4>Новый пользователь</h4>
					<UserAdd></UserAdd>
				</el-col>
			</el-row>
		</template>
		<!-- users: конец -->
	</div>
</template>

<script>

	//
	//  Вывод формы добавления пользователя и список пользователей
	//
	
	import UserAdd from './Add.vue'
	import UserList from './List.vue'
	export default {
		
		//
		//	Компоненты
		//
		
		components:{
			UserAdd,
			UserList
		},
		
		//
		//	Данные
		//
		
		data: function(){
			return {
				
        	}
		},
		//
		//	--mounted
		//
		
		mounted: function(){
			
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
		//	--beforeMount
		//
		
		beforeMount: function(){
			
		},
		
		//
		//	--methods
		//
		
		methods: {
			
		}
	
  }
</script>

<style lang="stylus">

</style>
