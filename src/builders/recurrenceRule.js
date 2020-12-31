class RecurrenceRule {
    constructor(startDate, endDate, duration) {
        this.startDate = startDate
        this.endDate = endDate
        this.duration = duration
        this.sentBy = sentBy
    }

    isValid() {
        return true
    }
}

module.exports = RecurrenceRule
