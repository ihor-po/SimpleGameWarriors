'use strict'

class Hero extends Human {

	constructor(newLevel, newArmyStrength, skin) {
		super(true);									//вызов родительского конструктора
    	this.Level = newLevel;							//присвоение уровня
    	this.ArmyStrength = newArmyStrength; 			//численность войска
    	this.PowerIndex = newLevel * newArmyStrength;	//Индекс силы героя
    	this.HerosArmy =[];								//армия героя
    	this.Skin = skin;								//картинка героя
 	 }

 	 MyName() { return super.MyName() }

 	 get Level() { return this._Level; }
 	 set Level(newLevel) { this._Level = newLevel; }

 	 get ArmyStrength() { return this._ArmyStrength; }
 	 set ArmyStrength(newArmyStrength) { this._ArmyStrength = newArmyStrength; }

 	 get PowerIndex() { return this._PowerIndex; }
 	 set PowerIndex(newPowerIndex) { this._PowerIndex = newPowerIndex }

 	 get Skin() { return this._Skin; }
 	 set Skin(skin) { this._Skin = skin }

 	 //изменеие индекса силы
 	 updatePowerIndex() { 
 	 	this.PowerIndex = this.Level * this.ArmyStrength; 
 	 }

 	 //поднятие уровня
 	 levelUp() { 
 	 	if (this.Level < MAX_HERO_LEVEL) 
 	 	{
 	 		this.Level++;
 	 		this.updatePowerIndex(); 
 	 	}
 	 }

 	 //атака врага
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

 	 //Добавление нового воина в войско
 	 addNewWarrior(newWarrior) {
 	 	if (this.HerosArmy.length < this.ArmyStrength)
 	 	{
 	 		this.HerosArmy.push(newWarrior);
 	 	}
 	 }
}