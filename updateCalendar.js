dates = JSON.parse(localStorage.getItem('dates')); // Array of dates
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = [31,28,31,30,31,30,31,31,30,31,30,31];

// Determine current month/year
let today = new Date();
let month = today.getMonth()+1;
let year = today.getFullYear();
let first =  new Date(year, month-1, 1);
let firstDay = first.getDay(); // day of the week
if (year % 4 === 0){
	days[1] = 29;
}

// Create array of days in current month
datesWithEntries = []
for(let i = 0; i < dates.length; i++){
	let myYear = parseInt(dates[i].substr(0,4));
	let firstHyphen = dates[i].indexOf('-');
	let lastHyphen = dates[i].lastIndexOf('-');
	let myMonth = parseInt(dates[i].substr(firstHyphen + 1, lastHyphen));
	let myDate = parseInt(dates[i].substr(lastHyphen+1));
	datesWithEntries.push(myDate);
}
console.log(datesWithEntries)

// Title
document.getElementById("month").innerHTML = months[month-1] + " " + year;
// Fill out calendar day by day
let counter = 1;
let day = firstDay
let weeks = document.getElementById('dates').childNodes;
console.log(weeks[1].childNodes);
let wk = 1;


while(counter <= days[month-1]){
	weeks[wk*2-1].childNodes[day*2+1].innerHTML = counter
	// If this day/month/year combo is in storage, give this node an additional class attribute
	if(datesWithEntries.includes(counter)){
		weeks[wk*2-1].childNodes[day*2+1].setAttribute("class", "entered")
	}

	// if last day of week, go next week and reset day
	if (day*2 + 1 === 13){
		wk += 1;
		day = 0;
	}else{
		day += 1
	}
	counter += 1;
}