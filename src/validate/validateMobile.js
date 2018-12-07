import isPhoneNum from './isPhoneNum'

const validateMobile = (rule, value, callback) => {
  if (value !== undefined && value !== '' && !isPhoneNum(value)) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

export default validateMobile
