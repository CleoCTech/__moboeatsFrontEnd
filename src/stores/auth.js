import { defineStore } from 'pinia'
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js'
import { useApi } from '@/api/useAPI'
import PageLoader from '@/components/PageLoader.vue'

const web = useApi('web')
const api = useApi('api')

const isLoading = ref(false);

export const useAuthStore = defineStore({
	id: 'auth',

    state: () => {
        const storedState = JSON.parse(localStorage.getItem('AUTH_STATE'));
    
        return {
          email: null,
          token: null,
          isLoggedIn: false,
          ...storedState,
        };
      },

	actions: {
		updateState(payload) {
			let newUserState = { ...this.$state, ...payload }
			localStorage.removeItem('AUTH_STATE')
			localStorage.setItem('AUTH_STATE', JSON.stringify(newUserState))
			this.$reset()
		},
        async getToken() {
            await web.get("/sanctum/csrf-cookie")
        },
		async handleLogin(data) {
            isLoading.value = true;
			const user = useUserStore()
			try {
                await this.getToken()
				const response =  await api.post('/login', {  email: data.email, password: data.password, userType: data.user_type})
                console.log(response);
                if (response) {
                    this.updateState({ email: data.email,token:response.data.data.token, isLoggedIn: true })
				    await user.storeInfo()
					if (response.data.data.user.role === 'admin' || response.data.data.user.role === 'restaurant') {
						await this.router.push({ name: 'Dashboard' })
					} else {
						this.logout()
						console.log('Unathorized');
					}
                    
                }
                isLoading.value = false;
			} catch (error) {
				console.log(error);
				//  if (error.response.status === 422) {
                //     // this.authErrors = error.response.data.errors;
                // }
                // console.log(error);
                isLoading.value = false;
			}
		},
		async handleRegister(data) {
			// const user = useUserStore()
			try {
                await this.getToken()
				const response = await api.post('/register', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                    userType: data.user_type,
                })
				// this.updateState({ email: data.email, isLoggedIn: true })
				// await user.storeInfo()
                if (response.status === 200 && response.statusText === "OK") {
                    await this.router.push({ name: 'Login' })
                }
			} catch (error) {
				console.log('Error at register: ', error.message)
                if (error.response.status === 422) {
                    // this.authErrors = error.response.data.errors;
                }
				// throw error
			}
		},
		async forgotPassword({ email }) {
			try {
				await web.post('/forgot-password', { email })
			} catch (error) {
				console.log('ERROR WITH FORGOT-PASSWORD ENDPOINT: ', error.message)
				throw error
			}
		},
		async logout() {
            isLoading.value = true;
			const user = useUserStore()
            this.email = null;
            this.token = null;
            this.isLoggedIn = false;
			localStorage.clear() // always clean localStorage before reset the state
			this.$reset()
			user.$reset()

			try {
				await api.post('/logout')
				await this.router.push({ name: 'Login' })
                isLoading.value = false;
			} catch (error) {
                isLoading.value = false;
				window.location.pathname = '/login'
			}
		},
	},
})