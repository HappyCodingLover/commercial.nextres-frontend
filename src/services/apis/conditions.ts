import {
  API_CONDITION_CREATE,
  API_CONDITION_DELETE,
  API_CONDITION_INTEXT_UPDATE,
  API_CONDITION_NEW_NUMBER,
  API_CONDITION_UPDATE,
  API_CONDITIONS,
  API_CONDITIONS_BY_NOS,
  API_CONDITIONS_BY_TEMPLATE,
  API_TASK_CREATE,
  API_TASK_DELETE,
  API_TASK_UPDATE,
  API_TASKS,
  API_TEMPLATE_CREATE,
  API_TEMPLATE_DELETE,
  API_TEMPLATE_UPDATE,
  API_TEMPLATES,
} from 'config'
import Api from 'services/api'

export const getConditions = () => {
  return Api.get(API_CONDITIONS)
}

export const submitCondition = (id: number, data: Record<string, string | number | boolean>) => {
  if (!id) return Api.post(API_CONDITION_CREATE, data)

  return Api.put(API_CONDITION_UPDATE, data, { id })
}

export const updateIntExt = (id: number, value: boolean) => {
  return Api.put(API_CONDITION_INTEXT_UPDATE, { value }, { id })
}

export const deleteCondition = (id: number) => {
  return Api.delete(API_CONDITION_DELETE, {}, { id })
}

export const getTemplates = () => {
  return Api.get(API_TEMPLATES)
}

export const submitTemplate = (id: number, data: Record<string, string | number | boolean>) => {
  if (!id) return Api.post(API_TEMPLATE_CREATE, data)

  return Api.put(API_TEMPLATE_UPDATE, data, { id })
}

export const deleteTemplate = (id: number) => {
  return Api.delete(API_TEMPLATE_DELETE, {}, { id })
}

export const getTasks = () => {
  return Api.get(API_TASKS)
}

export const submitTask = (id: number, data: Record<string, string | number | boolean>) => {
  if (!id) return Api.post(API_TASK_CREATE, data)

  return Api.put(API_TASK_UPDATE, data, { id })
}

export const deleteTask = (id: number) => {
  return Api.delete(API_TASK_DELETE, {}, { id })
}

export const getConditionsByTemplate = (templateNo: number) => {
  return Api.get(API_CONDITIONS_BY_TEMPLATE, {}, { templateNo })
}

export const getConditionsByNos = (conditionNos: Array<number>) => {
  return Api.post(API_CONDITIONS_BY_NOS, { conditionNos })
}

export const generateNewConditionNo = () => {
  return Api.get(API_CONDITION_NEW_NUMBER)
}
