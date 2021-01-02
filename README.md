# ICSGenerator

[![npm version](https://img.shields.io/npm/v/ics-standard-compliant-file-generator.svg?style=flat)](https://www.npmjs.com/package/ics-standard-compliant-file-generator)

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

```
