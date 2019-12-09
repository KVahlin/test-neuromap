<template>
	<div id="list" >
		<!-- list: начало -->
		<template v-if="users[0]">
			<el-table :data="users">
				<el-table-column label="Имя" prop="name"></el-table-column>
				<el-table-column label="Фамилия" prop="lastname"></el-table-column>
			</el-table>
		</template>
		<template v-else>
			<el-alert
				title="Пользователи отсутствуют"
				type="info"
				:closable="false">
			</el-alert>
		</template>
		<!-- list: конец -->
	</div>
</template>

<script>

    /*
    **  Вывод списка пользователей
    */
	
	export default {
		
		//
		//	Компоненты
		//
		
		components:{
			
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
            users: function(){
                return this.$store.getters.users
            }
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

<style>
	
</style>
