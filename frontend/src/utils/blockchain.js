export const integerCheck = (v) => {
    for (let i = 0; i < v.length; i++) {
        if ('0' > v[i] || v[i] > '9') {
            return false
        }
    }
    return true
}
