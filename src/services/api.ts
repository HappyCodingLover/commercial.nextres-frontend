import { onApplicationError } from 'actions/application.action'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import isString from 'lodash/isString'

import { store } from '../reducers'

class Api {
  static loan_number: string

  static setLoanNumber(num: string) {
    this.loan_number = num
  }

  static get(route: string, data: any = {}, params: any = {}) {
    return this.xhr(route, data, params, 'get')
  }

  static put(route: string, data: any = {}, params: any = {}) {
    return this.xhr(route, data, params, 'put')
  }

  static post(route: string, data: any = {}, params: any = {}) {
    return this.xhr(route, data, params, 'post')
  }

  static delete(route: string, data: any = {}, params: any = {}) {
    return this.xhr(route, data, params, 'delete')
  }

  static replaceVariables(route: string, params: any) {
    Object.keys(params).forEach((key) => {
      route = route.replace(`:${key}`, params[key])
    })
    return route
  }

  static wrapApiErrors(error: any = {}) {
    try {
      const { status, data } = error.response || {}
      if (!status) {
        throw new Error('Connection with API server is broken')
      }
      if (status === 401) {
        const state = store.getState()
        const {
          auth: { token },
        } = state
        if (token) {
          store.dispatch({ type: 'AUTH_LOGOUT' })
          throw new Error('Unauthorized')
        }
      }
      const { message } = data
      if (!message) {
        throw new Error(data)
      }

      if (isString(message)) {
        throw new Error(message)
      }
      if (status === 400) {
        const { problems = [] } = message
        const mes = problems.reduce((str: string, problem: string) => `${str}\n${problem}`, '')
        throw new Error(mes)
      }
      throw new Error('Unknown error')
    } catch (e) {
      console.log('API error', e)
      store.dispatch(onApplicationError(e))
      throw e
    }
  }

  static xhr(route: string, data = {}, params = {}, method: string) {
    const state = store.getState()

    const sendRequest = (axiosInstance: AxiosInstance) => {
      const url = Api.replaceVariables(route, params)
      const headers: any = {
        'Content-Type': 'application/json',
        'loan-number': this.loan_number,
      }

      if (state.auth.token) {
        headers.Authorization = `Bearer ${state.auth.token}`
      }

      const options: any = {
        baseURL: process.env.REACT_APP_API_URL,
        url,
        method,
        headers,
        timeout: 15000,
      }

      if (method === 'get') {
        options.params = data
      } else {
        options.data = data
      }

      return axiosInstance(options)
        .then((res) => res.data)
        .catch((err) => {
          return Api.wrapApiErrors(err)
        })
    }
    return sendRequest(axios.create())
  }

  static uploadFiles(route: string, data: any = {}, params: any = {}, files: Array<File>) {
    const state = store.getState()

    const sendRequest = (axiosInstance: AxiosInstance) => {
      const url = Api.replaceVariables(route, params)
      const headers: any = {
        'Content-Type': 'multipart/form-data',
      }

      if (state.auth.token) {
        headers.Authorization = `Bearer ${state.auth.token}`
      }

      var formData = new FormData()
      files.forEach((file, index) => formData.append(`files[${index}]`, file))
      Object.keys(data).forEach((key) => formData.append(key, data[key]))

      const options: AxiosRequestConfig<any> = {
        baseURL: process.env.REACT_APP_API_URL,
        url,
        method: 'post',
        headers,
        timeout: 15000,
        data: formData,
      }

      return axiosInstance(options)
        .then((res) => res.data)
        .catch((err) => {
          return Api.wrapApiErrors(err)
        })
    }
    return sendRequest(axios.create())
  }
}

export default Api
