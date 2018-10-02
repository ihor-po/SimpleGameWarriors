'use strict'

class Human {
	
	constructor() {
		let newName = getNewName(randomNumber(0, NAMES_COUNT - 1));
    	this.Name = newName;
 	 }

 	 MyName() {
 	 	return this.Name;
 	 }
}

