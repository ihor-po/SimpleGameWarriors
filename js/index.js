'use strict'

let isEnemy = false; //флаг для создания героя при повторной игре

let friendDiv = document.getElementById('friend');
let enemyDiv = document.getElementById('enemy');

let friendHeroName = document.getElementById('friendHeroName');
let enemyHeroName = document.getElementById('enemyHeroName');

let friendHeroPowerIndex = document.getElementById('friendHeroPowerIndex');
let enemyHeroPowerIndex = document.getElementById('enemyHeroPowerIndex');

let friendHeroLevel = document.getElementById('friendHeroLevel');
let enemyHeroLevel = document.getElementById('enemyHeroLevel');

let friendHeroArmyInfo = document.getElementById('friendHeroArmyInfo'); //+
let enemyHeroArmyInfo = document.getElementById('enemyHeroArmyInfo'); //+

let friendSide = document.getElementById('friendSide'); //+
let enemySide = document.getElementById('enemySide'); //+
let sectionFightField = document.getElementById('section-fight__field');

let friendHero = null; //+
let enemyHero = null; //+

/**
*Подписка на события
*
*/

friendSide.addEventListener('contextmenu', function(e, isEnemy = false) { showMenu(e, friendHero, isEnemy); } );
enemySide.addEventListener('contextmenu', function(e, isEnemy = true) { showMenu(e, enemyHero, isEnemy); } );
fightSection.addEventListener('click', function(e) { fightSectionClick(e) } );
/* ========================================================================= */

function fightSectionClick(e){
//	console.log(e);
//  console.log(clientWindowSize);
	switch(e.target)
	{
		case addHeroToField:
			if (e.pageX < clientWindowSize.Width / 2)
			{
				friendHero = createHero();
				friendSide.innerHTML = '<img src="' + friendHero.Skin + '" style="width: 150px; height: auto;left:' + e.pageX + 'px;top:' + e.pageY + 'px;position: absolute;">';
				hideRightMenu();
			}
			else
			{
				enemyHero = createHero();
				enemySide.innerHTML = '<img src="' + enemyHero.Skin + '" style="width: 10%; height: auto;left:' + e.pageX + 'px;top:' + e.pageY + 'px;position: absolute;">';
				hideRightMenu();
			}
			break;
		case atackHero:
			alert('atack')
			break;
		case owner:
			break;	
		default:
			hideRightMenu();
			break;		
	}
}

//Для отображения своего меню +++++++
function showMenu(e, hero, isEnemy)
{
	e.preventDefault(); //для отмены показа стандартного меню

	if (e.target == friendSide)
	{
		showRightMenu(e.pageX, e.pageY, 'Дружуственная');
	}
	else if (e.target == enemySide)
	{
		showRightMenu(e.pageX, e.pageY, 'Вражеская');
	}
}

//Создание героя ++++
function createHero() {
	let newLevel = randomNumber(0, MAX_HERO_LEVEL - 10);
	let newArmyStrength = randomNumber(MIN_ARMY_STRENGTH, MAX_ARMY_STRENGTH);
	let skin = getHeroSkin(randomNumber(0, MAX_HEROS_SKINS - 1));

	return new Hero(newLevel, newArmyStrength, skin);
}

//Новая игра
function newGame() 
{
	fightBtn.style.display = 'block';
	playAgainBtn.style.display = 'none';
	newGameBtn.style.display = 'none';

	friend.style.display = 'block';
	enemy.style.display = 'block';

	friendHero = createHero();	//cоздание дружественного героя
	enemyHero = createHero();	//cоздание вражеского героя

	//Создание армии героя
	createHeroArmy(friendHero);
	createHeroArmy(enemyHero);

	//Отображение имени героя
	friendHeroName.firstChild.nodeValue = friendHero.MyName();
	enemyHeroName.firstChild.nodeValue = enemyHero.MyName();

	//Вывод информации о герое и его войска
	fillHeroInfo(friendHero, false);
	fillHeroInfo(enemyHero, true);
}


//newGame();



//Создание воина
function createWarrior(hero) {
	let newLevel = randomNumber(0, MAX_WARRIOR_LEVEL / 2);
	let newWarriorType = randomNumber(0, MAX_WARRIOR_TYPE - 1);
	return new Warrior(newLevel, newWarriorType, hero);
}

//Создание армии героя
function createHeroArmy(hero) {
	for (let i = 0; i < hero.ArmyStrength; i++)
	{
		createWarrior(hero);
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

function heroArmyLevelUp(hero)
{
	hero.HerosArmy.forEach(function(warrior) { warrior.levelUp() });
}

//Заполнение карточки информацией о герое
function fillHeroInfo(hero, isEnemy)
{
	if (isEnemy)
	{
		enemyHeroPowerIndex.innerHTML = hero.PowerIndex;
		enemyHeroLevel.firstChild.nodeValue = hero.Level;
		enemyHeroArmyInfo.innerHTML = '<img src="' + hero.Skin + '" style="width: 60%; height: auto;">';
		enemyHeroArmyInfo.innerHTML += getHeroArmyInfo(hero);
	}
	else
	{
		friendHeroPowerIndex.innerHTML = hero.PowerIndex;
		friendHeroLevel.firstChild.nodeValue = hero.Level;
		friendHeroArmyInfo.innerHTML = '<img src="' + hero.Skin + '" style="width: 60%; height: auto;">';
		friendHeroArmyInfo.innerHTML += getHeroArmyInfo(hero);
	}
}

//Сражение героев
function LetsDance() {
	fightBtn.style.display = 'none';
	playAgainBtn.style.display = 'block';
	newGameBtn.style.display = 'block';

	switch(friendHero.atack(enemyHero))
	{
		case 1:
			isEnemy = true;
			enemy.style.display = 'none';
			friendHero.levelUp();
			heroArmyLevelUp(friendHero);
			fillHeroInfo(friendHero, false);
			break;
		case 0:
			isEnemy = false;
			friend.style.display = 'none';
			enemyHero.levelUp();
			heroArmyLevelUp(enemyHero);
			fillHeroInfo(enemyHero, true);
			break;
		default: 
			friendDiv.style.display = 'none';
			enemyDiv.style.display = 'none';
			break;		
	}
}

//Сыграть еще раз
function playAgain()
{
	fightBtn.style.display = 'block';
	playAgainBtn.style.display = 'none';
	newGameBtn.style.display = 'none';

	if (isEnemy)
	{
		enemyHero = createHero();;
		createHeroArmy(enemyHero);
		enemyHeroName.firstChild.nodeValue = enemyHero.MyName();
		fillHeroInfo(enemyHero, true);
		enemyDiv.style.display = 'block';
	}
	else
	{
		friendHero = createHero();
		createHeroArmy(friendHero);
		friendHeroName.firstChild.nodeValue = friendHero.MyName();
		fillHeroInfo(friendHero, false);
		friendDiv.style.display = 'block';
	}
}
