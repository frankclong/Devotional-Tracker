dates = JSON.parse(localStorage.getItem('dates')); // Array of dates
const prev_button = document.getElementById('prev');
const next_button = document.getElementById('next');
const empty_calendar = document.getElementById('calendar');
let empty_calendar_html = empty_calendar.innerHTML
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = [31,28,31,30,31,30,31,31,30,31,30,31];

// Determine current month/year
let today = new Date();
let month = today.getMonth()+1;
let year = today.getFullYear();
if (year % 4 === 0){
	days[1] = 29;
}
let first =  new Date(year, month-1, 1);
let firstDay = first.getDay(); // day of the week

// Get which dates have entries for the specified month/year
let getDates = function(month,year){
	datesWithEntries = []
	for(let i = 0; i < dates.length; i++){
		let myYear = parseInt(dates[i].substr(0,4));
		let firstHyphen = dates[i].indexOf('-');
		let lastHyphen = dates[i].lastIndexOf('-');
		let myMonth = parseInt(dates[i].substr(firstHyphen + 1, lastHyphen));
		let myDate = parseInt(dates[i].substr(lastHyphen+1));
		if(month === myMonth && myYear === year){
			datesWithEntries.push(myDate);
		}
	}
	console.log(datesWithEntries)
	return datesWithEntries	
}

// Function to update calendar
let refreshCalendar = function(){
	datesWithEntries = getDates(month,year)
	// Title
	document.getElementById("month").innerHTML = months[month-1] + " " + year;
	// Clear existing values
	document.getElementById("calendar").innerHTML = empty_calendar_html
	let counter = 1;
	let first =  new Date(year, month-1, 1);
	let firstDay = first.getDay();
	console.log(firstDay) // Sunday = 0, Saturday = 6
	let day = firstDay
	let weeks = document.getElementById('dates').childNodes;
	console.log(weeks)

	// Remove last week IF not needed
	let numDays = days[month-1]
	if (numDays - 29 <= 6-day){	
		document.getElementById('dates').removeChild(weeks[weeks.length-1])
		document.getElementById('dates').removeChild(weeks[weeks.length-1])
	}
	//console.log(weeks[1].childNodes);
	let wk = 1;
	while(counter <= numDays){
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
}


// Functions to change month
let prevMonth = function(){
	if (month > 1){
		month = month - 1
	}
	else{
		month = 12
		year = year - 1
	}
	console.log(month)
	refreshCalendar()
}
let nextMonth = function(){
	if (month < 12){
		month = month + 1
	}
	else{
		month = 1
		year = year + 1
	}
	console.log(month)
	refreshCalendar()
}

prev_button.onclick = prevMonth
next_button.onclick = nextMonth
getDates(month,year)
refreshCalendar()
