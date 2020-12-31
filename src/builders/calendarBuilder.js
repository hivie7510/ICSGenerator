class Calendar {
    constructor() {
        this.calendar = {
            events: []
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

    addEvent(event) {
        if (event) {
            this.calendar.events.push(event)
        }
    }
}

module.exports = Calendar
