const CalendarUserType = require('../utilities/enums/calendarUserType')

class Person {
    constructor(cn, email, delegateFrom, userType = CalendarUserType.UNKNOWN) {
        this.cn = cn
        this.email = email
        this.userType = userType
        this.delegate = delegateFrom
    }

    isValid() {
        return true
    }
}

module.exports = Person
