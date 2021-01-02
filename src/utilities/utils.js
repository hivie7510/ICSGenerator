const formatDate = (date) => {
    if (date && date instanceof Date) {
        //DTSTAMP:19970901T1300Z
        let m = date.getUTCMonth() + 1
        let month = `${m}`
        if (m < 10) {
            month = `0${m}`
        }

        let d = date.getUTCDate()
        let dd = `${d}`
        if (d < 10) {
            dd = `0${d}`
        }

        let h = date.getUTCHours()
        let hh = `${h}`
        if (h < 10) {
            hh = `0${h}`
        }

        let mi = date.getUTCMinutes()
        let min = `${mi}`
        if (mi < 10) {
            min = `0${mi}`
        }

        return `${date.getUTCFullYear()}${month}${dd}T${hh}${min}00Z`
    }
    throw 'formatDate requires a Date object'
}

const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const isValidEmail = (email) => {
    if (!email || !regex.test(email)) {
        return false
    }
    return true
}
module.exports.formatDate = formatDate
module.exports.isValidEmail = isValidEmail
