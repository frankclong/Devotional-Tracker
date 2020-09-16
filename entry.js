//import { saveAs } from 'file-saver';
// var bb = new BlobBuilder();
const vals = new URLSearchParams(window.location.search);
let notes = vals.get('notes');
console.log(notes)
//localStorage.clear();

// Add notes from localStorage
if(localStorage.getItem('notes')){
	myNotes = JSON.parse(localStorage.getItem('notes'))
	myDates = JSON.parse(localStorage.getItem('dates'))
	for(let i = 0; i < myNotes.length; i++){
		addNewEntry(myNotes[i], myDates[i])
	}
}

// New entry
if(notes){
	postEntry()
}

function addNewEntry (message, date) {
    entriesNode = document.getElementById('entries');

	const entryBody = document.createElement("p");
	message = message.replace(/(?:\r\n|\r|\n)/g, '<br>');
	entryBody.innerHTML = message;
	entriesNode.insertBefore(entryBody, entriesNode.childNodes[0]);        

	const entryHeading = document.createElement("h3");
	entryHeading.innerHTML = date; 
	entriesNode.insertBefore(entryHeading, entriesNode.childNodes[0]);             
	
};

// Retrieve array of comments form localStorage, add new comment, save
function saveItem(message, date) {
	let dates = JSON.parse(localStorage.getItem('dates') || '[]');
    dates.push(date);
    console.log(dates)
    localStorage.setItem('dates', JSON.stringify(dates));

    let comments = JSON.parse(localStorage.getItem('notes') || '[]');
    comments.push(message);
    console.log(comments)
    localStorage.setItem('notes', JSON.stringify(comments));
};

// Update HTML, save to localStorage
function postEntry() {
    let message = vals.get('notes');
    let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    addNewEntry(message, date);
    saveItem(message, date);
}