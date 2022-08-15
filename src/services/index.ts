import { API_DOCS_UPLOAD } from 'config'

import Api from './api'

export * from './api'
export * from './apis'

export const uploadFiles = (data: any, files: Array<File>) => {
  return Api.uploadFiles(API_DOCS_UPLOAD, data, {}, files)
}
