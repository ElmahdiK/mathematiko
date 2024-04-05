"use strict";

/**
 * @author EK
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// Macthion

const _tabOPERATIONS = ["+", "-", "*"];
let _operation = ``;
let t;
let _timer = { s: 0, m: 0, h: 0 }
let _score = 0;

window.onload = _ => {
    // $(`#bt-random`).onclick = () => initGame();
    $(`#bt-play`).onclick=_=>{
        $(`#sec_menu`).classList.add(`hidden`);
        $(`#sec_game`).classList.remove(`hidden`);
    }


    $(`#bt-menu`).onclick=_=>{
        $(`#sec_game`).classList.add(`hidden`);
        $(`#sec_menu`).classList.remove(`hidden`);
    }

    $(`#bt-start`).onclick = _ => {
        stopTimer();
        resetTimer();
        timer();

        resetScore();
        
        initGame();
        $(`#bt-start`).innerHTML=`restart`;
    }
}

let initGame = _ => {
    let _nbOperation = 1;
    if (_score > 4 && _score < 8) _nbOperation = 2;
    else if (_score >= 8) _nbOperation = 3;

    _operation = getOperation(_nbOperation);
    console.log(_operation);
    $(`#p_operation`).innerHTML = _operation.operation;

    let _html = ``;
    for (let i = 0; i < _operation.answers.length; i++) _html += `<button>${_operation.answers[i]}</button>`;
    $(`#div_result`).innerHTML = _html;

    $$(`#div_result button`).forEach(b => {
        b.onclick = _ => {
            if (parseInt(b.innerText) === _operation.answer) {
                $(`#p_result`).innerHTML = `🤩`;
                b.className = "top";
                _score++;
                if (_score === 10) {
                    stopTimer();
                    $(`#sp_score`).innerHTML = _score;
                    $(`#p_operation`).innerHTML = `You WIN !`;
                    $(`#p_result`).innerHTML = `🥳`;
                } else setTimeout(() => {
                    $(`#sp_score`).innerHTML = _score;
                    initGame();
                }, 100);
            } else {
                $(`#p_result`).innerHTML = `😭`;
                _score--;
                b.disabled = true;
                $(`#sp_score`).innerHTML = _score;
            }
        }
    })
}

let getOperation = _nb => {
    let _op = getRandom(0, 10);
    for (let i = 0; i < _nb; i++) {
        _op += ` ${_tabOPERATIONS[getRandom(0, _tabOPERATIONS.length - 1)]}`;
        _op += ` ${getRandom(0, 10)}`;
    }
    const answer = eval(_op);
    let _random = 0;
    let _tabAnswers = [answer];
    while (_tabAnswers.length <= 8) {
        _random = getRandom(answer - 10, answer + 10);
        if (!_tabAnswers.includes(_random)) _tabAnswers.push(_random)
    }
    return {
        operation: _op,
        answer: answer,
        answers: setShuffle(_tabAnswers)
    }
}

/**
* Return a number between _min & _max (included)
* @param {number} _min 
* @param {number} _max 
*/
const getRandom = (_min, _max) => Math.floor(Math.random() * (_max - _min + 1) + _min);

let setShuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue
    }
    return array;
}

// timer
const add = _ => {
    _timer.s++;
    if (_timer.s >= 60) {
        _timer.s = 0;
        _timer.m++;
        if (_timer.m >= 60) {
            _timer.m = 0;
            _timer.h++;
        }
    }
    $(`#timer`).innerHTML = (`${(_timer.h < 10) ? `0` + _timer.h : _timer.h}:${(_timer.m < 10) ? `0` + _timer.m : _timer.m}:${(_timer.s < 10) ? `0` + _timer.s : _timer.s}`);
    timer();
}
const timer = _ => t = setTimeout(add, 1000)
const stopTimer = _ => clearTimeout(t);
const resetTimer = _ => {
    _timer = { s: 0, m: 0, h: 0 };
    $(`#timer`).innerHTML = `00:00:00`;
}
const resetScore = _ => {
    _score = 0;
    $(`#sp_score`).innerHTML = _score;
    $(`#p_result`).innerHTML = `😌`;
}