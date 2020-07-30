const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const  playAgainButton = document.getElementById('play-Again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts= document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters=[];

function displayWord() {
    wordEl.innerHTML = `
    ${selectWord
        .split('')
    .map(
        letter=> `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
    )
    .join('')}
 `;

 const innerWord = wordEl.innerText.replace(/\n/g, '')
 if(innerWord === selectWord){
     finalMessage.innerText = 'Congratulations!\n your mom shall be proud :)';
     popup.style.display='flex'
 }
}

function updateWrongLetters() {
    console.log('fuck you');
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p> Wrong </p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index<errors) {
            part.style.display='block';
        } else {
            part.style.display = 'none';
        }
        
    }) ;

    if (wrongLetters.length===figureParts.length) {
        finalMessage.innerText='YOU HAVE LOST :P \nYOU CAN CRY LIKE A BABY NOW';
        popup.style.display='flex';
    }


}

function showNotification() {
     notification.classList.add('show');

    setTimeout( () => {
        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e=>{
    if(e.keyCode>= 65 && e.keyCode<=90)
    {
        const letter = e.key;
        if (selectWord.includes(letter)){
            if(!correctLetters.includes(letter)){

                correctLetters.push(letter);

                displayWord();

            } else{
                showNotification();
            }
        } else{
          if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            } else{
                showNotification();
            }
        }
    }
});

playAgainButton.addEventListener('click', () => {
correctLetters.splice(0);
wrongLetters.splice(0);

selectWord = words[Math.floor(Math.random()*words.length)];

displayWord();
updateWrongLetters();
popup.style.display = 'none';
});


displayWord();
