/**
 * 中国的身份证号码
 */
const isIdCard = (str) => {
  const reg = /^([1-9]\d{5}[12][0-9]{3}[01][0-9][0-3][0-9]\d{3}[0-9X])$/
  return reg.test(str)
}

export default isIdCard
