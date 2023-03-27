var d = new Date();
var n = d.getTimezoneOffset() * -1;
var h = Math.floor(n / 60);
var m = Math.abs(n % 60);
document.getElementById("offset").innerHTML = m == 0 ? h : `${h}:${m}`;
