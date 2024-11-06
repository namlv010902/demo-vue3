import type { AxiosRequestConfig } from "axios"
import { instance } from "."
import { QueryClient, type DefaultOptions,type QueryKey } from "@tanstack/vue-query"

const defaultQueryFn = async ({queryKey}:{queryKey: QueryKey})=>{
    const [endpoint, params, options] = queryKey as Array<string | Record<string, unknown>>
    const response = await instance.get(endpoint as string,{
        params,
       ...(options as AxiosRequestConfig)
    })
    return response.data
}

const queryConfig:DefaultOptions ={
    queries:{
        queryFn:defaultQueryFn,
        refetchOnWindowFocus:false,
        refetchOnMount:true,
        retry: false,
        staleTime: 60 * 1000
    }
}

export const queryClientDefault = new QueryClient({
    defaultOptions: queryConfig
})

export enum APIQueryKey{
    POSTS = 'posts',
    USERS = 'users',
    CATEGORIES = 'categories',
    OPTION_CATEGORIES = 'categories/options',
    LOGIN = 'auth/login',
    REGISTER = 'auth/register',
    REFRESH_TOKEN= 'auth/refreshToken',
    GET_ME = 'auth/me'

}
export {
    defaultQueryFn
}
