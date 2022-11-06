export const subtractNowAndTime = (isoTime) => {
    const mils = Date.now() - Date.parse(isoTime)
    const subSecond = Math.floor(mils / 1000)
    return subSecond
}
