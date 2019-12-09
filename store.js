export default {
	
	//
	//	--state
	//
	
	state: {
		users: [],
		events: []
	},
	
	//
	//	--getters
	//
	
	getters: {
		
		users: state => {
			return state.users
		},

		events: state => {
			return state.events
        },
        
        userById: state => userId => {
            return state.users.find(user => user.id === userId);
        }

	},

	//
	//	--mutations
	//
	
	mutations: {
		
		//
		//	Обновить всех пользователей
		//
		
		SET_USERS : (state, users) => {
			if(users!==null) {
				state.users = users
			}
		},

		//
		//	Обновить все встречи
		//
		
		SET_EVENTS : (state, events) => {
			if(events!==null) {
				state.events = events
			}
		},

	},
	
	//
	//	--actions
	//
	
	actions: {
		
	}
}