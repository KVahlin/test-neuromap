import moment from 'moment'
export default {
	methods:{

		//
		//	Добавляем  массив в localStorage[key]
		//
		
		addToStorage(key,item){
			
			let table = JSON.parse(localStorage.getItem(key))
			if(table == null){
				table = []
			}
			table.push(item)
			localStorage.setItem(key,JSON.stringify(table))
			
			// Синхронизируем
			this.sync([key])
		},

		//
		//	Добавляем user в  localStorage
		//

		addUser({name, lastname}){
			try {

				if(!name){
					throw new Error('Пользователь не может быть создан без имени')
				}

				if(!lastname){
					throw new Error('Пользователь не может быть создан без фамилии')
				}

				this.addToStorage('users',{
					id: `U${(new Date().getTime())}`,
					name: name,
					lastname: lastname
				})
			} catch(error){
				console.log(error)
			}
		},

		//
		//	Добавляем встречу в localStorage
		//

		addEvent({title, facilitator, secretary, start, end}){
			try {

				if(!title){
					throw new Error('Встреча должна содержать название')
				}

				if(!facilitator){
					throw new Error('Встреча должна содержать фасилитатора')
				}

				if(!secretary){
					throw new Error('Встреча должна секретаря')
				}

				if(!start){
					throw new Error('Встреча должна содержать дату начала')
				}

				if(!end){
					throw new Error('Встреча должна содержать дату окончания')
				}

				this.addToStorage('events',{
					id: `E${(new Date().getTime())}`,
					title: title,
					facilitator: facilitator,
					secretary: secretary,
					start: start,
					end: end
				})
			} catch(error){
				console.log(error)
			}
		},

		//
		//	
		//
		
		formatDate: function(unixtime){
			return moment(unixtime).locale('ru').format("Do MMMM YYYY"); 
		},
		
		formatTime: function(unixtime){
			return moment(unixtime).locale('ru').format("HH:mm"); 
		},

		//
		//	Обновляем store из localStorage
		//

		sync(keys){
			keys.forEach(key => {
				console.log(`Синхронизирую localStorage.${key} => store.users`)
				switch(key){
					case 'users':
						try{
							let users = JSON.parse(localStorage.getItem('users'))
							this.$store.commit('SET_USERS',users)
						} catch(e) {
							console.log(e)
						}
						
					break;

					case 'events':
						try{
							let events = JSON.parse(localStorage.getItem('events'))
							this.$store.commit('SET_EVENTS',events)
						} catch(e) {
							console.log(e)
						}
						
					break;
					
					default:
						console.log(`Значения ${key} не подлежит синхронизации store/localStorage`)
				}
			});
			
			
		},

  }
}