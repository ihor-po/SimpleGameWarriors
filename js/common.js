'use strict'

const NAMES_COUNT = 10;
const MIN_ARMY_STRENGTH = 4;
const MAX_ARMY_STRENGTH = 10;
const MAX_WARRIOR_TYPE = 4;
const MAX_HERO_LEVEL = 99;
const MAX_WARRIOR_LEVEL = 150;
const MAX_HEROS_SKINS = 4;
const HEADER_SIZE = 112;

const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 180;


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

let fightSection = document.getElementById('fightSection');//+
let rightMenu = document.getElementById('right-menu');//+
let owner = document.getElementById('owner');//+
let addHeroToField = document.getElementById('addHeroToField');//+
let atackHero = document.getElementById('atackHero');//+

let clientWindowSize = {
    Width : 0,
    Height: 0
};

//при загрузке страницы получаем размер окна
getClientWindowSize();
//при загрузке страницы скрываем правое меню
hideRightMenu();

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

//Получение картинки героя
function getHeroSkin(i) { return herosSkins[i]; }

//Отображение контекстного меню
function showRightMenu(X, Y, title) { 
    rightMenu.style.left = X + 'px';
    rightMenu.style.top = Y + 'px';
    owner.innerHTML = title;
    rightMenu.style.display = 'block'; 
}

//Скрытие контекстнного меню
function hideRightMenu() { 
    rightMenu.style.display = 'none';
    owner.innerHTML = '';
}

//Получение размеров окна
function getClientWindowSize() {
    clientWindowSize.Width = window.innerWidth;
    clientWindowSize.Height = window.innerHeight;
}