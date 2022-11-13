export const subtractNowAndTime = (isoTime) => {
    const mils = Date.now() - Date.parse(isoTime)
    const subSecond = mils / 1000
    let min = subSecond / 60
    let hour = min / 60
    let day = hour / 24
    //console.log(min, hour, day)

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

export const uosmoToOsmo = (v) => {
    return v / 1000000
}

export const parseAndLocaleString = (v) => {
    if (v === '0001-01-01T00:00:00Z' || !v) {
        return '-'
    }
    let date = new Date(v)
    return date.toLocaleString()
}
