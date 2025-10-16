import { defineStore } from 'pinia'

interface User {
    id: string
    email: string
    first_name: string
    last_name: string
    role: string
}

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,
        isAuthenticated: false,
        loading: false
    }),

    actions: {
        async login(email: string, password: string) {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const response = await $fetch('/api/v1/auth/login', {
                    baseURL: config.public.apiBase,
                    method: 'POST',
                    body: { email, password },
                    credentials: 'include'
                })

                this.user = response.user
                this.isAuthenticated = true
                return { success: true, data: response }
            } catch (error: any) {
                console.error('Login error:', error)
                let message = 'Login failed'

                if (error.response?._data?.message) {
                    message = error.response._data.message
                } else if (error.data?.message) {
                    message = error.data.message
                } else if (error.message) {
                    message = error.message
                }

                return { success: false, error: message }
            } finally {
                this.loading = false
            }
        },

        async register(userData: any) {
            this.loading = true
            try {
                const config = useRuntimeConfig()
                const response = await $fetch('/api/v1/auth/register', {
                    baseURL: config.public.apiBase,
                    method: 'POST',
                    body: userData,
                    credentials: 'include'
                })
                return { success: true, data: response }
            } catch (error: any) {
                console.error('Register error:', error)
                let message = 'Registration failed'

                if (error.response?._data?.message) {
                    message = error.response._data.message
                } else if (error.data?.message) {
                    message = error.data.message
                } else if (error.message) {
                    message = error.message
                }

                return { success: false, error: message }
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                const config = useRuntimeConfig()
                await $fetch('/api/v1/auth/logout', {
                    baseURL: config.public.apiBase,
                    method: 'POST',
                    credentials: 'include'
                })
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                this.user = null
                this.isAuthenticated = false
                await navigateTo('/login')
            }
        },

        async checkAuth() {
            try {
                const config = useRuntimeConfig()
                const response = await $fetch('/api/v1/profile', {
                    baseURL: config.public.apiBase,
                    credentials: 'include'
                })
                this.user = response.user
                this.isAuthenticated = true
                return true
            } catch (error) {
                console.log('Auth check failed - user not authenticated')
                this.user = null
                this.isAuthenticated = false
                return false
            }
        }
    }
})