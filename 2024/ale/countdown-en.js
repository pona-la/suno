document.addEventListener("DOMContentLoaded", setCountdown)

function setCountdown() {
	const sptpStart = new Date(Date.UTC(2024, 7, 10, 5, 30))
	const sptpEnd = new Date(Date.UTC(2024, 7, 11, 5, 30))
	const now = new Date()
	const countdown = document.getElementById('countdown')
	if (now < sptpStart) {
		const daysLeft = Math.floor((sptpStart - now) / (24 * 3600 * 1000))
		countdown.innerHTML = `suno pi toki pona is in ${daysLeft} days!`
	} else if (now >= sptpStart && now < sptpEnd) {
		countdown.innerHTML = `suno pi toki pona is now!`
	} else {
		countdown.innerHTML = `suno pi toki pona is over!`
	}
}
