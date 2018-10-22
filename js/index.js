'use strict'

let friendDiv = document.getElementById('friend');
let enemyDiv = document.getElementById('enemy');

let friendHeroName = document.getElementById('friendHeroName');
let enemyHeroName = document.getElementById('enemyHeroName');

let friendHeroPowerIndex = document.getElementById('friendHeroPowerIndex');
let enemyHeroPowerIndex = document.getElementById('enemyHeroPowerIndex');

let friendHeroLevel = document.getElementById('friendHeroLevel');
let enemyHeroLevel = document.getElementById('enemyHeroLevel');

let friendHeroArmyInfo = document.getElementById('friendArmyInfo');
let enemyHeroArmyInfo = document.getElementById('enemyArmyInfo');

let friendHero = null;
let enemyHero = null;

//Переменные для хранения выбора героев
let friendChoosed = false;
let enemyChoosed = false;

//переменная для отслежывания нажатия кнопки мыши
let mouseMoveRes = 0;
let mouseOnChat = 0;

//для хранения ссылки слоя героя
let copyFriendHero = null;
let copyEnemyHero = null;

showHideFightButtons(false);
showHideNewGameBtn(false);
//fightResult.classList.add('fightResult--red');
showFightResult(false);

/**
*Подписка на события
*
*/

friendSide.addEventListener('contextmenu', function(e, isEnemy = false) { showMenu(e, friendHero, isEnemy); } );
enemySide.addEventListener('contextmenu', function(e, isEnemy = true) { showMenu(e, enemyHero, isEnemy); } );
fightSection.addEventListener('click', function(e) { fightSectionClick(e) } );
fightSection.addEventListener('mousemove', function(e) { mouseMoveOnField(e); })
sectionChat.addEventListener('mousedown', function() { ++mouseOnChat; })
sectionChat.addEventListener('mouseup', function() { mouseOnChat = 0; })
sectionChat.addEventListener('mousemove', function(e) { mouseMoveOnChat(e); });
sendMessageBtn.addEventListener('click', function() { sendMessage(); })
/* ========================================================================= */

function mouseMoveOnChat(e) {
	if (mouseOnChat)
	{
		sectionChat.style.transition = 'none';

		let minX = 0;
		let minY = 4 * 16;
		let maxX = clientWindowSize.Width - 40 * 16;
		let maxY = clientWindowSize.Height - 6 * 16;





		switch(e.path[0])
		{
			case sectionChat:
			case chatForm:
			case heroMessage:
				chatRelocation(sectionChat, e.pageX, e.pageY, minX, maxX, minY, maxY);
				break;	
		}
	}
}

//Перемещение героя по своему полю
function chatRelocation(chat, X, Y , minX, maxX, minY, maxY) {
	let halfWidth = 20 * 16;
	let halfHeight = 3 * 16;

	X = X - halfWidth;
	Y = Y - halfHeight;

	chat.style.left = X / 16 + 'rem';
	chat.style.top = Y / 16 + 'rem';
}

//Отправка сообщения
function sendMessage() {
	let heroPosition;
	(friendChoosed) ? heroPosition = getHeroPosition(copyFriendHero) : heroPosition = getHeroPosition(copyEnemyHero);
	(friendChoosed) ? showMessageDiv(heroMessage.value, heroPosition[0], heroPosition[1], false) : showMessageDiv(heroMessage.value, heroPosition[0], heroPosition[1], true);
	heroMessage.value = '';
}

//Отправка случайного сообщения героем
function sendMessageBeforeFight(isEnemy) {

	let heroPosition;
	let msg;

	if (isEnemy)
	{
		heroPosition = getHeroPosition(copyEnemyHero);
		msg = getHeroMessage(randomNumber(0, MAX_HEROS_MESSAGES - 1));
	}
	else
	{
		heroPosition = getHeroPosition(copyFriendHero);
		msg = getHeroMessage(randomNumber(0, MAX_HEROS_MESSAGES - 1));
	}

	showMessageDiv(msg, heroPosition[0], heroPosition[1], isEnemy);
}

function getHeroPosition(hero)
{
	let position = hero.getBoundingClientRect();
	let X;
	(copyEnemyHero) ? X = (position.right - position.width) / 16 : X = position.left / 16;

	let Y = (position.top - (3 * 16)) / 16;
	return [X, Y];
}

//Событие перемещения мыши по боевому полю
function mouseMoveOnField(e) {
	if (mouseMoveRes)
	{
		let [minX, maxX, X, Y] = [0, 0, 0, 0];
		let sideWidth = friendSide.offsetWidth;												//получение ширины слоя
		let sideHeight = fightSection.offsetHeight + HEADER_SIZE;							//получение высоты слоя
		let minY = HEADER_SIZE + IMAGE_HEIGHT / 2;											//получение минимальных координат Y
		let maxY = fightSection.offsetHeight + HEADER_SIZE + IMAGE_HEIGHT / 2;				//получение максимальных координат Y
		switch(e.path[0])
		{
			case copyFriendHero:
				minX = clientWindowSize.Width / 2 - sideWidth * 0.89;						//получение минимальных корддинат X
				maxX = clientWindowSize.Width / 2 + IMAGE_WIDTH / 2;
										//получение максимальных координат X
				heroRelocation(copyFriendHero, e.pageX, e.pageY, minX, maxX, minY, maxY);
				
				break;
			case copyEnemyHero:
				minX = clientWindowSize.Width / 2 + IMAGE_WIDTH / 2;						//получение минимальных корддинат X
				maxX = clientWindowSize.Width + 58;							//получение максимальных координат X

				heroRelocation(copyEnemyHero, e.pageX, e.pageY, minX, maxX, minY, maxY);

				break;	
		}
	}
}

//Перемещение героя по своему полю
function heroRelocation(hero, X, Y , minX, maxX, minY, maxY) {
	X = getXPosition(X, minX, maxX) - IMAGE_WIDTH / 2;					//Получение координат X
	Y = getYPosition(Y, maxY, minY) - IMAGE_HEIGHT / 2;					//Получение координат Y

	hero.style.left = X / 16 + 'rem';
	hero.style.top = Y / 16 + 'rem';
}

//Обработка нажатия кнопки меню
function fightSectionClick(e){
	switch(e.target)
	{
		case addHeroToField:
			if (e.pageX < clientWindowSize.Width / 2 + 16)
			{
				if (friendHero == null)
				{
					friendHero = createHero();
					createHeroArmy(friendHero);
					addHeroToFiled(friendSide, e.pageX, e.pageY, friendHero.Skin, false);


					//Отображение имени героя
					friendHeroName.firstChild.nodeValue = friendHero.MyName();
					//Вывод информации о герое и его войска
					fillHeroInfo(friendHero, false);
					friendHeroInfo.style.display = 'block';
					heroInfo.style.display = 'block';
				}
			}
			else
			{
				enemyHero = createHero();
				createHeroArmy(enemyHero);
				addHeroToFiled(enemySide, e.pageX - IMAGE_WIDTH / 2, e.pageY - IMAGE_HEIGHT / 2, enemyHero.Skin, true);

				//Отображение имени героя
				enemyHeroName.firstChild.nodeValue = enemyHero.MyName();
				//Вывод информации о герое и его войска
				fillHeroInfo(enemyHero, true);
				enemyHeroInfo.style.display = 'block';
			}
			hideRightMenu();
			break;
		case atackHero:
			hideRightMenu();
			LetsDance();
			break;
		case heroInfoMenu:
			showHeroArmyInfo();
			break;
		case showChat:
			showHideChat();
			break;	
		case owner:
			break;	
		default:
			hideRightMenu();
			break;		
	}
}

function showHideChat()
{
	if (showChat.dataset.show == 'No')
	{
		showChat.dataset.show = 'Yes';
		showChat.innerHTML = 'Показать чат';
		sectionChat.style.display = 'none';
	}
	else
	{
		showChat.dataset.show = 'No';
		showChat.innerHTML = 'Скрыть чат';
		sectionChat.style.display = 'block';
	}
	hideRightMenu();
}

//Отображение армии героя
function showHeroArmyInfo()
{
	switch(heroInfo.dataset.hero)
	{
		case 'friend':
			friendArmyDiv.style.display='';
			break;
		case 'enemy':
			enemyArmyDiv.style.display='';
			break;	
	}
	hideRightMenu();
}

//Устанавливает героя в соответсвующее поле
function addHeroToFiled(side, X, Y, skin, isEnemy)
{
	showHideElement(newGameBtn, 'none');
	let sideStartWidth = 0;
	let sideStartHeight = 0;
	let sideWidth = side.offsetWidth;								//получение ширины слоя
	let sideHeight = fightSection.offsetHeight + HEADER_SIZE;		//получение высоты поля

	Y = getYPosition(Y, sideHeight);

	if (!isEnemy)
	{
		sideStartWidth = clientWindowSize.Width / 2 - sideWidth; //начальная координата поля героя
		X = getXPosition(X, sideStartWidth, clientWindowSize.Width / 2);

		//добавление слоя с картинкой героя
		side.innerHTML = '<div class="hero-look" id=\'friendHeroLook\'></div>';
		let friendHeroLook = document.getElementById('friendHeroLook');
		setHeroDiv(friendHeroLook, skin, X, Y);

		copyFriendHero = friendHeroLook;

		//Подписка слоя с героем на собитие нажатия кнопки мыши
		friendHeroLook.addEventListener('click', function(e) { setRemoveBorder(this, false) } );
		friendHeroLook.addEventListener('mousedown', function() { ++mouseMoveRes; })
		friendHeroLook.addEventListener('mouseup', function() { mouseMoveRes = 0; })
	}
	else
	{
		sideStartWidth = clientWindowSize.Width / 2 + 16;
		X = getXPosition(X, sideStartWidth, sideStartWidth + sideWidth);

		//добавление слоя с картинкой героя
		side.innerHTML = '<div class="hero-look" id=\'enemyHeroLook\'></div>';
		let enemyHeroLook = document.getElementById('enemyHeroLook');
		setHeroDiv(enemyHeroLook, skin, X, Y);

		//Подписка слоя с героем на собитие нажатия кнопки мыши
		enemyHeroLook.addEventListener('click', function(e) { setRemoveBorder(this) } );
		enemyHeroLook.addEventListener('mousedown', function() { ++mouseMoveRes; })
		enemyHeroLook.addEventListener('mouseup', function() { mouseMoveRes = 0; })
		copyEnemyHero = enemyHeroLook;
	}
}

//проверка выбора обоих героев
function bothChoose()
{
	if (friendChoosed && enemyChoosed)
	{
		enableDisableChatField(false);
		return true;
	}

	return false
}

//Подсветка слоя с героя
function setRemoveBorder(heroDiv, isEnemy = true) {
	if (heroDiv.style.border == '')
	{
		if (isEnemy)
		{
			heroDiv.style.border = '2px solid red';
			enemyChoosed = true;
		}
		else
		{
			heroDiv.style.border = '2px solid green';
			friendChoosed = true;
		}
	}
	else
	{
		if (isEnemy)
		{
			enemyChoosed = false;
		}
		else
		{
			friendChoosed = false;
		}
		heroDiv.style.border = '';
	}

	if (bothChoose())
	{
		showHideFightButtons(true);
		enableDisableChatField(false);	
	}
	else
	{
		showHideFightButtons(false);
		enableDisableChatField(true);
	}
}

//Отображение слоя героя
function setHeroDiv(heroDiv, skin, X, Y) {
		heroDiv.style.left = X / 16 + 'rem';
		heroDiv.style.top = Y / 16 + 'rem';
		heroDiv.style.backgroundImage = 'url(' + skin + ')';
		heroDiv.style.backgroundSize = '9.375rem 11.26rem';
}

//Получение координаты по горизонтали
function getXPosition(X, minWidth, maxWidth) {
	let res = X;

	if (X + IMAGE_WIDTH > maxWidth)
	{
		let tmp = X + IMAGE_WIDTH - maxWidth;
		res = X - tmp;
	}

	if (X < minWidth)
	{
		res = minWidth;		
	}

	return res;
}

//Получение координаты по вертикали
function getYPosition(Y, maxHeight, minHeight = null) {
	let res = Y-60;

	if (Y + IMAGE_HEIGHT > maxHeight)
	{
		let tmp = Y + IMAGE_HEIGHT - maxHeight;
		res = Y - tmp;
	}
	if (minHeight != null && Y < minHeight)
	{
		res = minHeight;
	}

	return res;
}

//Для отображения своего меню
function showMenu(e, hero, isEnemy)
{
	e.preventDefault(); //для отмены показа стандартного меню

	if (e.target == friendSide)
	{
		showRightMenu(e.pageX, e.pageY, 'Дружуственная');

		if (friendHero != null)
		{
			showHideHeroButton(false);

			if (friendArmyDiv.style.display == 'none')
			{
				heroInfo.style.display = 'block';
				heroInfo.dataset.hero = 'friend';
			}
			else
			{
				heroInfo.style.display = 'none';
				heroInfo.dataset.hero = '';
			}
		}
		else
		{
			showHideHeroButton(true);
			heroInfo.style.display = 'none';
			heroInfo.dataset.hero = '';
		}
	}
	else if (e.target == enemySide)
	{
		showRightMenu(e.pageX, e.pageY, 'Вражеская');

		if (enemyHero != null)
		{
			showHideHeroButton(false);

			if (enemyArmyDiv.style.display == 'none')
			{
				heroInfo.style.display = 'block';
				heroInfo.dataset.hero = 'enemy';
			}
			else
			{
				heroInfo.style.display = 'none';
				heroInfo.dataset.hero = '';
			}
		}
		else
		{
			showHideHeroButton(true);
			heroInfo.style.display = 'none';
			heroInfo.dataset.hero = '';
		}
	}
}

//Создание героя
function createHero() {
	let newLevel = randomNumber(0, MAX_HERO_LEVEL - 10);
	let newArmyStrength = randomNumber(MIN_ARMY_STRENGTH, MAX_ARMY_STRENGTH);
	let skin = getHeroSkin(randomNumber(0, MAX_HEROS_SKINS - 1));

	return new Hero(newLevel, newArmyStrength, skin);
}

//Создание армии героя
function createHeroArmy(hero) {
	for (let i = 0; i < hero.ArmyStrength; i++)
	{
		createWarrior(hero);
	}
}

//Создание воина
function createWarrior(hero) {
	let newLevel = randomNumber(0, MAX_WARRIOR_LEVEL / 2);
	let newWarriorType = randomNumber(0, MAX_WARRIOR_TYPE - 1);
	return new Warrior(newLevel, newWarriorType, hero);
}

//Заполнение карточки информацией о герое
function fillHeroInfo(hero, isEnemy)
{
	if (isEnemy)
	{
		enemyHeroPowerIndex.innerHTML = hero.PowerIndex;
		enemyHeroLevel.firstChild.nodeValue = hero.Level;
		enemyHeroArmyInfo.innerHTML = getHeroArmyInfo(hero);
	}
	else
	{
		friendHeroPowerIndex.innerHTML = hero.PowerIndex;
		friendHeroLevel.firstChild.nodeValue = hero.Level;
		friendHeroArmyInfo.innerHTML = getHeroArmyInfo(hero);
	}
}

//Создание информации о войске
function getHeroArmyInfo(hero) {
	let info = '';
	hero.HerosArmy.forEach(function(warrior) {
		info += '<p>' + warrior.warriorHtmlInfo() + '</p>'; 
	});
	return info;
}

//Новая игра
function newGame() 
{
	if (friendHero != null)
	{
		clearHeroInfo(false);
	}

	if (enemyHero != null)
	{
		clearHeroInfo(true);
	}

	showHideElement(newGameBtn, 'none');
}

//Повышение уровня герою и войску
function heroArmyLevelUp(hero)
{
	hero.HerosArmy.forEach(function(warrior) { warrior.levelUp() });
}

//Убрать проигравшего с поля
function clearHeroInfo(isEnemy)
{
	if (isEnemy)
	{
		enemyInfo.style.display='none';
		showHideElement(copyEnemyHero, 'none');
		enemyHero = null;
		copyEnemyHero = null;
		enemyHeroName.firstChild.nodeValue = 'Герой';
		enemyHeroPowerIndex.innerHTML = 0;
		enemyHeroLevel.firstChild.nodeValue = 0;
		enemyHeroArmyInfo.innerHTML = '';
		enemyChoosed = false;
	}
	else
	{
		friendInfo.style.display='none';
		showHideElement(copyFriendHero, 'none');
		friendHero = null;
		copyFriendHero = null;
		friendHeroName.firstChild.nodeValue = 'Герой';
		friendHeroPowerIndex.innerHTML = 0;
		friendHeroLevel.firstChild.nodeValue = 0;
		friendHeroArmyInfo.innerHTML = '';
		friendChoosed = false;
	}
	showHideFightButtons(false);
}


//Сражение героев
function LetsDance() {

	sendMessageBeforeFight(true);
	sendMessageBeforeFight(false);

	setTimeout(function() {
		copyFriendHero.classList.add('rotate');
		copyEnemyHero.classList.add('rotate');
	}, 2000);
	
	setTimeout(function() { 
		switch(friendHero.atack(enemyHero))
		{
			case 1:

				fightResult.classList.add('fightResult--green');
				fightResult.innerHTML = '<h3 class=\'fightResult-text\'>winner</h3>';
				showFightResult(true);

				friendHero.levelUp();
				heroArmyLevelUp(friendHero);
				fillHeroInfo(friendHero, false);
				
				sendMessageBeforeFight(false);
				copyFriendHero.classList.remove('rotate');
				clearHeroInfo(true);

				break;
			case 0:

				fightResult.classList.add('fightResult--red');
				fightResult.innerHTML = '<h3 class=\'fightResult-text\'>loser</h3>';
				showFightResult(true);

				enemyHero.levelUp();
				heroArmyLevelUp(enemyHero);
				fillHeroInfo(enemyHero, true);

				sendMessageBeforeFight(true);
				copyEnemyHero.classList.remove('rotate');
				clearHeroInfo(false);

				break;
			default: 
				fightResult.innerHTML = '<h3 class=\'fightResult-text\'>draw</h3>';
				showFightResult(true);

				break;		
		}
	}, 4900);

	showHideElement(fightBtn, 'none');
	showHideElement(newGameBtn, 'block');
}
