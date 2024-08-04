document.addEventListener("DOMContentLoaded", main)

function main() {
	setTimestamps()
}

function setTimestamps() {
	const timezone = new Date().toLocaleDateString(undefined, {day:'2-digit', timeZoneName: 'short' }).substring(4);
		document.getElementById("timezone-name").innerHTML = timezone
		document.getElementById("countdown").innerHTML
	
		const timestamps = document.getElementsByClassName('timestamp')
	
		for (let ts of timestamps) {
			const timestamp = parseInt(ts.dataset.timestamp)
			const time = new Date(timestamp)
			ts.innerHTML = time.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'})
		}
}
