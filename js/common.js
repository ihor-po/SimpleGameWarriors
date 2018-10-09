'use strict'

const NAMES_COUNT = 10;
const MIN_ARMY_STRENGTH = 4;
const MAX_ARMY_STRENGTH = 10;
const MAX_WARRIOR_TYPE = 4;
const MAX_HERO_LEVEL = 99;
const MAX_WARRIOR_LEVEL = 150;
const MAX_HEROS_SKINS = 4;


let names = ['Перун', 'Хорс', 'Дажьбог', 'Стрибог', 'Семаргл', 'Мокошь', 'Велес', 'Рожаницы и Род', 'Сварог', 'Сварожич'];
let warriorNames = ['Святослав', 'Доброжир', 'Тихомир', 'Ратибор', 'Ярополк', 'Гостомысл', 'Велимудр', 'Всеволод', 'Любомила', 'Доброгнева'];
let warriorType = ['Воин', 'Лучник', 'Маг', 'Мифическое существо'];
let herosSkins = [
	'../img/hero_1_web.png',
	'../img/hero_2_web.png',
	'../img/hero_3_web.png',
	'../img/hero_4_web.png',
];


let fightBtn = document.getElementById('fight-btn');
let playAgainBtn = document.getElementById('playAgain-btn');
let newGameBtn = document.getElementById('newGame-btn');

//Получение случайного числа
function randomNumber(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    if (rand < 0)
    {
    	rand = 0;
    }
    return rand;
}

//Получение имени для героя
function getNewHeroName(i)  { return names[i]; }

//Получение имени для воина
function getNewWarriorName(i)  { return warriorNames[i]; }

//Получение типа воина
function getNewWarriorType(i)  { return warriorType[i]; }

function getHeroSkin(i) { return herosSkins[i]; }