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

let friendHero = createHero();	//cоздание дружественного героя
let enemyHero = createHero();	//cоздание вражеского героя

//Создание армии героя
createHeroArmy(friendHero);
createHeroArmy(enemyHero);

//Отображение имени героя
friendHeroName.firstChild.nodeValue = friendHero.MyName();
enemyHeroName.firstChild.nodeValue = enemyHero.MyName();

//Вывод информации о герое и его войска
fillHeroInfo(friendHero, false);
fillHeroInfo(enemyHero, true);

//Создание героя
function createHero() {
	let newLevel = randomNumber(0, MAX_HERO_LEVEL - 10);
	let newArmyStrength = randomNumber(MIN_ARMY_STRENGTH, MAX_ARMY_STRENGTH);
	return new Hero(newLevel, newArmyStrength);
}

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
		enemyHeroArmyInfo.innerHTML = getHeroArmyInfo(hero);
	}
	else
	{
		friendHeroPowerIndex.innerHTML = hero.PowerIndex;
		friendHeroLevel.firstChild.nodeValue = hero.Level;
		friendHeroArmyInfo.innerHTML = getHeroArmyInfo(hero);
	}
}

//Сражение героев
function LetsDance() {
	switch(friendHero.atack(enemyHero))
	{
		case 1:
			enemy.style.display = 'none';
			friendHero.levelUp();
			heroArmyLevelUp(friendHero);
			fillHeroInfo(friendHero, false);
			break;
		case 0:
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
