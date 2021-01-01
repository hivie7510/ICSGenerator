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
            url: null,
            source: null,
            imageUrl: null,
            imageDisplayType: null,
            conferenceInfo: [],
            attendees: [],
            summary: null,
            description: null
        }
    }

    build() {
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
        e += 'END:VEVENT\r\n'
        return e
    }

    addAttendee(attendee) {
        if (attendee && attendee instanceof Attendee && attendee.isValid()) {
            this.evt.attendees.push(attendee)
        } else {
            throw 'Attendee must be of type Person'
        }
        return this
    }

    /* If any items within the collection are not of type Person, they will be skipped  */
    addAttendees(attendees) {
        if (attendees && Array.isArray(attendees)) {
            for (let i = 0; i < attendees.length; i++) {
                const attendee = attendees[i]
                if (attendee instanceof Attendee) {
                    if (attendee.isValid()) {
                        this.evt.attendees.push(attendee)
                    }
                }
            }
        }
        return this
    }

    addConferenceInfo(conference) {
        if (conference && conference instanceof Conference) {
            if (conference.isValid()) {
                this.evt.conferenceInfo.push(conference)
            }
        }
        return this
    }

    addOrganizer(organizer) {
        if (organizer && organizer instanceof Organizer && organizer.isValid()) {
            this.evt.organizers.push(organizer)
        } else {
            throw 'organizer must be of type Organizer'
        }
        return this
    }

    /* If any items within the collection are not of type Person, they will be skipped  */
    addOrganizers(organizers) {
        if (organizers && Array.isArray(organizers)) {
            for (let i = 0; i < organizers.length; i++) {
                const organizer = organizers[i]
                if (organizer instanceof Organizer) {
                    if (organizer.isValid()) {
                        this.evt.organizers.push(organizer)
                    }
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

    setDescription(description) {
        if (description) {
            this.evt.description = description
        }
        return this
    }

    setEnd(endDate) {
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
    setLastModified(date) {
        if (date && date instanceof Date) {
            this.evt.lastModifiedDate = date
            return this
        }
        throw 'Last Modified date must be present and of type Date'
    }

    setStart(startDate) {
        if (startDate && startDate instanceof Date) {
            this.evt.startDate = startDate
            return this
        }
        throw 'Start date must be present and of type Date'
    }

    setSummary(summary) {
        if (summary) {
            this.evt.summary = summary
        }
        return this
    }

    setUrl(url) {
        if (url) {
            this.evt.url = url
        }
        return this
    }
}

module.exports = EventBuilder
