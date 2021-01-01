# ICSGenerator
[![npm version](https://img.shields.io/npm/v/ics-standard-compliant-file-generator.svg?style=flat)](https://www.npmjs.com/package/ics-standard-compliant-file-generator)
## This package is a work in progress

This package is a standards compliant generator of ICS files.

In the end, you will be able to use this package to generate Events, To-dos, Journal entires and Free/Busy entries.

# Table of Contents

1. [Builders](#builders)  
   1.1 [Calendar Builder](#calendar_builder)  
   1.2 [Event Builder](#event_builder)
2. [Objects](#objects)
3. [Static Values](#static_values)
4. [Utility Methods](#utilities)
5. [Examples](#examples)

## Builders<a name="builders"></a>

### Calendar Builder<a name="calendar_builder"></a>

**addEventBuilder**(builder)
This method will take an instance of an EventBuilder to represent a single event

**build**()
This method will produce a string output of the generated ics

**addCategory**(string category)  
_Adds the categoriy for a calendar component_  
Output: `CATEGORIES:{string list of categories}`

**addCategories**(string categories)  
_Adds 1 or more categories (tags) for the calendar component_  
Output: `CATEGORIES:{string list of categories}`

**setColor**(string cssColorName)
_Sets the color of the calendar in the client_  
Output: `COLOR:{color}`  
**NOTE: This string value must be a CSS3 Color Name**

**setName**(string name)  
_Sets the name of the calendar that can be shown in the client_  
Output: `NAME:{name}`

**setRefreshInterval**(Timespan intervalType, number value)  
_Sets the refresh interval of the calendar_  
Output: `REFRESH-INTERVAL;VALUE=DURATION:P{value}{intervalType}`

**setSourceUrl**(string source)
_Sets the url that this .ics file will be hosted at_  
Output: `SOURCE:{source}`

### Event Builder<a name="event_builder"></a>

Each method within the event builder, except for build, is a fluid function. That is the return type for each method is the event builder itself.

**addAttendee**(Attendee attendee)  
_Adds a single attendee to the event_  
Output: `ATTENDEE;{Attendee}`

**addAttendees**(Attendee[] attendees)  
_Adds a 1 or more attendees to the event_  
Output: `ATTENDEE;{Attendee, Attendee,...}`

**addConferenceInfo**(Conference conference)

**addOrganizer**(Organizer organizer)  
_Adds an organizer for a calendar component_  
Output: `ORGANIZER;{Organizer}`

**addOrganizers**(Organizer[] organizer)  
_Adds 1 or more organizers for a calendar component_  
Output: `ORGANIZER;{Organizer}`

**setDescription**(string description)  
_Sets the description of the event_  
Output: `DESCRIPTION:{description}`

**setEnd**(Date endDate)  
_Sets the end date of the event_  
Output: `DTEND:{endDate}`

**setImageUrl**(string url, string displayType)  
_This will set the image url that will be used in the client. For convenience, there is an enum DisplayType that can be used._  
Output: `IMAGE;VALUE=URI;DISPLAY={displayType}:http://www.test.com/images/test.png`

**setLastModified**(Date date)  
_Allows to **override** the last modified date which is defaulted to `new Date()`_
Output: `LAST-MODIFIED:{date}`.

**setStart**(Date startDate)  
_Sets the start date for the event_  
Output: `DTSTART:{startDate}`

**setSummary**(string summary)  
_Adds a short summary or subject for the event_  
Output: `SUMMARY:{summary}`

**setUrl**(string url)
**TODO: Add description **

### Static Values<a name="static_values"></a>

**Availability** [FREE, BUSY, BUSYUNAVAILABLE, BUSTTENTATIVE]

**CalendarUserType** [INDIVIDUAL, GROUP, RESOURCE, ROOM, UNKNOWN]

**DisplayType** [BADGE, GRAPHIC, FULLSIZE, THUMBNAIL]

**FeatureType** [AUDIO, CHAT, FEED, MODERATOR, PHONE, SCREEN, VIDEO]

**Role** [CHAIR, REQPARTICIPANT, OPTPARTICIPANT, NONPARTICIPANT]

**RSVPType** [TRUE, FALSE]

**Timespan** [MINUTE, HOUR, DAY, WEEK, MONTH, YEAR]

### Utilities<a name="utilities"></a>

formatDate(Date date)

## Examples<a name="examples"></a>

### Simple Event

```
const {
    CalendarBuilder,
    EventBuilder,
    Conference,
    Attendee,
    Organizer,
    Timespan,
    FeatureType
} = require('ics-standard-compliant-file-generator')

//Create a new instance of the CalendarBuilder
var c = new CalendarBuilder()
c.setSourceUrl('http://www.mycalendar.com/test.ics')
c.setColor('red')
c.addCategory('Meeting')
c.addCategories('my meeting, you meeting')
c.setName('HOME')
c.setRefreshInterval(Timespan.WEEK, 10)

/*
Create a EventBuilder
Create a simple event
*/
var eb = new EventBuilder()
eb.setDescription('Here is a test description')
    .addOrganizer(new Organizer('testOrganizer@gmail.com', 'Test Organizer'))
    .addAttendee(new Attendee('testAttendee@gmail.com', 'Test Attendee'))
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

//Add the event to the CalendarBuilder and build
c.addEventBuilder(eb)
console.log(c.build())
```

_To run this example, you need only run this command: node index.js ._
_If you want to create the file in your test environment, you will needs to output to a file (e.g. node index.js > text.ics)_

OUTPUT

```
BEGIN:VCALENDAR
PRODID:Test
VERSION:2.0
BEGIN:VEVENT
UID:dfd10daa-eeee-4820-8561-0259ccdd4b6c
DTSTAMP:20210101T033400Z
DTSTART:20210101T040000Z
DTEND:20210102T040000Z
ORGANIZER;CN=Heath Ivie:hivie7510@gmail.com
ATTENDEE;CUTYPE=UNKNOWN;CN=Heath Ivie;ROLE=REQ-PARTICIPANT;RSVP=FALSE:hivie7510@gmail.com
SUMMARY:Party Time
DESCRIPTION:We're having a pool party
END:VEVENT
DESCRIPTION:Test
END:VCALENDAR
```
