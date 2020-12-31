class Role {
    static get CHAIR() {
        return 'CHAIR'
    }
    static get REQPARTICIPANT() {
        return 'REQ-PARTICIPANT'
    }
    static get OPTPARTICIPANT() {
        return 'OPT-PARTICIPANT'
    }
    static get NONPARTICIPANT() {
        return 'NON-PARTICIPANT'
    }
}

module.exports = Role
