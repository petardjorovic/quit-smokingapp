let saveBtn = document.querySelector('#save');
let inputDate = document.querySelector('#date');
let numCigar = document.querySelector('#num-cigar');
let ppp = document.querySelector('#price-per-pack');
let quitDate = document.querySelector('#quit-date');
let lastCigar = document.querySelector('#last-cigar');
let notSmokedCigarettes = document.querySelector('#not-smoked-cigarettes');
let savedMoney = document.querySelector('#saved-money');
initApp();
saveBtn.addEventListener('click', saveData);

function saveData(){
    let qd = moment(inputDate.value).format();
    let dateOfRest = qd;
    let numberOfCigar = numCigar.value;
    let price = ppp.value;

    localStorage.newQuitDate = dateOfRest;
    localStorage.numberOfCigars = numberOfCigar;
    localStorage.pricePerPack = price;
    
    displayQuitDate()
    displayLastCigarette()
    displayCigaretteNotSmoked()
    displayMoneySaved()
}

function displayQuitDate(){
    quitDate.innerHTML = moment(localStorage.newQuitDate).format('LLL');;
}

function displayLastCigarette(){
    lastCigar.innerHTML = moment(localStorage.newQuitDate).fromNow();
}

function displayCigaretteNotSmoked(){
    let cigarPerMinute = (parseInt(localStorage.numberOfCigars) / 24) / 60;
    let qd = moment(localStorage.newQuitDate);
    let now = moment();
    let minutes = now.diff(qd, 'minutes'); // razlika u minutima
    let notSC = (cigarPerMinute * minutes).toFixed(0);
    notSmokedCigarettes.innerHTML = notSC;
}

function displayMoneySaved(){
    let priceOfOneCigar = parseInt(localStorage.pricePerPack) / 20;
    let qd = moment(localStorage.newQuitDate);
    let now = moment();
    let minutes = now.diff(qd,'minutes'); // razlika u minutima
    let hourSaved = priceOfOneCigar * (parseInt(localStorage.numberOfCigars) / 24);
    let minuteSaved = hourSaved / 60;
    savedMoney.innerHTML = (minutes * minuteSaved).toFixed(3);    
}

function initApp(){
    if(localStorage.newQuitDate){
        displayQuitDate()
        displayLastCigarette()
        displayCigaretteNotSmoked()
        console.log("radi");
        
        let loop = setInterval(displayLastCigarette,10000);
        let loop2 = setInterval(displayCigaretteNotSmoked,1000);
        let loop3 = setInterval(displayMoneySaved,6000);
    }
}