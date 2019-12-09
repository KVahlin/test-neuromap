<template>
	<div id="addevent" >
		 <!-- addevent: начало -->
		 <template>
			<el-row>
				<el-col :span="24">
					<el-form  :model="addEventForm" label-position="top" :rules="rules" ref="addEventForm" label-width="120px">
								
						<el-form-item label="Заголовок" prop="title">
							<el-input v-model="addEventForm.title"></el-input>
						</el-form-item>

						<el-form-item  required>
							<el-row>
								<el-col :span="9">
									<el-form-item label="Дата" prop="date">
										<el-date-picker v-model="addEventForm.date" :picker-options="{firstDayOfWeek:1}" default-time="00:00:00" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd"  placeholder="Выберите дату" ></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="1">
									&nbsp;
								</el-col>
								<el-col :span="14">
									<el-form-item label="Время" prop="times">
										 <el-time-picker
											is-range
											v-model="addEventForm.times"
											range-separator="-"
											format="HH-mm"
											value-format="H:m"
											start-placeholder="Начало"
											end-placeholder="Окончание">
										</el-time-picker>
									</el-form-item>
								</el-col>
							</el-row>	
						</el-form-item>

						<el-alert center v-if="!isDateSelected" type="warning" :closable="false" title="Перед выбором участников необходимо указать даты проведения мероприятия"></el-alert>
					
						<el-form-item  label="Участинки" required>
							<el-row>
								<el-col :span="11">
									<el-form-item prop="facilitator" >
										<el-select no-data-text="Нет доступных в этот период" :disabled="!isDateSelected" v-model="addEventForm.facilitator" filterable clearable placeholder="Фасилитатор">
											<el-option :key="facilitator.id" v-for="facilitator in this.allowedFacilitators" :label="`${facilitator.lastname} ${facilitator.name}`" :value="facilitator.id"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									&nbsp;
								</el-col>
								<el-col :span="11">
									<el-form-item prop="secretary">
										<el-select  no-data-text="Нет доступных в этот период" :disabled="!isDateSelected" v-model="addEventForm.secretary"  filterable clearable placeholder="Секретарь">
											<el-option :key="secretary.id" v-for="secretary in this.allowedSecretarys" :label="`${secretary.lastname} ${secretary.name}`" :value="secretary.id"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form-item>		

						<el-form-item>
							<el-button type="primary" @click="submitForm()">Сохранить встречу</el-button>
						</el-form-item>

					</el-form>	
				</el-col>
			</el-row>
		</template>
		<!-- addevent: конец -->
	</div>
</template>

<script>

    //
	//  Добавление новой встречи.	
	//	-	Сначала пользователь должен выбрать дату и время проведения встречи
	//	=>	Далее вычисляем парарлельно идущие мероприятия
	//	=>	Далее фильтруем список пользователей, запрещяя учавствовать в двух встречах одновременно
	//	+	Дополнительно разбиваем список на два , чтобы один пользователь не мог быть в двух ролях одновременно
	//
	
   	import Moment from 'moment';
	import { extendMoment } from 'moment-range';
	
	const moment = extendMoment(Moment);
	
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
				addEventForm: {
					title: "",
					facilitator: "",
					secretary: "",
					date: "",
					times: ""
				},
       			 rules: {
					title: [
						{ required: true, message: 'Укажите заголовок мероприятия', trigger: 'blur' },
						{ min: 3, message: 'Заголовок должен быть от 3-х символов', trigger: 'blur' }
					],
					facilitator: [
						{ required: true, message: 'Укажите фасилитатора', trigger: 'blur' }
					],
					secretary: [
						{ required: true, message: 'Укажите фасилитатора', trigger: 'blur' }
					],
					date: [
						{ required: true, message: 'Укажите дату  мероприятия', trigger: 'blur' }
					],
					times: [
						{ required: true, type: 'array', message: 'Укажите время начала и окончания мероприятия', trigger: 'blur' }
					]
					
				}
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
		//	--watch
		//
		
		watch: {
			
		},

		//
		//	--computed
		//
		
		computed: {
			
			startTime: function(){
				return !(this.addEventForm.times instanceof Array)?'00:00':this.addEventForm.times[0]
			},

			endTime: function(){
				return !(this.addEventForm.times instanceof Array)?'00:00':this.addEventForm.times[1]
			},

			formatedDate: function(){
				return (this.addEventForm.date=='')?moment().format('YYYY-MM-DD'):this.addEventForm.date
			},

			startDate: function(){
				return moment(`${this.formatedDate} ${this.startTime}`)
			},

			endDate: function(){
				return moment(`${this.formatedDate} ${this.endTime}`)
			},

			isDateSelected: function(){
				return (this.addEventForm.date!='')&&(this.addEventForm.times!='')
			},

			users: function(){
                return this.$store.getters.users.filter((user)=>{
					return !this.isUserBusy(user.id)
				})
			},

			currentEventRange: function() {
				return moment.range(this.startDate, this.endDate)
			},

			parallelEvents: function(){
                return this.$store.getters.events.filter((event)=>{
					if(this.isDateSelected) {
						let eventRange = moment.range(event.start, event.end)
						return moment.isRange(this.currentEventRange.intersect(eventRange))
					} else {
						return false
					}
				})
			},

			//
			//	Если секретарь уже выбран, то не даём выбрать его же в качестве фасилитатора. И наоборот.
			//

			allowedFacilitators: function(){
				return this.users.filter((user)=>{
					return !(this.addEventForm.secretary==user.id)
				})
			},

			allowedSecretarys: function(){
				return this.users.filter((user)=>{
					return !(this.addEventForm.facilitator==user.id)
				})
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

			//
			//	Проверка пользователя на участиве в парарельно проходящих мероприятиях
			//

			isUserBusy(userId){
				return this.parallelEvents.some(event => {
					return ((event['facilitator']==userId)||(event['secretary']==userId))
				});	
			},

            //
            //  Обработчики формы
            //

			submitForm() {
				this.$refs['addEventForm'].validate((valid) => {
                    if (valid) {
						this.addEvent({
							title: this.addEventForm.title,
							facilitator: this.addEventForm.facilitator,
							secretary: this.addEventForm.secretary,
							start: this.startDate.unix()*1000,
							end: this.endDate.unix()*1000
						})
						this.addEventForm = {
							title: "",
							facilitator: "",
							secretary: "",
							date: "",
							times: ""
						}
						this.$emit('eventCreated')
                    } else {
                        console.log('Submit error');
                        return false;
                    }
				});
			}
		}
	
  }
</script>

<style>
	#addevent .el-select, #addevent .el-range-editor, #addevent .el-date-editor {
		width: 100% !Important
	}
</style>
