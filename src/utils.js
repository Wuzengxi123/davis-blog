// 手机号校验
function checkPhone(strMobile) {
    let flag = false
    const reg = /^[1][0,1,3,4,5,6,7,8,9][0-9]{9}$/
    if (strMobile.toString().length === 11 && reg.test(strMobile)) {
        flag = true
    }
    return flag
}

// 手机号码基础校验
function isPoneAvailable(num) {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(num)) {
        return false;
    } else {
        return true;
    }
}

// 节流   类似控制阀门一样定期开放的函数，也就是让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活（类似于技能冷却时间）。
function throttle(fn, delay) {
    let valid = true
    return function () {
        if (!valid) {
            //休息时间 暂不接客
            return false
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}

//  * 获取url后面的参数
function getUrlParam(name) {
    const search = window.location.search;
    const matched = search
        .slice(1)
        .match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'));
    return search.length ? matched && matched[2] : null;
}

export { checkPhone, isPoneAvailable, throttle, getUrlParam }