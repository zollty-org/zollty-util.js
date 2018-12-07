/**
 * 中国三大运营商的电话号码
 */
const isPhoneNum = (str) => {
  const reg = /^((86)?(13[0-9]|15[0-3,5-9]|18[0-9]|19[89]|17[0135678]|166|14[579])\d{8})$/
  return reg.test(str)
}

export default isPhoneNum
