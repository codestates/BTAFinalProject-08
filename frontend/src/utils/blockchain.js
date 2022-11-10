export const validatorMap = {
    '5BDA2D761F5CE86F586870477937D42847F12F11': 'codemonkeyshin',
    FBA3AEF9CB504C662AED5C677EEF0C810E5BEEEE: 'cothi',
    '433AFC12BFA4E7A537629EB9580F8EA7ADE23FDC': 'calvin',
}
export const operatorMap = {
    '5BDA2D761F5CE86F586870477937D42847F12F11':
        'osmovaloper1mhfgfenrp88d2p5dttyw59x8frfk7u9lujg49y',
    FBA3AEF9CB504C662AED5C677EEF0C810E5BEEEE:
        'osmovaloper1w6k4anx2juthw8ka0zyxej26wvdlccwq09x0c6',
    '433AFC12BFA4E7A537629EB9580F8EA7ADE23FDC':
        'osmovaloper1erhzfvsfhue4tz6cz9czrgucecxp3uddf3dds4',
}

export const integerCheck = (v) => {
    for (let i = 0; i < v.length; i++) {
        if ('0' > v[i] || v[i] > '9') {
            return false
        }
    }
    return true
}
