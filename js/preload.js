'use strict'

const DOMAIN  = 'warriors.loc';

needRedirect();

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

//Пункт меню скрыть/отобразить чат
let showChat = document.getElementById('showChat');

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
let sendMessageBtn = document.getElementById('sendMessageBtn');
let heroMessage = document.getElementById('heroMessage');

sectionChat.addEventListener('transitionend', function() { chatForm.style.opacity = 1; });

let friendMessageDiv = document.getElementById('friend-message');
let enemyMessageDiv = document.getElementById('enemy-message');

/* ======================================================================================= */

friendHeroInfo.style.display = 'none';
enemyHeroInfo.style.display = 'none';
heroInfoMenu.style.display = 'none';
friendArmyDiv.style.display = 'none';
enemyArmyDiv.style.display = 'none';
friendMessageDiv.style.display = 'none';
friendMessageDiv.style.opacity = 0;
enemyMessageDiv.style.display = 'none';
enemyMessageDiv.style.opacity = 0;

setTimeout(function() { loadPage() }, 500);


function loadPage(){
	header.style.opacity = 1;

	fightSection.style.width = '100%';
	fightSection.style.borderColor = 'rgba(99, 99, 99, 1)';

	sectionChatShow();
	enableDisableChatField(false);
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

function enableDisableChatField(status)
{
	if (status)
	{
		sendMessageBtn.disabled = false;
		heroMessage.disabled = false;
	}
	else
	{
		sendMessageBtn.disabled = true;
		heroMessage.disabled = true;
	}
}

function showMessageDiv(msg ,X, Y, isEnemy) {
	if (isEnemy)
	{
		enemyMessageDiv.innerHTML = msg;
		enemyMessageDiv.style.left = X + 'rem';
		enemyMessageDiv.style.top = Y + 'rem';
		enemyMessageDiv.style.display = 'block';
		enemyMessageDiv.style.opacity = 1;
		setTimeout(function() {
			enemyMessageDiv.style.opacity = 0;
			enemyMessageDiv.style.display = 'none';
		  }, 4000);
	}
	else
	{
		friendMessageDiv.innerHTML = msg;
		friendMessageDiv.style.left = X + 'rem';
		friendMessageDiv.style.top = Y + 'rem';
		friendMessageDiv.style.display = 'block';
		friendMessageDiv.style.opacity = 1;
		setTimeout(function() {
			friendMessageDiv.style.opacity = 0;
			friendMessageDiv.style.display = 'none';
		  }, 4000);
	}
}

//Получение куки
function getCookie() {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )"
  ));

  let res = undefined;

  if (matches.input != '')
  {
  	res = [];
  	let str = decodeURIComponent(matches.input);
  	let keyValue = str.split('; ');
  	for(let key in keyValue)
  	{
  		let cookie = keyValue[key].split('=');
  		res[cookie[0]] = cookie[1];
  	}
  }
  return res;
}

//Редирект на страницу входа
function needRedirect()
{
	let res = getCookie();
	if (getCookie() == undefined)
	{
		if(res['domain'] == DOMAIN)
		{
			localStorage.clear();
			window.location.replace('index.html');
		}
	}
}