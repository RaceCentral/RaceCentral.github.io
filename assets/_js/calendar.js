// Calendar integration functions

// Helper function to format date and time for calendar events
function formatCalendarDateTime(dateStr, timeStr, timeUTC) {
    const [month, day] = dateStr.split(" ");
    const months = {
        "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
        "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };

    const year = "2025";
    const formattedDate = `${year}-${months[month]}-${day.padStart(2, '0')}`;
    
    // Convert UTC time to local
    const [hours, minutes] = timeUTC.split(":");
    const utcDate = new Date(Date.UTC(2025, parseInt(months[month]) - 1, parseInt(day), parseInt(hours), parseInt(minutes)));
    
    return {
        start: utcDate,
        end: new Date(utcDate.getTime() + (3 * 60 * 60 * 1000)) // Assume 3 hours duration
    };
}

// Generate ICS file content for a single event
function generateICSContent(event) {
    const { start, end } = formatCalendarDateTime(event.date, event.time, event.time_utc);
    
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Racing Schedule//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${event.race}`,
        `DTSTART:${start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
        `DTEND:${end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
        `DESCRIPTION:Watch ${event.race} live on ${event.network}\\nVenue: ${event.venue || event.circuit}\\nSeries: ${event.series}`,
        `LOCATION:${event.city}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
}

// Download ICS file for a single event
function downloadICS(event) {
    const icsContent = generateICSContent(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.series}-${event.race.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Generate ICS for multiple events
function generateSeriesICS(events) {
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Racing Schedule//EN'
    ];

    events.forEach(event => {
        const { start, end } = formatCalendarDateTime(event.date, event.time, event.time_utc);
        
        icsContent.push(
            'BEGIN:VEVENT',
            `SUMMARY:${event.race}`,
            `DTSTART:${start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
            `DTEND:${end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
            `DESCRIPTION:Watch ${event.race} live on ${event.network}\\nVenue: ${event.venue || event.circuit}\\nSeries: ${event.series}`,
            `LOCATION:${event.city}`,
            'END:VEVENT'
        );
    });

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
}

// Download ICS for multiple events
function downloadSeriesICS(events, seriesName) {
    const icsContent = generateSeriesICS(events);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${seriesName}-2025-Schedule.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export {
    downloadICS,
    downloadSeriesICS
}; 