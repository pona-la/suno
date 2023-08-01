---
---
function repeat(func, times) {
	func();
	times && --times && repeat(func, times);
}

const scrollContainer = document.getElementById("timeline");

scrollContainer.addEventListener("wheel", (evt) => {
	evt.preventDefault();
	scrollContainer.scrollLeft += evt.deltaY;
	scrollContainer.scrollLeft += evt.deltaX;
});

var startTime = new Date(1691213400*1000);

var string = new Intl.DateTimeFormat('en-GB', { timeStyle: 'long' });
var timezone = string.format(startTime).split(' ')[1];

document.getElementById("tz-info").innerHTML = `All times shown are ${timezone} timezone`;

var delimiters = document.getElementById("delimiters");
var hours = document.getElementById("hours");
var minutes = document.getElementById("minutes");
var day = 0;
var hour = 0;
var span = 0;

var scrolled = false;

function set_time() {
	var now = new Date();
	if (now < startTime || now > new Date(startTime.getTime() + 24*60*60*1000))
		document.getElementById("overlay").style.visibility = "hidden";
	else {
		var sinceStart = (now - startTime) / (60*1000);
		document.getElementById("overlay").style.left = `calc(1rem + ${8 * sinceStart}px)`;
		document.getElementById("overlay").style.visibility = "visible";
		if (!scrolled)
			follow_indicator();
			var times = Object.keys(timings);
			var time = startTime.getTime();
			var now = new Date();
			Array.from(times).forEach(function(element) {
				var eventTime = new Date(Number(element));
				if (now >= eventTime)
					time = eventTime.getTime();
			});
			if (time in timings)
				display_info(timings[time]);
	}
}

function get_center() {
	var timeline = document.getElementById("timeline");
	var overlay = document.getElementById("overlay");
	if ((timeline.offsetWidth + timeline.scrollLeft >= timeline.scrollWidth && window.innerWidth / 2 <= overlay.getBoundingClientRect().left) || (timeline.scrollLeft == 0 && window.innerWidth / 2 >= overlay.getBoundingClientRect().left)) {
		return 0;
	}
	return overlay.getBoundingClientRect().left - (window.innerWidth>>1) + 1.5;
}

function follow_indicator() {
	document.getElementById("timeline").scrollBy(get_center(), 0);
	scrolled = false;
}

var latestTime = startTime;

repeat(function () {
	var col = document.createElement("col");
	if (hour != latestTime.getHours()) {
		var hourd = document.createElement("th");
		hourd.setAttribute("colspan", (60 - latestTime.getMinutes()) / 5);
		hourd.setAttribute("class", "hour");
		hourd.innerHTML = latestTime.getHours();
		hours.appendChild(hourd);
		col.setAttribute("class", "hour");
		hour = latestTime.getHours();
	}
	if (day != latestTime.getDate()) {
		col.setAttribute("class", "day");
		day = latestTime.getDate();
	}
	col.setAttribute("width", "40");
	delimiters.appendChild(col);

	var minute = document.createElement("th");
	minute.setAttribute("class", "minute");
	minute.innerHTML = latestTime.getMinutes() < 9 ? "0" + latestTime.getMinutes() : latestTime.getMinutes();
	minutes.appendChild(minute);
	latestTime = new Date(latestTime.getTime() + 5*60000);
}, 288);

function display_info(info, focus=true) {
	var elements = document.getElementsByClassName("highlighted");
	Array.from(elements).forEach(function(element) {
		element.classList.remove("highlighted");
	});
	if (info["startTime"] && focus)
		document.getElementById(`event-${new Date(info["startTime"]).getTime()}`).classList.add("highlighted");
	var container = document.getElementById("info");
	container.innerHTML = "";
	if (info["performer"]) {
		var performer = document.createElement("p");
		performer.setAttribute("class", "performer");
		var performerName = document.createElement("span");
		performerName.innerHTML = info["performer"];
		performer.appendChild(performerName);
		if (info["website"]) {
			var performerWebsite = document.createElement("span");
			performerWebsite.setAttribute("class", "website");
			performerWebsite.setAttribute("title", "Website");
			{% capture website %}{% include website.svg %}{% endcapture %}
			performerWebsite.innerHTML = `<a href="${info["website"]}" target="_blank">{{ website | strip_newlines }}</a>`;
			performer.appendChild(performerWebsite);
		}
		if (info["youtube"]) {
			var performerYoutube = document.createElement("span");
			performerYoutube.setAttribute("class", "youtube");
			performerYoutube.setAttribute("title", "YouTube");
			{% capture youtube %}{% include youtube.svg %}{% endcapture %}
			performerYoutube.innerHTML = `<a href="${info["youtube"]}" target="_blank">{{ youtube | strip_newlines }}</a>`;
			performer.appendChild(performerYoutube);
		}
		if (info["soundcloud"]) {
			var performerSoundcloud = document.createElement("span");
			performerSoundcloud.setAttribute("class", "soundcloud");
			performerSoundcloud.setAttribute("title", "SoundCloud");
			{% capture soundcloud %}{% include soundcloud.svg %}{% endcapture %}
			performerSoundcloud.innerHTML = `<a href="${info["soundcloud"]}" target="_blank">{{ soundcloud | strip_newlines }}</a>`;
			performer.appendChild(performerSoundcloud);
		}
		if (info["bandcamp"]) {
			var performerBandcamp = document.createElement("span");
			performerBandcamp.setAttribute("class", "bandcamp");
			performerBandcamp.setAttribute("title", "Bandcamp");
			{% capture bandcamp %}{% include bandcamp.svg %}{% endcapture %}
			performerBandcamp.innerHTML = `<a href="${info["bandcamp"]}" target="_blank">{{ bandcamp | strip_newlines }}</a>`;
			performer.appendChild(performerBandcamp);
		}
		if (info["discord"]) {
			var performerDiscord = document.createElement("span");
			performerDiscord.setAttribute("class", "discord");
			performerDiscord.setAttribute("title", "Discord");
			{% capture discord %}{% include discord_small.svg %}{% endcapture %}
			performerDiscord.innerHTML = `<a href="${info["discord"]}" target="_blank">{{ discord | strip_newlines }}</a>`;
			performer.appendChild(performerDiscord);
		}
		if (info["spotify"]) {
			var performerSpotify = document.createElement("span");
			performerSpotify.setAttribute("class", "spotify");
			performerSpotify.setAttribute("title", "Spotify");
			{% capture spotify %}{% include spotify.svg %}{% endcapture %}
			performerSpotify.innerHTML = `<a href="${info["spotify"]}" target="_blank">{{ spotify | strip_newlines }}</a>`;
			performer.appendChild(performerSpotify);
		}
		container.appendChild(performer);
	}
	if (info["title"]) {
		var title = document.createElement("h2");
		title.setAttribute("class", "title");
		title.innerHTML = info["title"];
		container.appendChild(title);
	}
	if (info["startTime"] && info["endTime"]) {
		var time = document.createElement("p");
		time.setAttribute("class", "time");
		var start = new Date(info["startTime"]);
		var end = new Date(info["endTime"]);
		var string = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' });
		time.innerHTML = `${string.format(start)} - ${string.format(end)}`;
		container.appendChild(time);
	}
	if (info["description"]) {
		var description = document.createElement("p");
		description.setAttribute("class", "description");
		description.innerHTML = info["description"];
		container.appendChild(description);
	}
}

var room1 = document.getElementById("room1");

var timings = {};
latestTime = startTime;

Promise.all([
	fetch('schedule.json')
	.then(res => res.json())
])
.then(([schedule]) => {
	Array.from(schedule).forEach(function(element) {
		var event = document.createElement("td");
		event.setAttribute("class", "event");
		event.setAttribute("onclick", `display_info(timings[${latestTime.getTime()}])`);
		event.setAttribute("onkeyup", `display_info(timings[${latestTime.getTime()}])`);
		event.setAttribute("id", `event-${latestTime.getTime()}`);
		event.setAttribute("tabindex", 0);
		event.setAttribute("colspan", element["duration"] / 5);
		var eventContents = document.createElement("div");
		if (element["performer"]) {
			var performer = document.createElement("p");
			performer.setAttribute("class", "performer");
			performer.innerHTML = element["performer"];
			eventContents.appendChild(performer);
		}
		if (element["categories"]) {
			var categories = document.createElement("ul");
			categories.setAttribute("class", "categories");
			Array.from(element["categories"]).forEach(function(element) {
				var category = document.createElement("li");
				category.innerHTML = element;
				categories.appendChild(category);
			});
			eventContents.appendChild(categories);
		}
		if (element["title"]) {
			var title = document.createElement("p");
			title.setAttribute("class", "title");
			title.innerHTML = element["title"];
			eventContents.appendChild(title);
		}
		event.appendChild(eventContents);
		room1.appendChild(event);
		endTime = new Date(latestTime.getTime() + element["duration"]*60000);
		element["startTime"] = latestTime;
		element["endTime"] = endTime;
		timings[latestTime.getTime()] = element;
		var now = new Date();
		if (!scrolled) {
			var eventTime = new Date(latestTime);
			if (now >= eventTime)
				display_info(element);
		}
		latestTime = endTime;
	});
}).catch(err => {
	console.log(err)
});

set_time();
setInterval(set_time, 7.5*1000);

document.getElementById("timeline").addEventListener("scroll", function(){ 
	var center = get_center();
	scrolled = center < -1 || center > 1;
});
