const {
    CalendarBuilder,
    EventBuilder,
    Conference,
    Attendee,
    Organizer,
    Timespan,
    FeatureType
} = require('../src/index')

//Create a new instance of the CalendarBuilder
var c = new CalendarBuilder()
c.setSourceUrl('http://www.mycalendar.com/test.ics')
c.setColor('red')
c.addCategory('Meeting')
c.addCategories('my meeting, you meeting')
c.setName('HOME')
c.setRefreshInterval(Timespan.WEEK, 10)

var eb = new EventBuilder()
eb.setDescription('Here is a test description')
    .addOrganizer(new Organizer('hivie7510@gmail.com', 'Heath Ivie'))
    .addAttendee(new Attendee('hivie7510@gmail.com', 'Heath Ivie'))
    .setStart(new Date(2020, 11, 31, 20, 00))
    .setEnd(new Date(2021, 0, 1, 20, 00))
    .setSummary('Party Time')
    .setDescription("We're having a pool party")
    .setUrl('http://www.google.com')
    .setImageUrl('http://www.myimage.com/thumbnail.jpg')
    .addConferenceInfo(new Conference(FeatureType.AUDIO, 'Moderator dial-in:tel:+1-412-555-0123,,,654321'))
    .addConferenceInfo(
        new Conference([FeatureType.AUDIO, FeatureType.MODERATOR], 'Moderator dial-in:tel:+1-412-555-0123,,,654321')
    )

c.addEventBuilder(eb)
console.log(c.build())
