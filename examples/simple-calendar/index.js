const {
    CalendarBuilder,
    EventBuilder,
    Attendee,
    Organizer,
    Role,
    CalendarUserType,
    RSVPType
} = require('ics-standard-compliant-file-generator')

/*
    
    To import the package you will need to either run this example outside of the root
    or modify temporarily the package.json to change the name.  Otherwise, the package
    will not install because there will be a name conflict 

*/

/*

    Start with creating a Calendar Builder, this does not need to happen at first but it is logical to start here
    The Calendar Builder is the container and the actual generator of the *.ics file

*/
var c = new CalendarBuilder()
c.setUrl('http://www.mycalendar.com')
c.setSource('http://www.mycalendar.com/test.ics')
c.setColor('red')
c.addCategory('Meeting')
c.addCategories('my meeting, you meeting')
c.setName('HOME')

/*
    
    Now lets build a single event by instantiating an Event Builder
    We can create the bare minimum required for an event

*/
var eb = new EventBuilder()
eb.addOrganizer(new Organizer('testOrganizer@gmail.com', 'Test Organizer'))
    .addAttendee(
        new Attendee(
            'testAttendee@gmail.com',
            'Test Attendee',
            null,
            'test-delegate-from@test.com',
            'test-delegate-to@test.com',
            null,
            'test-sent-by@test.com',
            Role.CHAIR,
            CalendarUserType.INDIVIDUAL,
            RSVPType.TRUE
        )
    )
    .setStart(new Date(2021, 0, 1, 20, 00))
    .setEnd(new Date(2021, 0, 2, 20, 00))
    .setSummary('Party Time')
    .setDescription("We're having a pool party")

//Now that we have described our event, we can add it to the Calendar Builder
c.addEventBuilder(eb)

//All that is left is to call the build the file contents
let icsContent = c.build()

//At this point you use which ever method you want to use to create the file
//For testing I just pushed the console output to a file
console.log(icsContent)

//The call from the terminal then becomes:
// node index.js > test.ics
