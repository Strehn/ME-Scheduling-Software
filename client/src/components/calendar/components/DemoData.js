const DemoData = {
    resources: [
        {
            id: 'r0',
            name: 'Machine 1',
        },
        {
            id: 'r1',
            name: 'Machine 2',
        },
        {
            id: 'r2',
            name: 'Machine 3',
        },
        {
            id: 'r3',
            name: 'Machine 3',
        },
    ],
    events: [
        {
            id: 10,
            start: '2020-02-28 10:30:00',
            end: '2020-02-28 12:30:00',
            resourceId: 'r1',
            title: 'Busy',
            rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
            bgColor: '#c41d1d'
        },
        {
            id: 12,
            start: '2020-02-28 13:30:00',
            end: '2020-02-28 14:30:00',
            resourceId: 'r3',
            title: 'Busy',
            rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
            bgColor: '#c41d1d'
        },
    ],
}

export default DemoData