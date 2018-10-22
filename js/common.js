'use strict'

const NAMES_COUNT = 10;
const MIN_ARMY_STRENGTH = 4;
const MAX_ARMY_STRENGTH = 10;
const MAX_WARRIOR_TYPE = 4;
const MAX_HERO_LEVEL = 99;
const MAX_WARRIOR_LEVEL = 150;
const MAX_HEROS_SKINS = 4;
const MAX_HEROS_MESSAGES = 8;
const HEADER_SIZE = 112;

const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 180;
const FRIEND_HERO_BORDER = '-webkit-box-shadow: 0px 0px 13px 1px rgba(0,128,0,0.65);' +
'-moz-box-shadow: 0px 0px 13px 1px rgba(0,128,0,0.65); box-shadow: 0px 0px 13px 1px rgba(0,128,0,0.65);';


let names = ['Перун', 'Хорс', 'Дажьбог', 'Стрибог', 'Семаргл', 'Мокошь', 'Велес', 'Рожаницы и Род', 'Сварог', 'Сварожич'];
let warriorNames = ['Святослав', 'Доброжир', 'Тихомир', 'Ратибор', 'Ярополк', 'Гостомысл', 'Велимудр', 'Всеволод', 'Любомила', 'Доброгнева'];
let warriorType = ['Воин', 'Лучник', 'Маг', 'Мифическое существо'];
let herosSkins = [
	'img/hero_1_web.png',
	'img/hero_2_web.png',
	'img/hero_3_web.png',
	'img/hero_4_web.png',
];

let herosMessages = [
    'За державу!',
    'УБЬЮ!!!!',
    'А а а а а а а а а а а а а а а а а а а а а',
    'Смотри, крокодил полетел',
    'Препод смотрит?',
    'Кофе-бейк будет?',
    'Давай забухаем?',
    'Ты класная....'
];


let fightBtn = document.getElementById('fight-btn');
let newGameBtn = document.getElementById('newGame-btn');

let rightMenu = document.getElementById('right-menu');
let owner = document.getElementById('owner');
let addHeroToField = document.getElementById('addHeroToField');
let atackHero = document.getElementById('atackHero');
let fightResult = document.getElementById('fightResult');

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

//Скрыть / показать кнопки для атаки
function showHideHeroButton(show)
{
    if (show)
    {
        addHeroToField.style.display = 'block';    //скрытие кнопки добавить героя
    }
    else
    {
        addHeroToField.style.display = 'none';    //скрытие кнопки добавить героя
    }
}

//Скрыть / показать кнопки для атаки
function showHideFightButtons(show)
{
    if (show)
    {
        fightBtn.style.display = 'block';    //скрытие кнопки сразиться
        atackHero.style.display = 'block';   //скрытие меню атаковать
    }
    else
    {
        fightBtn.style.display = 'none';    //скрытие кнопки сразиться
        atackHero.style.display = 'none';   //скрытие меню атаковать
    }
}

//Скрыть / отобразить элемент
function showHideElement(element ,res) { element.style.display = res }

//Скрыть / показать кнопку Сразиться 
function showHideFightBtn(status) { (status) ? showHideElement(fightBtn, 'block')  : showHideElement(fightBtn, 'none'); }

//Скрыть / показать кнопку Новая игра
function showHideNewGameBtn(status) { (status) ? showHideElement(newGameBtn, 'block') : showHideElement(newGameBtn, 'none'); }

function showFightResult(status) { 
    if (status) 
    {
        showHideElement(fightResult, 'block');
        setTimeout(showFightResult, 5000, false);
    } 
    else 
    {
        showHideElement(fightResult, 'none'); 
        fightResult.classList.remove("fightResult--red");
        fightResult.classList.remove("fightResult--green");
    }
}
