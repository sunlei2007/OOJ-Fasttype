'use strict';

import { Score } from "./Score.js?v=1.1"

const mainDiv = document.querySelector(".main-container");
const arrWords = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'];

const audioBg = new Audio("./assets/audio/bg.wav");
const audioTrue = new Audio("./assets/audio/true.wav");
const audioFalse = new Audio("./assets/audio/false.wav");


window.onload = function () {
    const home = createHome();
    mainDiv.appendChild(home);
}
function createHome() {
    //Create home 
    const divHome = document.createElement("div");
    divHome.classList.add("home");
    //Title
    const pTitle = document.createElement("p");
    pTitle.classList.add("home-title");
    pTitle.innerHTML = "Type Fighter";
    divHome.appendChild(pTitle);
    //start button
    const btnStart = document.createElement("button");
    btnStart.classList.add("home-start");
    btnStart.textContent = "Start";
    divHome.appendChild(btnStart);
    //button click event
    btnStart.addEventListener("click", function () {

        audioBg.type = "audio/wav";
        audioBg.loop = "loop";
        audioBg.play();

        pTitle.style.display = "none";
        btnStart.style.display = "none";

        const pCount = document.createElement("p");
        pCount.classList.add("home-count");
        divHome.appendChild(pCount);

        //Add animation
        let count = 4;
        let timer = window.setInterval(() => {
            count--;
            if (count >= 0) {
                pCount.classList.remove('home-count-active');
                setTimeout(() => {
                    if (count === 0)
                        pCount.innerHTML = "Go!";
                    else
                        pCount.innerHTML = count;

                    pCount.classList.add('home-count-active');
                }, 100);
            } else {

                window.clearInterval(timer);
                clearChild(mainDiv);//Remove all child;
                const gameScene = createGameScene();
                mainDiv.appendChild(gameScene);
            }
        }, 1000);
    });

    return divHome;
}
function createGameScene() {
    const divGame = document.createElement("div");
    divGame.classList.add("game");

    //Create header
    const divGameHeader = document.createElement("header");
    divGameHeader.classList.add("game-header");
    divGameHeader.classList.add("game-header-active");
    divGame.appendChild(divGameHeader);


    //Create score
    const pScore = document.createElement("p");
    pScore.classList.add("game-score");
    pScore.innerHTML = "Score: 0";
    divGameHeader.appendChild(pScore);
    //Create time
    const pTime = document.createElement("p");
    pTime.classList.add("game-time");
    pTime.innerHTML = "Time: 100";
    divGameHeader.appendChild(pTime);

    //Create game content
    const divGameContnet = document.createElement("div");
    divGameContnet.classList.add("game-content");


    //Create word data
    const pWord = document.createElement("p");
    pWord.classList.add("game-word");
    pWord.classList.add("game-word-active");
    pWord.innerHTML = getRandomWord();
    divGameContnet.appendChild(pWord);

    //Create input
    const inputValue = document.createElement("input");
    inputValue.classList.add("game-input");
    divGameContnet.appendChild(inputValue);
    setTimeout(() => {
        inputValue.focus();
    }, 500);

    const checkMsg = document.createElement("i");
    checkMsg.style.visibility = "hidden";
    checkMsg.style.marginTop = "20px";
    checkMsg.style.fontSize = "40px";
    divGameContnet.appendChild(checkMsg);


    //Create footer
    const divGameFooter = document.createElement("footer");
    divGameFooter.classList.add("game-footer");


    setTimeout(() => {
        divGameContnet.classList.add("game-content-active");
        divGameFooter.classList.add("game-content-active");
        divGame.appendChild(divGameContnet);
        divGame.appendChild(divGameFooter);

    }, 100);


    //restart button
    const btnRetart = document.createElement("button");
    btnRetart.classList.add("home-restart");
    btnRetart.textContent = "Retart";
    divGameFooter.appendChild(btnRetart);
    //end button
    const btnEnd = document.createElement("button");
    btnEnd.classList.add("home-restart");
    btnEnd.textContent = "End";
    divGameFooter.appendChild(btnEnd);

    //Control time
    let count = 100;
    let timer = window.setInterval(() => {
        count--;
        if (count > 0) {
            pTime.innerHTML = `Time: ${count}`;
            if (count === 10) {
                pTime.style.color = "red";
            }
        } else {
            btnEnd.click();
        }
    }, 1000);

    //ex Dec 6, 2022
    function getDate() {
        const options = {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
        //return new Date().toLocaleDateString("zh-cn", options);
        return new Date().toLocaleDateString("en-ca", options);
    }
    //Type word in input
    let score = 0;
    inputValue.addEventListener("input", function () {


        checkMsg.style.visibility = "hidden";
        if (pWord.innerHTML.substring(0, this.value.length).toLowerCase() !== this.value.toLowerCase()) {

            checkMsg.style.visibility = "visible";
            checkMsg.style.color = "red";
            checkMsg.className = "fa-regular fa-circle-xmark";

            audioFalse.type = "audio/wav";
            audioFalse.play();

            inputValue.value = "";
            pWord.innerHTML = getRandomWord();
            pWord.style.color = getRandomColor();
        }
        else if (pWord.innerHTML.length === this.value.length) {
            checkMsg.style.visibility = "visible";
            checkMsg.style.color = "white";
            checkMsg.className = "fa-regular fa-circle-check";

            audioTrue.type = "audio/wav";
            audioTrue.play();

            inputValue.value = "";
            pWord.innerHTML = getRandomWord();
            pWord.style.color = getRandomColor();
            score++;
            pScore.innerHTML = `Score: ${score}`;


        }
    });
    //Prohibit pasting
    inputValue.onpaste = function () {
        return false;
    }
    //Restart game
    btnRetart.addEventListener("click", function () {

        saveScore(getDate(), score, ((score / arrWords.length) * 100).toFixed(1));
        score = 0;
        count = 100;
        pTime.style.color = "#5fb7f8";
        pScore.innerHTML = `Score: 0`;
        checkMsg.style.visibility = "hidden";
        pWord.innerHTML = getRandomWord();
        inputValue.value = "";
    });
    //End game
    btnEnd.addEventListener("click", function () {

        window.clearInterval(timer);
        audioBg.pause();

        saveScore(getDate(), score, ((score / arrWords.length) * 100).toFixed(1));

        clearChild(mainDiv);//Remove all child;
        const endScene = createEndScene();
        mainDiv.appendChild(endScene);
    });
    return divGame;
}
function createEndScene() {
    const divHome = document.createElement("div");
    divHome.classList.add("end");

    //title
    const pTitle = document.createElement("p");
    pTitle.classList.add("end-title");
    pTitle.innerHTML = "HIGH SCORES";
    divHome.appendChild(pTitle);

    //background
    const divBackground = document.createElement("div");
    divBackground.classList.add("end-div-background");
    divHome.appendChild(divBackground);

    //Score list
    const table = document.createElement("table");
    table.classList.add("end-table");
    const arrScore = getScore().sort(compare("hits"));

    for (let i = 0; i < arrScore.length; i++) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        table.appendChild(tr);
        tr.appendChild(td);
        td.innerHTML = `#${i + 1}`;

        const td2 = document.createElement("td");
        td2.innerHTML = `${arrScore[i].hits} words`;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.innerHTML = `${arrScore[i].percentage}%`;
        tr.appendChild(td3);
    }

    divBackground.appendChild(table);

    //Start button
    const btnRetart = document.createElement("button");
    btnRetart.classList.add("home-start");
    btnRetart.textContent = "Retart";
    divHome.appendChild(btnRetart);

    btnRetart.addEventListener("click", function () {
        audioBg.play();
        clearChild(mainDiv);//Remove all child;
        const gameScene = createGameScene();
        mainDiv.appendChild(gameScene);
    });

    return divHome;
}
//Save score
const arrScore = [];
function saveScore(date, hits, percentage) {
    const scoreObj = {};
    scoreObj.date = date;
    scoreObj.hits = hits;
    scoreObj.percentage = percentage;
    arrScore.push(scoreObj);

    localStorage.setItem("scores", JSON.stringify(arrScore));
}
//Get score
function getScore() {
    let arr = [];
    if (localStorage.getItem("scores")!==null) {
        arr = JSON.parse(localStorage.getItem("scores"));
    }
    return arr;
}
//Get random word
function getRandomWord() {

    let index = Math.floor(Math.random() * (arrWords.length - 1) + 0);
    return arrWords[index];
}
//Clear all child in div
function clearChild(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
//Array sort 
function compare(property) {

    return function (a, b) {

        var value1 = a[property];

        var value2 = b[property];

        return value2 - value1;

    }

}