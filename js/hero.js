'use strict'

class Hero extends Human {

	constructor(newLevel, newArmyStrength) {
		super();										//вызов родительского конструктора
    	this.Level = newLevel;							//присвоение уровня
    	this.ArmyStrength = newArmyStrength; 			//численность войска
    	this.PowerIndex = newLevel * newArmyStrength;
 	 }

 	 MyName() { return super.MyName() }

 	 get Level() { return this._Level; }
 	 set Level(newLevel) { this._Level = newLevel; }

 	 get ArmyStrength() { return this._ArmyStrength; }
 	 set ArmyStrength(newArmyStrength) { this._ArmyStrength = newArmyStrength; }

 	 get PowerIndex() { return this._PowerIndex; }
 	 set PowerIndex(newPowerIndex) { this._PowerIndex = newPowerIndex }

 	 //изменеие индекса силы
 	 updatePowerIndex() { 
 	 	this.PowerIndex = this.Level * this.ArmyStrength; 
 	 }

 	 //поднятие уровня
 	 levelUp() { 
 	 	this.Level++;
 	 	this.updatePowerIndex(); 
 	 }

 	 atack(enemy)
 	 {
 	 	if (this.PowerIndex > enemy.PowerIndex)
 	 	{
 	 		return 1;
 	 	}
 	 	else if (this.PowerIndex < enemy.PowerIndex)
 	 	{
 	 		return 0;
 	 	}
 	 	else
 	 	{
 	 		return -1;
 	 	}
 	 }
}