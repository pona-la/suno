---
---
const fifteenMinutes = 15 * 60 * 1000;
const oneMinute = 60 * 1000;
const overlay = document.getElementById("overview");
const timeOverlay = document.getElementById("time");
const titleOverlay = document.getElementById("title");
const performerOverlay = document.getElementById("performer");
let timings = {};

function setOverlay() {
    wipeOverlay();
    const now = new Date();
    const upcomingEvent = findUpcomingEvent(now);
    const currentEvent = findCurrentEvent(now);
    console.log(upcomingEvent);
    console.log(currentEvent);

    if (!upcomingEvent) return;

    let time, event;
    if (isWithinTimeFrame(new Date(upcomingEvent.startTime.getTime() - oneMinute), oneMinute, now)) {
        time = 'up next';
    } else if (currentEvent && isWithinTimeFrame(new Date(currentEvent.endTime.getTime() - oneMinute), oneMinute, now)) {
        time = relativeTime(upcomingEvent.startTime);
    } else if (isWithinTimeFrame(new Date(upcomingEvent.startTime.getTime() - fifteenMinutes), oneMinute, now)) {
        time = relativeTime(upcomingEvent.startTime);
    } else {
        return;
    }

    console.log(time);
    displayOverlay(time, upcomingEvent);
}

function findUpcomingEvent(now) {
    const times = Object.keys(timings).map(Number).sort((a, b) =>  a - b);
    const current = times.find((curr) => curr > now.getTime());
    const upcomingIndex = times.indexOf(current) + 1;
    return timings[times[upcomingIndex]];
}

function findCurrentEvent(now) {
    const times = Object.keys(timings).map(Number).sort((a, b) =>  a - b);
    const current = times.find((curr) => curr > now.getTime());
    return timings[current];
}

function isWithinTimeFrame(time, duration, now) {
    return time < now && new Date(time.getTime() + duration) >= now;
}

function displayOverlay(time, event) {
    overlay.classList.remove('hidden');
    timeOverlay.innerHTML = time;
    titleOverlay.innerHTML = event.title;
    performerOverlay.innerHTML = `by ${event.performer}`;
}

function wipeOverlay() {
    overlay.classList.add('hidden');
    timeOverlay.innerHTML = '';
    titleOverlay.innerHTML = '';
    performerOverlay.innerHTML = '';
}

function relativeTime(time) {
    const now = new Date();
    const diff = Math.ceil((time - now) / (60 * 1000));
    if (diff === 0) {
        return 'now';
    } else if (diff >= 1) {
        return `in ${expandMinutes(Math.abs(diff))}`;
    } else {
        return `${expandMinutes(Math.abs(diff))} ago`;
    }
}

function expandMinutes(minutes) {
    if (minutes === 1) {
        return '1 minute';
    } else if (minutes < 60) {
        return `${minutes} minutes`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours === 1) {
            return `1 hour ${expandMinutes(remainingMinutes)}`;
        } else {
            return `${hours} hours ${expandMinutes(remainingMinutes)}`;
        }
    }
}

const startTime = new Date(1722447000 * 1000); // test value; change to 1723267800 on the 10th
let latestTime = startTime;

fetch('schedule.json')
    .then(res => res.json())
    .then(schedule => {
        schedule.forEach(element => {
            const endTime = new Date(latestTime.getTime() + element.duration * 60 * 1000);
            element.startTime = latestTime;
            element.endTime = endTime;
            latestTime = endTime;
            if (element.performer != 'break')
                timings[latestTime.getTime()] = element;
        });
        setOverlay();
        setInterval(setOverlay, 10000);
    })
    .catch(err => {
        console.error(err);
    });
