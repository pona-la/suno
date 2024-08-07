document.addEventListener("DOMContentLoaded", main)

function main() {
	setTimestamps()
	setDates()
}

function setTimestamps() {
	const timezone = new Date().toLocaleDateString('us-en', { day: '2-digit', timeZoneName: 'short' }).split(' ')[1]
	document.getElementById("timezone-name").innerHTML = timezone
	document.getElementById("countdown").innerHTML

	const timestamps = document.getElementsByClassName('timestamp')
	for (let ts of timestamps) {
		const time = dateFromTimestampElement(ts)
		ts.innerHTML = time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
	}
}

function setDates() {
	const language = document.documentElement.lang
	const firstDay = (new Date(1723267800000)).getDate()
	const dates = {
		en: {
			9: "9th August", 10: "10th August", 11: "11th August"
		},
		tok: {
			9: "tenpo suno #LTT", 10: "tenpo suno #LL", 11: "tenpo suno #LLW"
		}
	}

	if (firstDay === 9) {
		if (language === "en") {
			document.querySelector('#countdown + .big').innerHTML = '9th-10th August 2024'
		} else {
			document.querySelector('#countdown + .big').innerHTML = '#MAMTT) #LTW) #LTT+LL'
		}
	}

	document.getElementById('date-change-card').remove()
	const cols = document.querySelectorAll('.cols > div')
	for (let col of cols) {

	}

	const schedules = document.querySelectorAll('.cols')
	schedules.forEach(schedule => {
		let scheduleHasDateBreak = false
		const cols = schedule.querySelectorAll('.cols > div')
		console.log(cols)
		for (let col of cols) {
			const firstTimestamp = col.querySelector('.timestamp')
			const date = dateFromTimestampElement(firstTimestamp).getDate()
			col.querySelector('.date-card').innerHTML = dates[language][date]

			if (scheduleHasDateBreak) continue

			const segments = col.querySelectorAll('.segment')
			Array.from(segments).every(function (segment, i) {
				if (scheduleHasDateBreak) return false

				const segmentStartDate = dateFromTimestampElement(segment.querySelector('.timestamp')).getDate()
				console.log(i, segmentStartDate)
				if (segmentStartDate !== firstDay) {
					console.log(firstDay, segmentStartDate)
					const dateCard = document.createElement('div')
					dateCard.classList.add('date-card')
					if (i === 0) {
						dateCard.classList.add('hide-when-three-columns')
					}
					dateCard.innerHTML = dates[language][segmentStartDate]
					segment.parentElement.insertBefore(dateCard, segment)
					scheduleHasDateBreak = true
				}
				return true
			})
		}
	})
}
function dateFromTimestampElement(ts) {
	return new Date(parseInt(ts.dataset.timestamp))
}