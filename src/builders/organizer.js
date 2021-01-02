const { isValidEmail } = require('../utilities/utils')

class Organizer {
    constructor(email, cn, directoryEntry, sentBy) {
        this.cn = cn
        this.email = email
        this.directoryEntry = directoryEntry
        this.sentBy = sentBy
    }

    isValid() {
        let error = ''
        if (this.email && this.email.length > 0) {
            if (!isValidEmail(this.email)) {
                error += 'Organizer email is invalid\r\n'
            }
        }

        if (this.sentBy && this.sentBy.length > 0) {
            if (!isValidEmail(this.sentBy)) {
                error += 'Sent By email is invalid\r\n'
            }
        }

        if (error) {
            throw error
        }
        return true
    }

    build() {
        if (!this.isValid()) {
            throw 'Email not found or invalid format'
        }
        let o = ''
        if (this.cn) {
            o += `CN=${this.cn}`
        }
        if (this.directoryEntry) {
            o += `${o ? ';\n' : ''}DIR=${this.directoryEntry}`
        }
        if (this.sentBy) {
            o += `${o ? ';\n' : ''}SENT-BY="MAILTO:${this.sentBy}"`
        }
        o += `:MAILTO:${this.email}`
        return o
    }
}

module.exports = Organizer
