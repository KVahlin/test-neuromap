import Main from './src/components/Main.vue'
import Users from './src/components/user/Index.vue'
import AddEvent from './src/components/events/Add.vue'

export default {
    routes:[
      { path:'/',component: Main},
      { path:'/users/list',component: Users, props: true},
      { path:'/events/add',component: AddEvent, props: true},
    ]
}