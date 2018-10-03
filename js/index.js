'use strict'

let friendDiv = document.getElementById('friend');
let enemyDiv = document.getElementById('enemy');

let friendHeroName = document.getElementById('friendHeroName');
let enemyHeroName = document.getElementById('enemyHeroName');

let friendHero = createHero();	//cоздание дружественного героя
let enemyHero = createHero();	//cоздание вражеского героя

//Изменение имени героя
friendHeroName.firstChild.nodeValue = friendHero.MyName();
enemyHeroName.firstChild.nodeValue = enemyHero.MyName();

//Создание армии героя
createHeroArmy(friendHero);
createHeroArmy(enemyHeroName);






// switch(friendHero.atack(enemyHero))
// {
// 	case 1:
// 		enemy.style.display = 'none';
//		friendHero.levelUp();
// 		break;
// 	case 0:
// 		friend.style.display = 'none';
//		enemyHero.levelUp();
// 		break;
// 	default: 
// 		friendDiv.style.display = 'none';
// 		enemyDiv.style.display = 'none';
// 		break;		
// }

//Создание героя
function createHero() {
	let newLevel = randomNumber(0, MAX_HERO_LEVEL - 10);
	let newArmyStrength = randomNumber(MIN_ARMY_STRENGTH, MAX_ARMY_STRENGTH);
	return new Hero(newLevel, newArmyStrength);
}

//Создание воина
function createWarrior() {
	let newLevel = randomNumber(0, MAX_WARRIOR_LEVEL / 2);
	let newWarriorType = randomNumber(0, MAX_WARRIOR_TYPE - 1);
	return new Warrior(newLevel, newWarriorType);
}

//Создание армии героя
function createHeroArmy(hero) {
	for (let i = 0; i < hero.ArmyStrength; i++)
	{
		hero.addNewWarrior(createWarrior());
	}
}

//Создание 

