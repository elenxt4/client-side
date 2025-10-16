export const useApi = () => {
    const config = useRuntimeConfig()

    const apiCall = async (endpoint: string, options: any = {}) => {
        return await $fetch(endpoint, {
            baseURL: config.public.apiBase,
            credentials: 'include',
            ...options
        })
    }

    // Diablo 3 API methods
    const d3 = {
        testToken: () => apiCall('/api/v1/d3/test-token'),
        getProfile: () => apiCall('/api/v1/d3/profile'),
        getActs: () => apiCall('/api/v1/d3/acts'),
        getAct: (actId: number) => apiCall(`/api/v1/d3/act/${actId}`),
        getItem: (itemSlugAndId: string) => apiCall(`/api/v1/d3/item/${itemSlugAndId}`)
    }

    // General API methods
    const hello = () => apiCall('/api/v1/hello')
    const profile = () => apiCall('/api/v1/profile')

    return {
        apiCall,
        d3,
        hello,
        profile
    }
}