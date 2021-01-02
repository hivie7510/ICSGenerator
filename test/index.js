const {
    CalendarBuilder,
    EventBuilder,
    Conference,
    Attendee,
    Organizer,
    Timespan,
    FeatureType,
    Role,
    CalendarUserType,
    RSVPType
} = require('../src/index')

//Create a new instance of the CalendarBuilder
var c = new CalendarBuilder()
    .setUrl('http://www.mycalendar.com')
    .setSource('http://www.mycalendar.com/test.ics')
    .setColor('red')
    .addCategory('Meeting')
    .addCategories('my meeting, you meeting')
    .setName('HOME')

var eb = new EventBuilder()
eb.setDescription('Here is a test description')
    .addOrganizer(new Organizer('testOrganizer@gmail.com', 'Test Organizer', null, 'sent-by@test.com'))
    .addAttendee(
        new Attendee(
            'testAttendee@gmail.com',
            'Test Attendee',
            null,
            'test-delegate-from@test.com',
            'test-delegate-to@test.com',
            'member@test.com',
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
    .setImageUrl('http://www.myimage.com/thumbnail.jpg')
    .addConferenceInfo(new Conference(FeatureType.AUDIO, 'Moderator dial-in:tel:+1-412-555-0123,,,654321'))
    .addConferenceInfo(
        new Conference([FeatureType.AUDIO, FeatureType.MODERATOR], 'Moderator dial-in:tel:+1-412-555-0123,,,654321')
    )

c.addEventBuilder(eb)
console.log(c.build())
