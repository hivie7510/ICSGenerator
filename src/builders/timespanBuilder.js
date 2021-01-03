//https://tools.ietf.org/html/rfc5545#section-3.3.6
class TimespanBuilder {
    constructor() {
        this.second = null
        this.minute = null
        this.hour = null
        this.day = null
        this.week = null
    }

    isValid() {
        return this.second || this.minute || this.hour || this.day || this.week
    }

    build() {
        let d = ''
        if (this.week) {
            d += `P${this.week}W`
        }
        if (this.day) {
            d += `${this.week ? '' : 'P'}${this.day}D`
        }
        if (this.hour) {
            d += `T${this.hour}H`
        }
        if (this.minute) {
            d += `${this.hour ? '' : 'P'}${this.minute}M`
        }
        if (this.second) {
            d += `${this.hour || this.minute ? '' : 'P'}${this.second}S`
        }
        return d
    }

    addSeconds(seconds) {
        if (seconds && !isNaN(seconds)) {
            let s = Math.floor(seconds)
            let d = s / 60
            if (d > 0) {
                d = Math.floor(d)
                this.addMinutes(d)
            }
            let s1 = s % 60

            if (this.second) {
                this.second += s1
            } else {
                this.second = s1
            }
        }
        return this
    }

    addMinutes(minutes) {
        if (minutes && !isNaN(minutes)) {
            let s = Math.floor(minutes)
            let d = s / 60
            d = Math.floor(d)
            if (d > 0) {
                d = Math.floor(d)
                this.addHours(d)
            }
            let s1 = s % 60

            if (this.minute) {
                this.minute += s1
            } else {
                this.minute = s1
            }
        }
        return this
    }

    addHours(hours) {
        if (hours && !isNaN(hours)) {
            let s = Math.floor(hours)
            let d = s / 24
            d = Math.floor(d)
            if (d > 0) {
                d = Math.floor(d)
                this.addDays(d)
            }
            let s1 = s % 24

            if (this.hour) {
                this.hour += s1
            } else {
                this.hour = s1
            }
        }
        return this
    }

    addDays(days) {
        if (days && !isNaN(days)) {
            let s = Math.floor(days)
            let d = s / 7
            d = Math.floor(d)
            if (d > 0) {
                d = Math.floor(d)
                this.addWeeks(d)
            }
            let s1 = s % 7

            if (this.day) {
                this.day += s1
            } else {
                this.day = s1
            }
        }
        return this
    }

    addWeeks(weeks) {
        if (weeks && !isNaN(weeks)) {
            let s = Math.floor(weeks)

            if (this.week) {
                this.week += s
            } else {
                this.week = s
            }
        }
        return this
    }
}

module.exports = TimespanBuilder
