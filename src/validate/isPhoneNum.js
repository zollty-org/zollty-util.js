const isPhoneNum = (str) => {
    var telreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!telreg.test(str)) {
        return false
    }
    return true
}

export default isPhoneNum