const vals = new URLSearchParams(window.location.search);
const inputRef = vals.get('passage');
const reference = document.getElementById('reference');
const passage = document.getElementById('passage');

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
	})

const notesTextArea = document.getElementById("notes");
notesTextArea.innerHTML = inputRef;