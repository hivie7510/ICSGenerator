const EventBuilder = require('./eventBuilder')

class Calendar {
    constructor() {
        this.calendar = {
            events: [],
            name: '',
            refreshInterval: { intervalType: null, value: 0 },
            categories: [],
            source: null,
            color: null
        }
    }
    isValid() {
        return true
    }

    build() {
        let e = 'BEGIN:VCALENDAR\r\n'
        e += 'PRODID:Test\r\n'
        e += 'VERSION:2.0\r\n'
        if (this.calendar.events && Array.isArray(this.calendar.events)) {
            this.calendar.events.forEach((evt) => (e += evt.build()))
        }
        e += 'DESCRIPTION:Test\r\n'
        e += 'END:VCALENDAR\r\n'
        return e
    }

    buildEvent() {}

    addCategory(category) {
        if (category) {
            this.calendar.categories.push(category)
        }
        return this
    }

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

    setColor(color) {
        if (color) {
            this.calendar.color = color
        }
        return this
    }

    setName(name) {
        if (name) {
            this.calendar.name = name
        }
        return this
    }

    setRefreshInterval(intervalType, value) {
        if (intervalType && !isNaN(value)) {
            this.calendar.refreshInterval.intervalType = intervalType
            //use floor since it needs to be an int
            this.calendar.refreshInterval.value = Math.floor(value)
        }
        return this
    }

    setSourceUrl(source) {
        if (source) {
            this.calendar.source = source
        }
        return this
    }
}

module.exports = Calendar
