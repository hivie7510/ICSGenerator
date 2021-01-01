# ICSGenerator
## This package is a work in progress

This package is a standards compliant generator of ICS files.

In the end, you will be able to use this package to generate Events, To-dos, Journal entires and Free/Busy entries.

### Builders

#### Calendar Builder
addEventBuilder(builder)
This method will take an instance of an EventBuilder to represent a single event

build()
This method will produce a string output of the generated ics

#### Event Builder
Each method within the event builder, except for build, is a fluid function.  That is the return type for each method is the event builder itself.

addAttendee(Attendee attendee)  
*Adds a single attendee to the event*  
Output: `ATTENDEE;{Attendee}`

addAttendees(Attendee[] attendees)   
*Adds a 1 or more attendee to the event*

addCategory(string category)   
*Adds a category (tag) for the event*  
Output: `CATEGORIES:{string list of categories}`

addCategories(string categories)

addConferenceInfo(Conference conference)

addOrganizer(Organizer organizer) 

addOrganizers(Organizer[] organizer) 

setColor(string cssColorName) 

setDescription(string description) 

setEnd(Date endDate) 

setImageUrl(string url)

setLastModified(Date date)

setName(string name)

setRefreshInterval(Timespan intervalType, number value)

setSourceUrl(string source)

setStart(Date startDate)

setSummary(string summary)

setUrl(string url) 


### Enums
Availability [FREE, BUSY, BUSYUNAVAILABLE, BUSTTENTATIVE]

CalendarUserType [INDIVIDUAL, GROUP, RESOURCE, ROOM, UNKNOWN]

DisplayType [BADGE, GRAPHIC, FULLSIZE, THUMBNAIL]

FeatureType [AUDIO, CHAT, FEED, MODERATOR, PHONE, SCREEN, VIDEO]

Role [CHAIR, REQPARTICIPANT, OPTPARTICIPANT, NONPARTICIPANT]

RSVPType [TRUE, FALSE]

Timespan [MINUTE, HOUR, DAY, WEEK, MONTH, YEAR]

### Utilities
formatDate(Date date)

