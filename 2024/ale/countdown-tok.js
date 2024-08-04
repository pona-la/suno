document.addEventListener("DOMContentLoaded", setCountdown)

function setCountdown() {
	const sptpStart = new Date(Date.UTC(2024, 7, 10, 5, 30))
	const sptpEnd = new Date(Date.UTC(2024, 7, 11, 5, 30))
	const now = new Date()
	const countdown = document.getElementById('countdown')
	if (now < sptpStart) {
		const daysLeft = Math.floor((sptpStart - now) / (24 * 3600 * 1000))
		const tenpoSuno = {
		  0: "ni",
			1: "wan",
			2: "tu",
			3: "tu wan",
			4: "tu tu",
			5: "luka",
			6: "luka wan"
		}[daysLeft]
		countdown.innerHTML = `tenpo suno ${tenpoSuno} li pini la, suno pi toki pona li lon a!`
	} else if (now >= sptpStart && now < sptpEnd) {
		countdown.innerHTML = `suno pi toki pona li lon a!`
	} else {
		countdown.innerHTML = `suno pi toki pona li pini`
	}
}
