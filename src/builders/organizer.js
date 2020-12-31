class Organizer {
    constructor(email, cn, directoryEntry, sentBy) {
        this.cn = cn
        this.email = email
        this.directoryEntry = directoryEntry
        this.sentBy = sentBy
    }

    isValid() {
        return this.email && this.email.length > 0
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
            o += `${o ? ';' : ''}DIR=${this.directoryEntry}`
        }
        if (this.sentBy) {
            o += `${o ? ';' : ''}SENT-BY="mailto:${this.sentBy}"`
        }
        o += `:${this.email}`
        return o
    }
}

module.exports = Organizer
