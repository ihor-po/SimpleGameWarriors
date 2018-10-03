'use strict'

const NAMES_COUNT = 10;
const MIN_ARMY_STRENGTH = 4;
const MAX_ARMY_STRENGTH = 10;
const MAX_WARRIOR_TYPE = 4;
const MAX_HERO_LEVEL = 99;
const MAX_WARRIOR_LEVEL = 150;


let names = ['Перун', 'Хорс', 'Дажьбог', 'Стрибог', 'Семаргл', 'Мокошь', 'Велес', 'Рожаницы и Род', 'Сварог', 'Сварожич'];
let warriorNames = ['Святослав', 'Доброжир', 'Тихомир', 'Ратибор', 'Ярополк', 'Гостомысл', 'Велимудр', 'Всеволод', 'Любомила', 'Доброгнева'];
let warriorType = ['Воин', 'Лучник', 'Маг', 'Мифическое существо'];


let fightBtn = document.getElementById('fight-btn');


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