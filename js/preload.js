'use strict'

/*
* HEADER
*/
let header = document.getElementById('header');

/*
* HEADER TITLE
*/
let headerTitle = document.getElementById('headerTitle');
/*
* FIGHT SECTION
*/
let fightSection = document.getElementById('fightSection');
fightSection.addEventListener('transitionend', function() { friendEnemySidesShow(); } )

//Блоки содержащие информацию об имени и силе войска героя 
let friendHeroInfo = document.getElementById('friendInfo');
let enemyHeroInfo = document.getElementById('enemyInfo');

/*
* FIGHT SECTION FRIEND / ENEMY HERO SIDE
*/
let friendSide = document.getElementById('friendSide');
let enemySide = document.getElementById('enemySide');

//Пункт меню для отображения информации об армии героя
let heroInfoMenu = document.getElementById('heroInfo');

//Слои для отображения армии героя
let friendArmyDiv = document.getElementById('friendArmyDiv');
let enemyArmyDiv = document.getElementById('enemyArmyDiv');

friendArmyDiv.addEventListener('animationend', function() {
	this.style.display = 'none';
});

enemyArmyDiv.addEventListener('animationend', function() {
	this.style.display = 'none';
});

/*
* CHAT SECTION
*/
let sectionChat = document.getElementById('sectionChat');
let chatForm = document.getElementById('chatForm');
sectionChat.addEventListener('transitionend', function() { chatForm.style.opacity = 1; });


/* ======================================================================================= */

friendHeroInfo.style.display = 'none';
enemyHeroInfo.style.display = 'none';
heroInfoMenu.style.display = 'none';
friendArmyDiv.style.display = 'none';
enemyArmyDiv.style.display = 'none';

setTimeout(function() { loadPage() }, 500);


function loadPage(){
	header.style.opacity = 1;

	fightSection.style.width = '100%';
	fightSection.style.borderColor = 'rgba(99, 99, 99, 1)';

	sectionChatShow();
}

function sectionChatShow() {
	sectionChat.style.opacity = 1;
	sectionChat.style.width = '40rem';
	sectionChat.style.left = 'calc(50% - 20rem)';
	sectionChat.style.borderColor = 'rgba(9, 63, 162, 1)';
}

function friendEnemySidesShow() {
	friendSide.style.opacity = 1;
	enemySide.style.opacity = 1;
	friendSide.style.width = '50%';
	enemySide.style.width = '50%';
	friendSide.style.left = '0';
	enemySide.style.left = '0';
}
