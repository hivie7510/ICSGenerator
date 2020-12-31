const { v4: uuidv4 } = require('uuid')
const Conference = require('./conference')
const Person = require('./person')

class EventBuilder {
    constructor() {
        this.evt = {
            name: '',
            organizers: [],
            startDate: null,
            endDate: null,
            uid: uuidv4(),
            lastModifiedDate: new Date(),
            url: null,
            categories: [],
            refreshInterval: { intervalType: null, value: 0 },
            source: null,
            color: null,
            imageUrl: null,
            conferenceInfo: [],
            attendees: []
        }
    }

    build() {
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

    setImageUrl(url) {
        if (url) {
            this.evt.imageUrl = url
        }
        return this
    }

    setColor(cssColorName) {
        if (cssColorName) {
            this.evt.color = cssColorName
        }
        return this
    }

    setRefreshInterval(intervalType, value) {
        if (intervalType && !isNaN(value)) {
            this.evt.refreshInterval.intervalType = intervalType
            //use floor since it needs to be an int
            this.evt.refreshInterval.value = Math.floor(value)
        }
        console.log('test2')
        return this
    }

    setSourceUrl(source) {
        if (source) {
            this.evt.source = source
        }
        return this
    }

    setName(name) {
        if (name) {
            this.evt.name = name
        }
        return this
    }

    setUrl(url) {
        if (url) {
            this.evt.url = url
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

    setEnd(endDate) {
        if (endDate && endDate instanceof Date) {
            this.evt.endDate = endDate
            return this
        }
        throw 'End date must be present and of type Date'
    }

    addAttendee(person) {
        if (person && person instanceof Person && person.isValid()) {
            this.evt.attendees.push(person)
        } else {
            throw 'Organizer must be of type Person'
        }
        return this
    }

    /* If any items within the collection are not of type Person, they will be skipped  */
    addAttendees(persons) {
        if (persons && Array.isArray(persons)) {
            for (let i = 0; i < persons.length; i++) {
                const person = persons[i]
                if (person instanceof Person) {
                    if (person.isValid()) {
                        this.evt.attendees.push(person)
                    }
                }
            }
        }
        return this
    }

    addOrganizer(person) {
        if (person && person instanceof Person && person.isValid()) {
            this.evt.organizers.push(person)
        } else {
            throw 'Organizer must be of type Person'
        }
        return this
    }

    /* If any items within the collection are not of type Person, they will be skipped  */
    addOrganizers(persons) {
        if (persons && Array.isArray(persons)) {
            for (let i = 0; i < persons.length; i++) {
                const person = persons[i]
                if (person instanceof Person) {
                    if (person.isValid()) {
                        this.evt.organizers.push(person)
                    }
                }
            }
        }
        return this
    }

    setDescription(description) {
        if (description) {
            this.evt.description = description
        }
        return this
    }

    addCategory(category) {
        if (category) {
            this.evt.categories.push(category)
        }
        return this
    }

    addCategories(categories) {
        if (categories) {
            let c = categories.split(',')
            if (c && c.length > 0) {
                for (let i = 0; i < c.length; i++) {
                    this.evt.categories.push(c[i])
                }
            }
        }
        return this
    }
}

module.exports = EventBuilder
