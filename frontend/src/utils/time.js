export const subtractNowAndTime = (isoTime) => {
    const mils = Date.now() - Date.parse(isoTime)
    const subSecond = mils / 1000
    let min = subSecond / 60
    let hour = min / 60
    let day = hour / 24

    if (subSecond < 60) {
        return Math.floor(subSecond) + 's ago'
    }

    if (min < 60) {
        return Math.floor(min) + 'm ago'
    }
    if (hour < 24) {
        return Math.floor(hour) + 'h ago'
    }
    return Math.floor(day) + 'day ago'
}
