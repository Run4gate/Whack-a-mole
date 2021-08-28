const holes = document.querySelectorAll('.hole')
const mole = document.querySelector('.mole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
const sound = document.querySelector('.audio')
const levelBoard = document.querySelector('.level')
const recordBoard = document.querySelector('.record')
const recordBoard2 = document.querySelector('.record-level')
let lastHole = ''
let lastSound = ''
let timeUp = true
let score = 0
let level = 1
let record = 0
let recordLevel = 0
function randomTime (min, max) {
     return Math.round(Math.random() * (max - min) + min)
}
 
function randomHole (holes) {
    let idx = Math.floor(Math.random() * holes.length)
    let hole = holes[idx]
     if (hole === lastHole) {
         return randomHole(holes)
     }
     lastHole = hole
     return hole
}
function playSound() {
    let audio = new Audio()
    audio.src = '/audio/audio1.mp3'
    audio.autoplay = true
}
moles.forEach(mole => mole.addEventListener('click', playSound))
function trigger() {
const time = randomTime(200, (1000 / (level * 0.5)))
const hole = randomHole(holes)
hole.classList.add('up')
setTimeout(() => {
    hole.classList.remove('up')
    if(!timeUp)
    trigger()
}, time)
}
function startGame() {
    scoreBoard.textContent = 0
    timeUp = false
    score = 0
    trigger()
    setTimeout(() => timeUp = true, 10000)
    setTimeout(() => progress(), 10000)
    setTimeout(() => recording(), 10000)
    setTimeout(() => saveGame(), 10000)
}
function restartGame() {
    score = 0
    level = 1
    scoreBoard.textContent = 0
    levelBoard.textContent = 1
}
function loadGame() {
    score = Number(localStorage.getItem('score'))
    scoreBoard.textContent = score
    if (score > 0) {
    level = Number(localStorage.getItem('level'))
    levelBoard.textContent = level
    }
    record = Number(localStorage.getItem('record'))
    recordBoard.textContent = record
    recordLevel = Number(localStorage.getItem('recordLevel'))
    recordBoard2.textContent = recordLevel
}
function hit (e) {
    if (!e.isTrusted) return // someone's hands are dirty

 score++
 this.classList.remove('up')
 scoreBoard.textContent = score
 return score
}
moles.forEach(mole => mole.addEventListener('click', hit))
function progress () {
    if (score > 10) {
        level++
        levelBoard.textContent = level
        alert('Congrats! you hitted the mole more than 10 times, you deserve your level up')
    } else {
        levelBoard.textContent = level
    }
}
function recording () {
    if (recordLevel < level) {
        recordLevel = level 
        recordBoard2.textContent = recordLevel
      if (record < score) {
        recordBoard.textContent = score
        record = score
        return record
      } else {
        recordBoard.textContent = record
      }
    }
}
function saveGame () {
localStorage.setItem('score', score)
localStorage.setItem('level', level)
localStorage.setItem('record', record)
localStorage.setItem('recordLevel', recordLevel)
}