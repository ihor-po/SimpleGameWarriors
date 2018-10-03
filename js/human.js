'use strict'

class Human {
	
	constructor(isHero) {
		let newName;

		if (isHero)
		{
			newName = getNewHeroName(randomNumber(0, NAMES_COUNT - 1));
		}
		else
		{
			newName = getNewWarriorName(randomNumber(0, NAMES_COUNT - 1));
		}
		
    	this.Name = newName;
 	 }

 	 MyName() {
 	 	return this.Name;
 	 }
}

