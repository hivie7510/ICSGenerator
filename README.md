# ICSGenerator
## This package is a work in progress

This package is a standards compliant generator of ICS files.

In the end, you will be able to use this package to generate Events, To-dos, Journal entires and Free/Busy entries.

## Builders

### Calendar Builder
**addEventBuilder**(builder)
This method will take an instance of an EventBuilder to represent a single event

**build**()
This method will produce a string output of the generated ics

**addCategory**(string category)   
*Adds the categoriy for a calendar component*  
Output: `CATEGORIES:{string list of categories}`

**addCategories**(string categories)   
*Adds 1 or more categories (tags) for the calendar component*  
Output: `CATEGORIES:{string list of categories}`

**setColor**(string cssColorName) 
*Sets the color of the calendar in the client*      
Output: `COLOR:{color}`    
**NOTE: This string value must be a CSS3 Color Name**  

**setName**(string name)  
*Sets the name of the calendar that can be shown in the client*  
Output: `NAME:{name}` 

**setRefreshInterval**(Timespan intervalType, number value)  
*Sets the refresh interval of the calendar*  
Output: `REFRESH-INTERVAL;VALUE=DURATION:P{value}{intervalType}` 

**setSourceUrl**(string source)
*Sets the url that this .ics file will be hosted at*  
Output: `SOURCE:{source}`

### Event Builder
Each method within the event builder, except for build, is a fluid function.  That is the return type for each method is the event builder itself.

**addAttendee**(Attendee attendee)  
*Adds a single attendee to the event*  
Output: `ATTENDEE;{Attendee}`

**addAttendees**(Attendee[] attendees)   
*Adds a 1 or more attendee to the event*

**addConferenceInfo**(Conference conference)

**addOrganizer**(Organizer organizer)   
*Adds an organizer for a calendar component*  
Output: `ORGANIZER;{Organizer}`  

**addOrganizers**(Organizer[] organizer)  
*Adds 1 or more organizers for a calendar component*    
Output: `ORGANIZER;{Organizer}`  

**setDescription**(string description)  
*Sets the description of the event*  
Output: `DESCRIPTION:{description}`  

**setEnd**(Date endDate)  
*Sets the end date of the event*  
Output: `DTEND:{endDate}`    

**setImageUrl**(string url, string displayType)  
*This will set the image url that will be used in the client.  For convenience, there is an enum DisplayType that can be used.*    
Output: `IMAGE;VALUE=URI;DISPLAY={displayType}:http://www.test.com/images/test.png`

**setLastModified**(Date date)  
*Allows to **override** the last modified date which is defaulted to `new Date()`*
Output: `LAST-MODIFIED:{date}`.  

**setStart**(Date startDate)  
*Sets the start date for the event*  
Output: `DTSTART:{startDate}`

**setSummary**(string summary)  
*Adds a short summary or subject for the event*  
Output: `SUMMARY:{summary}`

**setUrl**(string url) 
**TODO: Add description **

### Static Values
**Availability** [FREE, BUSY, BUSYUNAVAILABLE, BUSTTENTATIVE]

**CalendarUserType** [INDIVIDUAL, GROUP, RESOURCE, ROOM, UNKNOWN]

**DisplayType** [BADGE, GRAPHIC, FULLSIZE, THUMBNAIL]

**FeatureType** [AUDIO, CHAT, FEED, MODERATOR, PHONE, SCREEN, VIDEO]

**Role** [CHAIR, REQPARTICIPANT, OPTPARTICIPANT, NONPARTICIPANT]

**RSVPType** [TRUE, FALSE]

**Timespan** [MINUTE, HOUR, DAY, WEEK, MONTH, YEAR]

### Utilities
formatDate(Date date)

