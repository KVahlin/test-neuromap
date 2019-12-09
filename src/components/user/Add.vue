<template>
	<div id="add" >
		<!-- add: начало -->
		<el-form :model="addUserForm" label-position="top" :rules="rules" ref="addUserForm" label-width="120px">
								
			<el-form-item label="Имя" prop="name">
				<el-input v-model="addUserForm.name"></el-input>
			</el-form-item>

			<el-form-item label="Фамилия" prop="lastname">
				<el-input v-model="addUserForm.lastname"></el-input>
			</el-form-item>
								
			<el-form-item>
				<el-button type="primary" @click="submitForm()">Добавить</el-button>
			</el-form-item>

		</el-form>
		<!-- add: конец -->
	</div>
</template>

<script>

    /*
    **  Добавление нового пользователя и запись его в localstorage
    */
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
				addUserForm: {
					name: '',
					lastname: ''
				},
       			 rules: {
					name: [
						{ required: true, message: 'Укажите имя пользователя', trigger: 'blur' },
						{ min: 2, message: 'Имя должно быть от 2-х символов', trigger: 'blur' }
					],
					lastname: [
						{ required: true, message: 'Укажите фамилию пользователя', trigger: 'blur' },
						{ min: 2,  message: 'Фамилия должна быть от 2-х символов', trigger: 'blur' }
					],
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
			submitForm() {
				this.$refs['addUserForm'].validate((valid) => {
                    if (valid) {
						this.addUser(this.addUserForm)
						this.resetForm()
						this.$notify({
							title: 'Пользователь добавлен',
							message: 'Вы можете привязать его ко встречи',
							type: 'success'
						});
                    } else {
                        console.log('Submit error');
                        return false;
                    }
				});
			},
			resetForm() {
				this.$refs['addUserForm'].resetFields();
			}
		}
 	 }
</script>

<style>

</style>
