const vals = new URLSearchParams(window.location.search);
const inputRef = vals.get('passage');
const reference = document.getElementById('reference');
const passage = document.getElementById('passage');
const endWord = document.getElementById('enduring');
const mhc = document.getElementById('mhc');
const bookNumbers = {
	"Genesis" : 1,
	"Exodus" : 2,
	"Leviticus" : 3,
	"Numbers" : 4,
	"Deuteronomy" : 5,
	"Joshua" : 6,
	"Judges" : 7,
	"Ruth" : 8,
	"1 Samuel" : 9,
	"2 Samuel" : 10,
	"1 Kings" : 11,
	"2 Kings" : 12,
	"1 Chronicles" : 13,
	"2 Chronicles" : 14,
	"Ezra" : 15,
	"Nehemiah" : 16,
	"Esther" : 17,
	"Job" : 18,
	"Psalms" : 19,
	"Proverbs" : 20,
	"Ecclesiastes" : 21,
	"Song of Solomon" : 22,
	"Isaiah" : 23,
	"Jeremiah" : 24,
	"Lamentations" : 25,
	"Ezekiel" : 26,
	"Daniel" : 27,
	"Hosea" : 28,
	"Joel" : 29,
	"Amos" : 30,
	"Obadiah" : 31,
	"Jonah" : 32,
	"Micah" : 33,
	"Nahum" : 34,
	"Habakkuk" : 35,
	"Zephaniah" : 36,
	"Haggai" : 37,
	"Zechariah" : 38,
	"Malachi" : 39,
	"Matthew" : 40,
	"Mark" : 41,
	"Luke" : 42,
	"John" : 43,
	"Act" : 44,
	"sRomans" : 45,
	"1 Corinthians" : 46,
	"2 Corinthians" : 47,
	"Galatians" : 48,
	"Ephesians" : 49,
	"Philippians" : 50,
	"Colossians" : 51,
	"1 Thessalonians" : 52,
	"2 Thessalonians" : 53,
	"1 Timothy" : 54,
	"2 Timothy" : 55,
	"Titus" : 56,
	"Philemon" : 57,
	"Hebrews" : 58,
	"James" : 59,
	"1 Peter" : 60,
	"2 Peter" : 61,
	"1 John" : 62,
	"2 John" : 63,
	"3 John" : 64,
	"Jude" : 65,
	"Revelation" : 66
}
const windowWidth = window.innerWidth;

// Bible stuff
const apiKey = config.API_KEY;
let urlBible = "https://api.esv.org/v3/passage/text/?" 
const bibleQueryParams = {
	'include-passage-references' : false,
	'include-footnotes' : false,
	'include-headings' : true
}
Object.keys(bibleQueryParams).forEach((key, index)=>{
	urlBible = urlBible + key + '='+bibleQueryParams[key] + '&'
})
urlBible = urlBible + "q="

let verse = inputRef;
console.log(verse)
fetch(urlBible + verse, {
	method:'GET',
	headers:{
		'Authorization' : 'Token '+ apiKey
	}
}).then(response => {
	if(response.ok){
			return response.json();
		}
		throw new Error('Request Failed!')
		}, networkError => console.log(networkError.message)
	).then(jsonResponse =>{
		console.log(jsonResponse);
		reference.innerHTML = jsonResponse['canonical'];
		jsonPassage = jsonResponse['passages'][0];
		jsonPassage = jsonPassage.replace(/(?:\r\n|\r|\n)/g, '<br>');
		passage.innerHTML =  jsonPassage;

		// Update commentary links
		// Enduring Word
		let chap = jsonResponse['canonical']
		let refArr = chap.split(' ')
		let chapNum = refArr[refArr.length-1]
		refArr.pop()
		let book = refArr.join(' ')
		let linkEndWord = "https://enduringword.com/bible-commentary/"
		linkEndWord = linkEndWord + chap.replace(/\s+/g, '-').toLowerCase();
		endWord.setAttribute("href",linkEndWord)
		// Matthew Henry Concise
		let bookNum = (bookNumbers[book]) ///  TODO: Check dictionary
		console.log(book)
		console.log(bookNum)
		let linkMHC = "https://www.christianity.com/bible/commentary.php?com=mhc&b="+ bookNum + "&c=" + (chapNum)
		mhc.setAttribute("href",linkMHC)
		console.log(linkMHC)
	})

const notesTextArea = document.getElementById("notes");
notesTextArea.innerHTML = inputRef;
// set number of rows and columns based on width of screen, should be dynamic? TODO: add script to run whenever window size changes
let numCols = windowWidth / 25;
notesTextArea.setAttribute("cols", numCols)