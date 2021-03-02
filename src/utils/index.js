/* eslint-disable no-mixed-operators */
export const timeAgo = baseDate => {
    const ONE_DAY_SECONDS = 86400

    const createDate = day => new Date(year, month - 1, day, hour, minute)
    const isLeap = year => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
    const [ month, day, year, hour, minute ] = baseDate.split(/(?<=[0-9]+)(?:\/|-)(?=[0-9]+)/g)

    const last_day = createDate(0).getDate()
    const one_year_total_days = isLeap(year) ? 366 : 365

    const diff = (+new Date() - +createDate(day)) / 1000 | 0
    const day_diff = diff / ONE_DAY_SECONDS | 0
    
    return day_diff === 0 && (
            diff < 60 && 'Just now' || 
            diff < 120 && '1 minute ago' || 
            diff < 3600 && `${ (diff / 60 | 0) } minute ago` || 
            diff < 7200 && '1 hour ago' || 
            diff < ONE_DAY_SECONDS && `${ diff / 3600 | 0 } hours ago`
        ) ||
        day_diff === 1 && 'Yesterday' || 
        day_diff < 7 && `${ day_diff } days ago` || 
        day_diff < last_day && `${ day_diff } days ago` ||
        day_diff < one_year_total_days && `${ day_diff / last_day | 0 } months ago` ||
        `${ day_diff / one_year_total_days | 0 } years ago`
}
