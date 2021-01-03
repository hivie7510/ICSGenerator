# ICSGenerator

[![npm version](https://img.shields.io/npm/v/ics-standard-compliant-file-generator.svg?style=flat)](https://www.npmjs.com/package/ics-standard-compliant-file-generator)

This package is a standards compliant generator of ICS files.

In the end, you will be able to use this package to generate Events, To-dos, Journal entires and Free/Busy entries.

# Table of Contents

1. [Builders](#builders)  
   1.1 [Calendar Builder](#calendar_builder)  
   1.2 [Event Builder](#event_builder)  
   1.3 [Timespan Builder](#timespan_builder)
2. [Objects](#objects)
3. [Constants](#constants)
4. [Utility Methods](#utilities)
5. [Examples](#examples)
   &nbsp;&nbsp;
   &nbsp;&nbsp;

# Builders<a name="builders"></a>

## Calendar Builder<a name="calendar_builder"></a>

Reference https://tools.ietf.org/html/rfc5545#section-3.4

### Methods

**addEventBuilder**  
builder represents a single event that has been constructed using the Event Builder  
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
builder | EventBuilder | Yes |

&nbsp;&nbsp;

**build**  
Compiles configuration and returns a ICalendar compliant string  
Params: None  
&nbsp;&nbsp;

**addCategory**  
Adds the category for the calendar  
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
category | string | No |  
&nbsp;&nbsp;

**addCategories**  
Adds 1 or more categories for the calendar  
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
categories | string array | No |  
&nbsp;&nbsp;

**setColor**
Sets the color of the calendar in the client  
Params:  
Name | Type | Required for Calendar |
---- | ---- | -------- |
cssColorName | string array | No |

&nbsp;&nbsp;
**NOTE: This string value must be a valid CSS3 Color Name**
Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
&nbsp;&nbsp;

**setDescription**  
Sets the description of the calendar that can be shown in the client  
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
description | string | No |  
 &nbsp;&nbsp;

**setLastModified**  
Sets the last modified date, allowing the client to check for more recent versions  
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
date | Date | No |  
 &nbsp;&nbsp;

**setName**  
Sets the name of the calendar that can be shown in the client  
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
name | string | No |  
 &nbsp;&nbsp;

**setSource**  
Sets the SOURCE property for the ICalendar core object
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
url | string | No |  
 &nbsp;&nbsp;

**setRefreshInterval**  
Sets the refresh interval determines the frequency of update checking  
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
intervalType | Timespan | No |  
value | integer | No |  
 &nbsp;&nbsp;

**setUrl**
Sets the URL property for the ICalendar core object
Params:  
Name | Type | Required for Calendar |  
---- | ---- | -------- |  
url | string | No |  
 &nbsp;&nbsp;

## Event Builder<a name="event_builder"></a>

Reference: https://tools.ietf.org/html/rfc5545#section-3.6.1

**addAttendee**  
Add an attendee to the event object
Params:  
Name | Type | Required for Event |  
---- | ---- | -------- |  
attendee | Attendee | No |  
 &nbsp;&nbsp;

**addAttendees**  
Add 1 or more attendees to the event object
Params:  
Name | Type | Required for Event |
---- | ---- | -------- |
attendees | Attendee array | No |
&nbsp;&nbsp;

**addCategory**  
Adds the category for the calendar  
Params:  
Name | Type | Required for Event |
---- | ---- | -------- |
category | string | No |
&nbsp;&nbsp;

**addCategories**  
Adds 1 or more categories for the calendar  
Params:  
Name | Type | Required for Event |
---- | ---- | -------- |
categories | string array | No |
&nbsp;&nbsp;

**addConferenceInfo**  
Adds conference reference to the event  
Params:  
Name | Type | Required for Event |
---- | ---- | -------- |
conference |Conference | No |
&nbsp;&nbsp;

**addOrganizer**  
Adds an organizer to the event  
Params:  
Name | Type | Required for Event |
---- | ---- | -------- |
organizer |Organizer | No |
&nbsp;&nbsp;

**addOrganizers**  
Adds an organizer to the event  
Params:  
Name | Type | Required for Event |
---- | ---- | -------- |
organizers |Organizer array | No |
&nbsp;&nbsp;

**setColor**
Sets the color of the event in the client  
Params:  
Name | Type | Required for Calendar |
---- | ---- | -------- |
cssColorName | string | No |

&nbsp;&nbsp;
**NOTE: This string value must be a valid CSS3 Color Name**
Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
&nbsp;&nbsp;

**setDescription**
Sets a description of the event
Params:  
Name | Type | Required for Event |
---- | ---- | -------- |
description |string | No |  
&nbsp;&nbsp;

**setDuration**  
Sets a duration of the event
Params:  
Name | Type | Required for Event |  
---- | ---- | -------- |  
description |string | No |

**NOTE: You cannot specify a duration and a end date time, you must choose 1**  
&nbsp;&nbsp;
&nbsp;&nbsp;  
**setEnd**  
Sets the end date of the event
Params:  
Name | Type | Required for Event |  
---- | ---- | -------- |  
date |Date | No |  
**NOTE: You cannot specify a duration and a end date time, you must choose 1**

&nbsp;&nbsp;

**setLastModified**  
Allows to **override** the last modified date which is defaulted to `new Date()`  
Params:  
Name | Type | Required for Event |  
---- | ---- | -------- |  
date |Date | No |  
&nbsp;&nbsp;

**setStart**  
Sets the start date for the event
Params:  
Name | Type | Required for Event |  
---- | ---- | -------- |  
date |Date | Yes |  
&nbsp;&nbsp;

**setSummary**
Sets a summary of the event
Params:  
Name | Type | Required for Event |  
---- | ---- | -------- |  
summary |string| No |  
&nbsp;&nbsp;

## Timespan Builder<a name="timespan_builder"></a>

Reference https://tools.ietf.org/html/rfc5545#section-3.3.6

### Methods

**addSeconds**  
Add seconds to the timespan
Params:  
Name | Type |  
---- | ---- |  
second | integer |

&nbsp;&nbsp;

**addMinutes**  
Add minutes to the timespan  
Params:  
Name | Type |  
---- | ---- |  
minutes | integer |  
&nbsp;&nbsp;

**addHours**  
Add hours to the timespan
Params:  
Name | Type |  
---- | ---- |  
hours | integer |  
&nbsp;&nbsp;

**addDays**  
Add days to the timespan  
Params:  
Name | Type |  
---- | ---- |  
days | integer |  
&nbsp;&nbsp;

**addWeeks**  
Add weeks to the timespan  
Params:  
Name | Type |  
---- | ---- |  
weeks | integer |  
&nbsp;&nbsp;

# Objects<a name="objects"></a>

## Attendee

Properties
| Name | Type
| ------- | ------
email | string  
cn | string  
directoryEntry | string  
delegateFromEmail |string  
delegateToEmail | string  
member | string  
sentBy | string  
userType| CalendarUserType  
role | Role  
rsvpType | RSVPType

&nbsp;&nbsp;

## Conference

Properties
| Name | Type |
| ------- | ------ |
feature | string array
label | string
&nbsp;&nbsp;

## Organizer

Properties
| Name | Type |
| ------- | ------ |
email | string  
cn | string  
directoryEntry | string  
sentBy | string
&nbsp;&nbsp;

# Constants<a name="constants"></a>

### Availability

| Name            | Value            |
| --------------- | ---------------- |
| FREE            | FREE             |
| BUSY            | BUSY             |
| BUSYUNAVAILABLE | BUSY-UNAVAILABLE |
| BUSYTENTATIVE   | BUSY-TENTATIVE   |

&nbsp;&nbsp;

### CalendarUserType

| Name       | Value      |
| ---------- | ---------- |
| INDIVIDUAL | INDIVIDUAL |
| GROUP      | GROUP      |
| RESOURCE   | RESOURCE   |
| ROOM       | ROOM       |
| UNKNOWN    | UNKNOWN    |

&nbsp;&nbsp;

### DisplayType

| Name      | Value     |
| --------- | --------- |
| BADGE     | BADGE     |
| GRAPHIC   | GRAPHIC   |
| FULLSIZE  | FULLSIZE  |
| THUMBNAIL | THUMBNAIL |

&nbsp;&nbsp;

### FeatureType

| Name      | Value     |
| --------- | --------- |
| AUDIO     | AUDIO     |
| CHAT      | CHAT      |
| FEED      | FEED      |
| MODERATOR | MODERATOR |
| PHONE     | PHONE     |
| SCREEN    | SCREEN    |
| VIDEO     | VIDEO     |

&nbsp;&nbsp;

### Role

| Name           | Value           |
| -------------- | --------------- |
| CHAIR          | CHAIR           |
| REQPARTICIPANT | REQ-PARTICIPANT |
| OPTPARTICIPANT | OPT-PARTICIPANT |
| NONPARTICIPANT | NON-PARTICIPANT |

&nbsp;&nbsp;

### RSVPType

| Name  | Value |
| ----- | ----- |
| TRUE  | TRUE  |
| FALSE | FALSE |

&nbsp;&nbsp;

### Timespan

| Name   | Value |
| ------ | ----- |
| MINUTE | m     |
| HOUR   | h     |
| DAY    | d     |
| WEEK   | w     |
| MONTH  | m     |
| YEAR   | y     |

&nbsp;&nbsp;

# Utilities<a name="utilities"></a>

**formatDate**  
Formats a valid date to the required date format  
Params:  
Name | Type |  
---- | ---- |
date | Date |
&nbsp;&nbsp;

**isValidEmail**  
Validates an email
Params:  
Name | Type |  
---- | ---- |
email | string |  
 &nbsp;&nbsp;

# Examples<a name="examples"></a>

## Simple Event

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
    .setUrl('http://www.mycalendar.com')
    .setSource('http://www.mycalendar.com/test.ics')
    .setColor('red')
    .addCategory('Meeting')
    .addCategories('my meeting, you meeting')
    .setName('HOME')

/*

    Now lets build a single event by instantiating an Event Builder
    We can create the bare minimum required for an event

*/
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
