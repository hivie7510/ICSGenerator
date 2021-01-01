const CalendarUserType = require('../utilities/enums/calendarUserType')
const Role = require('../utilities/enums/role')
const RSVPType = require('../utilities/enums/RSVPType')
//https://www.kanzaki.com/docs/ical/attendee.html
//TODO: Add calendar user type
class Attendee {
    constructor(
        email = null,
        cn = null,
        directoryEntry = null,
        delegateFromEmail = null,
        delegateToEmail = null,
        member = null,
        sentBy = null,
        userType = CalendarUserType.UNKNOWN,
        role = Role.REQPARTICIPANT,
        rsvpType = RSVPType.FALSE
    ) {
        this.cn = cn
        this.email = email
        this.directoryEntry = directoryEntry
        this.userType = userType
        this.delegate = delegateFromEmail
        this.delegateTo = delegateToEmail
        this.role = role
        this.rsvpType = rsvpType
        this.member = member
    }

    isValid() {
        return this.email && this.email.length > 0
    }

    build() {
        if (!this.isValid()) {
            throw 'Email not found or invalid format'
        }
        let o = ''
        if (this.userType) {
            o += `CUTYPE=${this.userType}`
        }
        if (this.member) {
            o += `${o ? ';\n' : ''}MEMBER="MAILTO:${this.member}"`
        }
        if (this.role) {
            o += `${o ? ';\n' : ''}ROLE=${this.role}`
        }
        if (this.rsvpType) {
            o += `${o ? ';\n' : ''}RSVP=${this.rsvpType}`
        }
        if (this.delegateTo) {
            o += `${o ? ';\n' : ''}DELEGATED-TO="MAILTO:${this.delegateTo}"`
        }
        if (this.delegate) {
            o += `${o ? ';\n' : ''}DELEGATED-FROM="MAILTO:${this.delegate}"`
        }
        if (this.sentBy) {
            o += `${o ? ';\n' : ''}SENT-BY=MAILTO:${this.sentBy}`
        }
        if (this.cn) {
            o += `${o ? ';\n' : ''}CN=${this.cn}`
        }
        if (this.directoryEntry) {
            o += `${o ? ';\n' : ''}DIR="${this.directoryEntry}"`
        }
        o += `:MAILTO:${this.email}`
        return o
    }
}

module.exports = Attendee
