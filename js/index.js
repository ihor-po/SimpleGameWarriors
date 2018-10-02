'use strict'

let friendDiv = document.getElementById('friend');
let enemyDiv = document.getElementById('enemy');

let friendHeroName = document.getElementById('friendHeroName');
let enemyHeroName = document.getElementById('enemyHeroName');

//создание дружественного героя
let newLevel = randomNumber(0, 99);
let newArmyStrength = randomNumber(MIN_ARMY_STRENGTH, MAX_ARMY_STRENGTH);
let friendHero = new Hero(newLevel, newArmyStrength);

//создание вражеского героя
newLevel = randomNumber(0, 99);
newArmyStrength = randomNumber(MIN_ARMY_STRENGTH, MAX_ARMY_STRENGTH);
let enemyHero = new Hero(newLevel, newArmyStrength);

//Изменение имени героя
friendHeroName.firstChild.nodeValue = friendHero.MyName();
enemyHeroName.firstChild.nodeValue = enemyHero.MyName();


// console.log(`${friendHero.MyName()}
// 	${friendHero.Level}
// 	${friendHero.ArmyStrength}
// 	${friendHero.PowerIndex}`);

friendHero.levelUp();

// console.log(`${enemyHero.MyName()}
// 	${enemyHero.Level}
// 	${enemyHero.ArmyStrength}
// 	${enemyHero.PowerIndex}`);


// switch(friendHero.atack(enemyHero))
// {
// 	case 1:
// 		enemy.style.display = 'none';
// 		break;
// 	case 0:
// 		friend.style.display = 'none';
// 		break;
// 	default: 
// 		friendDiv.style.display = 'none';
// 		enemyDiv.style.display = 'none';
// 		break;		
// }