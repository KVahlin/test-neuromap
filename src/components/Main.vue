<template>
	<div id="main" >
		<!-- Main: начало -->
		<h3>Меню</h3>
		<el-button @click="$router.push('/users/list')" icon="el-icon-tickets">Управление пользователями</el-button>
		<template v-if="allowCreateEvent">
			<el-button @click="dialogVisible = true" icon="el-icon-plus" type="primary">Создать встречу</el-button>
		</template>
		<!-- Диалог создание встречи >> -->
		<el-dialog
			title="Добавить встречу"
			:visible.sync="dialogVisible"
			width="40%">
			<addEvent v-on:eventCreated="dialogVisible=false"></addEvent>
		</el-dialog>
		<!-- << Диалог создание встречи -->
		<el-divider></el-divider>
		<template v-if="!allowCreateEvent">
			<p>Чтобы создать встречу, добавьте не менее 2-х пользователей</p>
		</template>
		<Events></Events>
		<!-- Main: конец -->
	</div>
</template>

<script>

	//
	//	Главный экран
	//	
	
	import Events from '../components/events/List.vue'
	import AddEvent from '../components/events/Add.vue'
	export default {
		
		//
		//	Компоненты
		//
		
		components:{
			Events,
			AddEvent
		},
		
		//
		//	Данные
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
			allowCreateEvent: function(){
				return this.$store.getters.users.length>=2
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
