import { API_DOCS_DOWNLOAD } from 'config'
import Api from 'services/api'

export const downloadS3Documents = (key: string) => {
  return Api.post(API_DOCS_DOWNLOAD, { key })
}
