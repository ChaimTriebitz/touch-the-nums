'use strict'
var gNums = []
var gNextNum
var gIsGameOn = false
var gLevel
var gStartTime
var gTimeInterval
var elTimer = document.querySelector('.time')

function initGame() {
	gLevel = 5
	elTimer.innerText = '00:00:000'
	gStartTime = 0
	gNextNum = 1
	setLevel()
	createBoard()
	resetNums()
	renderNums()
}

function createBoard() {
	var strHtml = ''
	for (var i = 0; i < gLevel; i++) {
		strHtml += '<tr>'
		for (var j = 0; j < gLevel; j++) {
			strHtml += '<td onclick="cellClicked(this)"></td>'
		}
		;('</tr>')
	}
	var elBoard = document.querySelector('.board')
	elBoard.innerHTML = strHtml
}

function setLevel() {
	var elInput = document.querySelector('input:checked')
	if (elInput) gLevel = +elInput.value
}

function resetNums() {
	for (var i = 0; i < gLevel * gLevel; i++) {
		gNums.push(i + 1)
	}
	gNums.sort(() => (Math.random() > 0.5 ? 1 : -1))
}

function renderNums() {
	var elTds = document.querySelectorAll('td')
	for (var i = 0; i < gLevel * gLevel; i++) {
		elTds[i].innerText = gNums.pop()
	}
}

function cellClicked(clickedNum) {
	if (!gIsGameOn && +clickedNum.innerText === 1) {
		gIsGameOn = true
		gStartTime = new Date().getTime()
		gTimeInterval = setInterval(timer, 100)
	}
	if (+clickedNum.innerText === gNextNum) {
		clickedNum.style.backgroundColor = '#5555ff'
		if (gNextNum === gLevel * gLevel) {
			gameOver()
			return
		}
		var elNum = document.querySelector('.num')
		gNextNum++
		elNum.innerText = gNextNum
	}
}

function gameOver() {
	gIsGameOn = false
	gStartTime = 0
	alert('WellDone')
	clearInterval(gStartTime)
	initGame()
}

function timer() {
	if (!gIsGameOn) return
	var currTime = new Date().getTime()
	var timePassed = new Date(currTime - gStartTime)
	//zero padding
	var padMins = timePassed.getMinutes() < 10 ? '0' : ''
	var padSecs = timePassed.getSeconds() < 10 ? '0' : ''
	var padMilis = timePassed.getMilliseconds()
	if (padMilis < 10) {
		padMilis = '00'
	} else if (padMilis < 100) {
		padMilis = '0'
	} else padMilis = ''
	//
	var mins = padMins + timePassed.getMinutes()
	var secs = padSecs + timePassed.getSeconds()
	var milis = padMilis + timePassed.getMilliseconds()
	var elTime = document.querySelector('.time')
	elTime.innerText = `${mins}:${secs}:${milis}`
}
