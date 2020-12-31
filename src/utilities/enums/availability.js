class Availability {
    static get FREE() {
        return 'FREE'
    }
    static get BUSY() {
        return 'BUSY'
    }
    static get BUSYUNAVAILABLE() {
        return 'BUSY-UNAVAILABLE'
    }
    static get BUSYTENTATIVE() {
        return 'BUSY-TENTATIVE'
    }
}

module.exports = Availability
