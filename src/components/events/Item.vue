<template>
	<div id="event" >
		 <!-- event: начало -->
		 <template>
			<el-card class="event-card">
				<div slot="header" class="clearfix">
					<span>{{params.title}}</span>
                    <el-tag :type="this.status.tag" size="mini">{{this.status.label}}</el-tag>
				</div>
				<div  class="text">
					<el-row>
						<el-col :span="11">
							<span class="bold">Фасилитатор</span>{{`${this.facilitator.lastname} ${this.facilitator.name}`}}
						</el-col>
						<el-col :span="2">
							&nbsp;
						</el-col>
						<el-col :span="11">
							<span class="bold"> Секретарь:</span>{{`${this.secretary.lastname} ${this.secretary.name}`}}
						</el-col>
					</el-row>
				</div>
               <div class="bottom">
                   <span>Дата и время встречи: </span>
                   {{this.formatDate(this.params.start)}} с {{this.formatTime(this.params.start)}} до {{this.formatTime(this.params.end)}}
				</div>
			</el-card>	
		</template>
		<!-- event: конец -->
	</div>
</template>

<script>

	//
	//	Вывод встречи
	//
	
	import moment from 'moment';
	export default {
        
        props:['params'],

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
                facilitator: this.$store.getters.userById(this.params.facilitator),
                secretary: this.$store.getters.userById(this.params.secretary)
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
			status:function() {
				if(moment().isBetween(this.params.start, this.params.end, null, '[]')){
					return {
                        label:"Проходит",
                        tag:"success"
                    }
				} else if(moment().isBefore(this.params.start)){
		 			return {
                        label:"Запланирована",
                        tag:"primary"
                    }
				} else {
		 			return {
                        label:"Завершена",
                        tag:"info"
                    }
				}
            },
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
	.event-card {
		margin-bottom: 20px
	}

		.event-card .el-card__header span {
			font-weight: 700
		}

		.event-card .el-card__header .el-tag {
			float: right
		}

	 .event-card .text .bold {
		 font-weight: 700;
		 display: block
	 }

    .event-card .bottom {
        font-weight: 400;
        font-size: 12px;
        color: #666;
		margin: 24px  0 0 0;
       
    }
        .event-card .bottom span {
            font-size: 13px;
            font-weight: 700;
            display: block;
            color: #000;
            margin: 0 0 8px 0
        }
</style>
