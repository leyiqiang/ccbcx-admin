export const ROOT = '/'

export const SIGN_IN = '/login'

export const PARAM_GROUP_NAME = ':groupName'
export const GROUP = '/group'
export const GROUP_LIST = GROUP + '/list'
export const GROUP_DETAILS = GROUP + '/' +  PARAM_GROUP_NAME


export const PARAM_QUESTION_ID = ':questionNumber'
export const QUESTION = '/questionGroup'
export const QUESTION_LIST = QUESTION + '/list'
export const QUESTION_SETTINGS = QUESTION + '/question/' + PARAM_QUESTION_ID


export const DATA = '/data'

export const DATA_GROUP =  DATA + '/group'
export const DATA_GROUP_PROGRESS = DATA + '/group/' + PARAM_GROUP_NAME

export const DATA_QUESTION = DATA + '/question'
export const DATA_QUESTION_PROGRESS = DATA + '/question/' + PARAM_QUESTION_ID

export const DATA_CHART = DATA + '/chart'

