<template>
	<div id="events" >
		 <!-- events: начало -->
		 <template v-if="this.events[0]">
			<h1>Встречи</h1>
			<el-row :gutter="24">
				<el-col :span="8" v-for="event in this.events" :key="event.id">
					<Event :params="event"></Event>
				</el-col>
			</el-row>
		</template>
		<template v-else>
			<el-alert
				title="Встречи отсутствуют"
				type="info"
				:closable="false">
			</el-alert>
		</template>
		<!-- events: конец -->
	</div>
</template>

<script>

	//
	//	Вывод списка встреч
	//
	
	import Event from './Item.vue'
	export default {
		
		//
		//	Компоненты
		//
		
		components:{
			Event
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
			events: function(){
				return this.$store.getters.events
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
