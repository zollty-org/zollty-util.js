/**
 * 国际标准的银行卡号（储蓄卡和信用卡），注意：不包括各个银行的企业账户
 */
export default (str) => {
  const reg = /^([45][0-9]{11,15}|62[0-9]{14,17})$/
  return reg.test(str)
}
