export enum AccountType {
  ADMIN = 'admin',
  UW_MANAGER = 'uw_manager',
  UNDERWRITER = 'underwriter',
  APPRAISER = 'appraiser',
  LOCK_DESK = 'lock_desk',
  LOAN_SETUP = 'loan_setup',
  DISCLOSURE_SPEC = 'disclosure_spec',
  CLOSER = 'closer',
  POST_CLOSER = 'post_closer',
  NATIONAL_SALE = 'national_sale',
  OPERATION_SUPERVISOR = 'operation_supervisor',
  ACCOUNT_MANAGER = 'account_manager',
  ACCOUNT_EXECUTIVE = 'account_executive',
  BROKER = 'broker',
  CORRESPONDENT = 'correspondent',
  BRANCH = 'branch',
  LOAN_OFFICER = 'loan_officer',
  LOAN_PROCESSOR = 'loan_processor',
}

export enum UserStatus {
  ALL = 'all',
  Active = 'active',
  Inactive = 'inactive',
}

export type UserOrderBy = 'companyName' | 'name' | 'email' | 'phone' | 'companyNmls' | 'accountType'

export interface UserFilterQuery {
  query?: string
  status?: UserStatus
  accountType?: AccountType
  orderBy?: UserOrderBy
  orderDir?: 1 | -1
  skip?: number
  count?: number
}

export const UserStatusFilters = {
  all: 'All',
  active: 'Active',
  inactive: 'Inactive',
}

export const permissionRequireTypes = [
  AccountType.ACCOUNT_EXECUTIVE,
  AccountType.BROKER,
  AccountType.CORRESPONDENT,
  AccountType.BRANCH,
]

export const isNeedAccountTypeValidate = (accountType: AccountType) => {
  return permissionRequireTypes.indexOf(accountType) != -1
}

export interface UserActivityFilterQuery {
  startDate?: string
  endDate?: string
  email?: string
}

export enum UserActivityType {
  LOGIN = 'login',
  FORGET_PASSWORD = 'forget_password',
  RESET_PASSWORD = 'reset_password',
  REGISTER_USER = 'register_user',
  CREATE_USER = 'create_user',
  UPDATE_USER = 'update_user',
}
