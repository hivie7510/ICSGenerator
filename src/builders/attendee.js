const CalendarUserType = require('../utilities/enums/calendarUserType')
const Role = require('../utilities/enums/role')
const RSVPType = require('../utilities/enums/RSVPType')

//TODO: Add calendar user type
class Attendee {
    constructor(
        email,
        cn,
        directoryEntry,
        delegateFromEmail,
        delegateToEmail,
        member,
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
            o += `${o ? ';' : ''}MEMBER=${this.member}`
        }
        if (this.cn) {
            o += `${o ? ';' : ''}CN=${this.cn}`
        }
        if (this.role) {
            o += `${o ? ';' : ''}ROLE=${this.role}`
        }
        if (this.rsvpType) {
            o += `${o ? ';' : ''}RSVP=${this.rsvpType}`
        }
        if (this.delegate) {
            o += `${o ? ';' : ''}DELEGATE-FROM=${this.delegate}`
        }
        if (this.delegateTo) {
            o += `${o ? ';' : ''}DELEGATE-TO=${this.delegateTo}`
        }
        if (this.directoryEntry) {
            o += `${o ? ';' : ''}DIR="${this.directoryEntry}"`
        }
        o += `:${this.email}`
        return o
    }
}

module.exports = Attendee
