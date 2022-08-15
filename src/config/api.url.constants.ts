export const API_USER_SIGN_IN = '/auth/login'
export const API_USER_FORGET_PASSWORD = '/auth/forgetPassword'
export const API_USER_CHECK_PASSPORT = '/auth/checkPassport/:selector/:token'
export const API_USER_RESET_PASSWORD = '/auth/resetPassword/:selector/:token'
export const API_USER_ACCOUNT_EXECUTIVES = '/auth/getAccountExecutives'
export const API_USER_REGISTER = '/auth/register'

export const API_USER_ROLES = '/user/roles'
export const API_USER_PROPS = '/user/props/:userId'
export const API_USER_CREATE = '/user/submit'
export const API_USER_UPDATE = '/user/submit/:userId'
export const API_USER_PROFILE = '/user/profile'
export const API_USER_FILTER = '/user'
export const API_USER_CHILDREN = '/user/children/:userId'
export const API_USER_UPDATE_STATUS = '/user/updateStatus/:userId'
export const API_USER_DELETE = '/user/delete/:userId'
export const API_USER_UPDATE_PWD = '/user/updatePwd/:userId'
export const API_USER_PERMISSIONS = '/user/permissions'
export const API_USER_GET_LOGS = '/user/logs/:userId/:fieldName'
export const API_GET_ALL_PERMISSIONS = '/ac/details'
export const API_SET_PERMISSION_TO_ROLE = '/ac/role/permissions'
export const API_USER_TREE = '/user/userTree'
export const API_AUDIT_LOG = '/auditLog'

export const API_USER_ACTIVITY_FILTER = '/user/activity'
export const API_USER_ACTIVITIES = '/user/activity/:userId'

export const API_HOME_NEWSLETTER = '/home/newsletter'
export const API_HOME_SUBMIT_CONTACTUS = '/home/submitContactUs'

export const API_DOCS_DOWNLOAD = '/documents/download'
export const API_DOCS_UPLOAD = '/documents/upload'

export const API_LOAN_OVERVIEW = '/loan/overview'
export const API_LOAN_APPLICATION_SET_VALUE = '/loan/applicationValue'
export const API_LOAN_GET_SUBMISSION = '/loan/submission'
export const API_LOAN_UPDATE_SUBMISSION = '/loan/updateSubmission'
export const API_LOAN_PRICING = '/loan/priceLoan'
export const API_LOAN_GET_PRICE_LIMIT = '/loan/getPriceLimit'
export const API_LOAN_SAVE_TO_PIPELINE = '/loan/savePipeline'
export const API_LOAN_UPDATE_FIELDS = '/loan/updateLoanFields'
export const API_LOAN_PIPELINE = '/loan/pipeline'
export const API_LOAN_SAVE_PROCESS = '/loan/saveLoanProcess'
export const API_LOAN_GET_PROCESS = '/loan/getLoanProcess'
export const API_LOAN_SAVE_RATESHEET = '/loan/saveLoanRatesheet'
export const API_LOAN_GET_LATEST_RATESHEET = '/loan/getLatestLoanRatesheet'
export const API_LOAN_LOG = '/loan/log/:key'
export const API_LOAN_HISTORY = '/loan/history'
export const API_BORROWER_INFO_UPDATE = '/loan/borrowerInfo'
export const API_BORROWER_LOG = '/loan/borrowerLogs/:borrowerSeperator/:fieldName'

export const API_VENDOR_CREDIT_REPORT = '/vendor'

export const API_CONDITIONS = '/condition'
export const API_CONDITION_CREATE = '/condition'
export const API_CONDITION_UPDATE = '/condition/:id'
export const API_CONDITION_INTEXT_UPDATE = '/condition/:id/intext'
export const API_CONDITION_DELETE = '/condition/:id'
export const API_CONDITION_NEW_NUMBER = '/condition/newNo'
export const API_CONDITIONS_BY_NOS = '/conditions/byNumbers'

export const API_CONDITIONS_BY_TEMPLATE = '/conditions/:templateNo'

export const API_TEMPLATES = '/template'
export const API_TEMPLATE_CREATE = '/template'
export const API_TEMPLATE_UPDATE = '/template/:id'
export const API_TEMPLATE_DELETE = '/template/:id'

export const API_TASKS = '/task'
export const API_TASK_CREATE = '/task'
export const API_TASK_UPDATE = '/task/:id'
export const API_TASK_DELETE = '/task/:id'
