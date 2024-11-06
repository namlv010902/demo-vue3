import type { AxiosRequestConfig } from 'axios'
import { APIQueryKey } from './vue-query'
import { instance } from './instance'

type ApiOptions<T extends AxiosRequestConfig> = {
  method?: 'post' | 'put' | 'patch' | 'delete'
  urlKey: keyof typeof APIQueryKey
  config?: T
}

const createApi = <T extends AxiosRequestConfig>({
  method = 'post',
  urlKey,
  config
}: ApiOptions<T>) => {
  return instance[method](APIQueryKey[urlKey], config?.data)
}

const updateApi = <T extends AxiosRequestConfig>({
  method = 'put',
  urlKey,
  id,
  config
}: ApiOptions<T> & { id: number }) => {
  return instance[method](`${APIQueryKey[urlKey]}/${id}`, config?.data)
}

const deleteApi = <T extends AxiosRequestConfig>({
  urlKey,
  id
}: ApiOptions<T> & { id: number }) => {
  return instance.delete(`${APIQueryKey[urlKey]}/${id}`)
}

export { deleteApi, createApi, updateApi }