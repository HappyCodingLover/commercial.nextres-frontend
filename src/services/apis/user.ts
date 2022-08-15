import {
  AccountType,
  API_USER_ACCOUNT_EXECUTIVES,
  API_USER_ACTIVITIES,
  API_USER_ACTIVITY_FILTER,
  API_USER_CHECK_PASSPORT,
  API_USER_CHILDREN,
  API_USER_CREATE,
  API_USER_DELETE,
  API_USER_FILTER,
  API_USER_FORGET_PASSWORD,
  API_USER_GET_LOGS,
  API_USER_PROFILE,
  API_USER_PROPS,
  API_USER_REGISTER,
  API_USER_RESET_PASSWORD,
  API_USER_ROLES,
  API_USER_TREE,
  API_USER_UPDATE,
  API_USER_UPDATE_PWD,
  API_USER_UPDATE_STATUS,
  UserActivityFilterQuery,
  UserFilterQuery,
} from 'config'
import Api from 'services/api'

export const requestUserRoles = (accountType: AccountType, userId = 0): Promise<Record<number, string>> => {
  return Api.get(API_USER_ROLES, { accountType, userId })
}

export const getAccountExecutives = (): Promise<Record<number, string>> => {
  return Api.get(API_USER_ACCOUNT_EXECUTIVES)
}

export const requestUserProps = (
  userId: number,
): Promise<Record<'street' | 'city' | 'state' | 'companyName' | 'companyNmls' | string, string>> => {
  return Api.get(API_USER_PROPS, {}, { userId })
}

export const registerUser = (data: Record<string, string | number | boolean>) => {
  return Api.put(API_USER_REGISTER, data)
}

export const submitUser = (userId: number, data: Record<string, string | number | boolean>) => {
  if (!userId) return Api.post(API_USER_CREATE, data)

  return Api.put(API_USER_UPDATE, data, { userId })
}

export const filterUsers = (filterQuery: UserFilterQuery = {}) => {
  return Api.get(API_USER_FILTER, filterQuery)
}

export const updateUserStatus = (userId: number, status: boolean) => {
  return Api.put(API_USER_UPDATE_STATUS, { status }, { userId })
}

export const deleteUser = (userId: number) => {
  return Api.delete(API_USER_DELETE, {}, { userId })
}

export const updatePassword = (userId: number, password: string) => {
  return Api.put(API_USER_UPDATE_PWD, { password }, { userId })
}

export const getChildUsers = (userId: number) => {
  return Api.get(API_USER_CHILDREN, {}, { userId })
}

export const updateChildUserTypes = (userId: number, values: Record<string, string>) => {
  return Api.put(API_USER_CHILDREN, { values }, { userId })
}

export const getUserTree = () => {
  return Api.get(API_USER_TREE, {}, {})
}

export const getUserLogs = (userId: number, fieldName: string) => {
  return Api.get(API_USER_GET_LOGS, {}, { userId, fieldName })
}

export const updateProfile = (data: Record<string, string | number | boolean>) => {
  return Api.put(API_USER_PROFILE, data)
}

export const sendForgetPasswordEmail = (email: string) => {
  return Api.post(API_USER_FORGET_PASSWORD, { email })
}

export const checkPassport = (selector: string, token: string) => {
  return Api.get(API_USER_CHECK_PASSPORT, {}, { selector, token })
}

export const resetPassword = (selector: string, token: string, password: string) => {
  return Api.post(API_USER_RESET_PASSWORD, { password }, { selector, token })
}

export const filterUserActivity = (filterQuery: UserActivityFilterQuery = {}) => {
  return Api.get(API_USER_ACTIVITY_FILTER, filterQuery)
}

export const filterUserActivities = (id: number, filter: any = {}) => {
  return Api.get(API_USER_ACTIVITIES, filter, { userId: id })
}
