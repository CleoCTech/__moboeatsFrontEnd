import { defineStore } from 'pinia'
import axios from 'axios'
import { useBaseUrl } from '@/composables/useBaseUrl';
import { useLocalStorage } from "@/composables/useLocalStorage";

let tokens = useLocalStorage('tokens', {admin : null, update : null, basic:null } );


let { baseUrl } = useBaseUrl();

const api = axios.create({
    baseURL: baseUrl,
});



export let useAuthStore =  defineStore("auth", {

    state: () => ({
        authUser: null,
        tokens: tokens,
        authErrors: null,
    }),
    getters: {
        user: (state) => state.authUser,
        errors: (state) => state.authErrors,
    },
    actions: {
        async getToken() {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie")
        },
        async getUser(token) {
            try {
                await this.getToken()
                const bearerToken = token;
                // Set the Authorization header for all API requests
                api.interceptors.request.use((config) => {
                    config.headers.Authorization = `Bearer ${bearerToken}`;
                    return config;
                });
                const response = await api.get("/api/v1/user")
                console.log(response);
                this.authUser = response.data.data.user;
            } catch (error) {   
                console.log(error);
            }
            
        },
        async handleLogin(data) {
            this.authErrors = [];
            try {
                await this.getToken()
                const response =  await axios.post("http://localhost:8000/api/v1/login", {
                    email: data.email,
                    password: data.password
                })
                console.log(response);
                if (response) {
                    this.router.push({ name: 'Dashboard' })
                }
               
               
                this.authUser = response.data.data.user;
                this.tokens.admin = response.data.data.tokens.admin;
                this.tokens.update = response.data.data.tokens.update;
                this.tokens.basic = response.data.data.tokens.basic;
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
                console.log(error);
            }
        },
        async handleRegister (data) {
            this.authErrors = [];
            try {
                await this.getToken()
                const response = await axios.post("http://localhost:8000/api/v1/register", {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation,
                })
                if (response.status === 200 && response.statusText === "OK") {
                    this.router.push({ name: 'Login' })
                }
                
            } catch (error) {
                console.log(error)
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                }
            }
        }

    }
})