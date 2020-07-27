const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const words= [
'Aloof', 'Antithetical', 'Archivists', 'Atavisic', 'Atone', 
'Ballista', 'Benediction', 'Burgle',
'Cacophony', 'Caterwauling', 'Chivvies', 'Chuffing', 
'Decimated', 'Dirge', 'Dirk', 'Disabuses',
'Eldritch', 'Enigmas', 'Ensconced',
'Feral', 'Fletching', 'Flocculent',
'Ineffectual', 'Infuriatingly', 'Insouciance',
'Ken', 'Korma',
'Labyrinth', 'Legionnaires', 'Lupine',
'Malleable', 'Manacles', 'Mugness', 'Mulish', 'Mundane',
'Nadir', 'Naught',
'Offal', 'Ophidian', 'Oud',
'Pallid', 'Parse', 'Perimeter',
'Quells',
'Rancor', 'Reaving', 'Repugnant',
'Sallow', 'Sibilant', 'Sigil', 
'Transgression', 'Truss',
'Ululating', 'Unassailable', 'Undulating',
'Vestige', 'Viscera',
'Welter', 'Whinging',
'Youth',
'Zoo'
];


let randomWord;
let score=0;
let time= 10;
let difficulty= 'medium';
difficultySelect.value= 'medium';

text.focus();
const timeInterval = setInterval(updateTime,1000);


function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM(){
    randomWord=getRandomWord();
    word.innerHTML = randomWord;

}
function updateScore(){
    score++;
    scoreEl.innerHTML=score;

}
function updateTime(){
    time--;
    timeEl.innerHTML= time+'s';
    if(time===0){
        clearInterval(timeInterval);
        gameOver();
    }

}
function gameOver(){
    endgameEl.innerHTML=`
    <h1> time ran out </h1>
    <p> you final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}
addWordToDOM();

text.addEventListener('input',e=>{
    const insertedtext = e.target.value;

    if(insertedtext === randomWord){
        addWordToDOM();
        updateScore();
        e.target.value = '';

        if(difficulty === 'hard'){
            time+=2;
        }else if(difficulty === 'medium'){
            time+=3;
        }else{
            time+=5;
        }

        updateTime();

    }
});

settingsBtn.addEventListener('click', () => 
settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
    difficulty=e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

