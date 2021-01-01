const EventBuilder = require('./eventBuilder')
const { v4: uuidv4 } = require('uuid')
const { formatDate } = require('../utilities/utils')

class Calendar {
    constructor() {
        this.calendar = {
            events: [],
            name: '',
            refreshInterval: { intervalType: null, value: 0 },
            categories: [],
            source: null,
            color: null,
            description: null,
            url: null,
            lastModified: null
        }
    }
    isValid() {
        return true
    }

    build() {
        if (this.isValid()) {
            let e = 'BEGIN:VCALENDAR\r\n'
            e += 'PRODID:HIVIE7510/ICS STANDARDS COMPLIANT FILE GENERATOR\r\n'
            e += 'VERSION:2.0\r\n'
            e += 'CALSCALE:GREGORIAN\r\n'
            e += `UID:${uuidv4()}\r\n`
            if (this.calendar.name) {
                e += `NAME:${this.calendar.name}\r\n`
            }
            if (this.calendar.description) {
                e += `DESCRIPTION:${this.calendar.description}\r\n`
            }
            if (this.calendar.lastModified) {
                e += `LAST_MODIFIED:${formatDate(this.calendar.lastModified)}\r\n`
            }
            if (this.calendar.url) {
                e += `URL:${this.calendar.url}\r\n`
            }
            if (this.calendar.source) {
                e += `SOURCE:${this.calendar.source}\r\n`
            }
            if (this.calendar.color) {
                e += `COLOR:${this.calendar.color}\r\n`
            }

            if (this.calendar.categories && Array.isArray(this.calendar.categories)) {
                this.calendar.categories.forEach((cat) => (e += `CATEGORIES:${cat}\r\n`))
            }
            if (this.calendar.events && Array.isArray(this.calendar.events)) {
                this.calendar.events.forEach((evt) => (e += evt.build()))
            }

            // if (
            //     this.calendar.refreshInterval &&
            //     this.calendar.refreshInterval.value > 0 &&
            //     this.calendar.refreshInterval.intervalType
            // ) {
            //     e += `REFRESH-INTERVAL;VALUE=DURATION:P${this.calendar.refreshInterval.value}${this.calendar.refreshInterval.intervalType}\r\n`
            // }
            e += 'END:VCALENDAR\r\n'
            return e
        }
        throw 'Invalid calendar values'
    }

    buildEvent() {}

    //https://tools.ietf.org/html/rfc7986#section-5.6
    addCategory(category) {
        if (category) {
            this.calendar.categories.push(category)
        }
        return this
    }

    //https://tools.ietf.org/html/rfc7986#section-5.6
    addCategories(categories) {
        if (categories && Array.isArray(categories)) {
            let c = categories.split(',')
            if (c && c.length > 0) {
                for (let i = 0; i < c.length; i++) {
                    this.calendar.categories.push(c[i])
                }
            }
        }
        return this
    }

    addEventBuilder(builder) {
        if (builder && builder instanceof EventBuilder) {
            this.calendar.events.push(builder)
        }
    }

    //https://tools.ietf.org/html/rfc7986#section-5.9
    setColor(color) {
        if (color) {
            this.calendar.color = color
        }
        return this
    }

    //https://tools.ietf.org/html/rfc7986#section-5.2
    setDescription(description) {
        if (description) {
            this.calendar.description = description
        }
        return this
    }

    //https://tools.ietf.org/html/rfc7986#section-5.4
    //Defaults to new Date
    setLastModified(date) {
        if (date && date instanceof Date) {
            this.calendar.lastModified = date
        }
        return this
    }

    //https://tools.ietf.org/html/rfc7986#section-5.1
    setName(name) {
        if (name) {
            this.calendar.name = name
        }
        return this
    }

    //https://tools.ietf.org/html/rfc7986#section-5.8
    setSource(url) {
        if (url) {
            this.calendar.source = url
        }
        return this
    }

    //https://tools.ietf.org/html/rfc7986#section-5.5
    setUrl(url) {
        if (url) {
            this.calendar.url = url
        }
        return this
    }

    //https://tools.ietf.org/html/rfc7986#section-5.7
    setRefreshInterval(intervalType, value) {
        if (intervalType && !isNaN(value)) {
            this.calendar.refreshInterval.intervalType = intervalType
            //use floor since it needs to be an int
            this.calendar.refreshInterval.value = Math.floor(value)
        }
        return this
    }
}

module.exports = Calendar
