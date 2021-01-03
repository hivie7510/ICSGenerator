const { v4: uuidv4 } = require('uuid')
const Conference = require('./conference')
const Attendee = require('./attendee')
const Organizer = require('./organizer')
const { formatDate } = require('../utilities/utils')

class EventBuilder {
    constructor() {
        this.evt = {
            organizers: [],
            startDate: null,
            endDate: null,
            uid: uuidv4(),
            lastModifiedDate: new Date(),
            imageUrl: null,
            imageDisplayType: null,
            conferenceInfo: [],
            attendees: [],
            summary: null,
            description: null,
            categories: [],
            color: null,
            duration: null
        }
    }

    isValid() {
        let e = this.evt
        if (e.startDate && e.endDate && e.endDate.getTime() < e.startDate.getTime()) {
            throw 'Invalid dates.  Event start date must be less than end date'
        }
        return true
    }

    build() {
        if (this.isValid()) {
            let e = 'BEGIN:VEVENT\r\n'
            e += `UID:${this.evt.uid}\r\n`
            e += `DTSTAMP:${formatDate(new Date())}\r\n`
            e += `DTSTART:${formatDate(this.evt.startDate)}\r\n`
            if (this.evt.endDate) {
                e += `DTEND:${formatDate(this.evt.endDate)}\r\n`
            }
            if (this.evt.organizers) {
                for (let i = 0; i < this.evt.organizers.length; i++) {
                    e += `ORGANIZER;${this.evt.organizers[i].build()}\r\n`
                }
            }
            if (this.evt.attendees) {
                for (let i = 0; i < this.evt.attendees.length; i++) {
                    e += `ATTENDEE;${this.evt.attendees[i].build()}\r\n`
                }
            }
            if (this.evt.summary) {
                e += `SUMMARY:${this.evt.summary}\r\n`
            }
            if (this.evt.description) {
                e += `DESCRIPTION:${this.evt.description}\r\n`
            }
            if (this.evt.duration) {
                e += `DURATION:${this.evt.duration.build()}\r\n`
            }
            if (this.evt.categories && Array.isArray(this.evt.categories)) {
                this.evt.categories.forEach((cat) => (e += `CATEGORIES:${cat}\r\n`))
            }
            if (this.evt.color) {
                e += `COLOR:${this.evt.color}\r\n`
            }
            if (this.evt.lastModified) {
                e += `LAST_MODIFIED:${this.evt.lastModified}\r\n`
            }

            if (this.evt.conferenceInfo && Array.isArray(this.evt.conferenceInfo)) {
                for (let cc = 0; cc < this.evt.conferenceInfo.length; cc++) {
                    let ci = this.evt.conferenceInfo[cc].build()
                    if (ci) {
                        e += ci
                    }
                }
                this.evt.conferenceInfo.forEach((c) => (e += c.build()))
            }
            e += 'END:VEVENT\r\n'
            return e
        }
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.4.1
    addAttendee(attendee) {
        if (attendee && attendee instanceof Attendee) {
            if (!attendee.isValid()) {
                throw 'Invalid attendee'
            }
            this.evt.attendees.push(attendee)
        } else {
            throw 'attendee must be of type Person'
        }
        return this
    }

    /* If any items within the collection are not of type Person, they will be skipped  */
    //https://tools.ietf.org/html/rfc5545#section-3.8.4.1
    addAttendees(attendees) {
        if (attendees && Array.isArray(attendees)) {
            for (let i = 0; i < attendees.length; i++) {
                const attendee = attendees[i]
                if (attendee instanceof Attendee) {
                    if (!attendee.isValid()) {
                        throw 'Invalid Attendee'
                    }
                    this.evt.attendees.push(attendee)
                }
            }
        }
        return this
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.1.2
    addCategory(category) {
        if (category) {
            this.calendar.categories.push(category)
        }
        return this
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.1.2
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

    //https://tools.ietf.org/html/rfc7986#section-5.11
    addConferenceInfo(conference) {
        if (conference && conference instanceof Conference) {
            if (conference.isValid()) {
                this.evt.conferenceInfo.push(conference)
            }
        }
        return this
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.4.3
    addOrganizer(organizer) {
        if (organizer && organizer instanceof Organizer && organizer.isValid()) {
            if (!organizer.isValid()) {
                throw 'Invalid Organizer'
            }
            this.evt.organizers.push(organizer)
        } else {
            throw 'organizer must be of type Organizer'
        }
        return this
    }

    /* If any items within the collection are not of type Person, they will be skipped  */
    //https://tools.ietf.org/html/rfc5545#section-3.8.4.3
    addOrganizers(organizers) {
        if (organizers && Array.isArray(organizers)) {
            for (let i = 0; i < organizers.length; i++) {
                const organizer = organizers[i]
                if (organizer instanceof Organizer) {
                    if (!organizer.isValid()) {
                        throw 'Invalid Organizer'
                    }
                    this.evt.organizers.push(organizer)
                }
            }
        }
        return this
    }

    setColor(cssColorName) {
        if (cssColorName) {
            this.evt.color = cssColorName
        }
        return this
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.1.5
    setDescription(description) {
        if (description) {
            this.evt.description = description
        }
        return this
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.2.5
    setDuration(timespan) {
        if (this.evt.endDate) {
            throw 'You must choose to supply either a duration or end date, but not both'
        }
        if (timespan) {
            this.evt.duration = timespan
        }
        return this
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.2.2
    setEnd(endDate) {
        if (this.evt.duration) {
            throw 'You must choose to supply either a duration or end date, but not both'
        }
        if (endDate && endDate instanceof Date) {
            this.evt.endDate = endDate
            return this
        }
        throw 'End date must be present and of type Date'
    }

    setImageUrl(url, displayType) {
        if (url) {
            this.evt.imageUrl = url
            this.evt.imageDisplayType = displayType
        }
        return this
    }
    //https://tools.ietf.org/html/rfc5545#section-3.8.7.3
    setLastModified(date) {
        if (date && date instanceof Date) {
            this.evt.lastModifiedDate = date
            return this
        }
        throw 'Last Modified date must be present and of type Date'
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.2.4
    setStart(startDate) {
        if (startDate && startDate instanceof Date) {
            this.evt.startDate = startDate
            return this
        }
        throw 'Start date must be present and of type Date'
    }

    //https://tools.ietf.org/html/rfc5545#section-3.8.1.12
    setSummary(summary) {
        if (summary) {
            this.evt.summary = summary
        }
        return this
    }
}

module.exports = EventBuilder
