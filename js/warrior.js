'use strict'

class Warrior extends Human {

	constructor(newLevel, newWarriorType) {
		super(false);									//вызов родительского конструктора
    	this.Level = newLevel;							//присвоение уровня
    	this.Type = getNewWarriorType(newWarriorType); 					//тип воина
 	 }

 	 MyName() { return super.MyName() }

 	 get Level() { return this._Level; }
 	 set Level(newLevel) { this._Level = newLevel; }

 	 get Type() { return this._Type; }
 	 set Type(newWarriorType) { this._Type = newWarriorType; }

 	 //Получение полной информации о воине
 	 warriorInfo() {
 	 	return '${this.MyName()} ${this.Type} ${this.Level}';
 	 }

 	 //поднятие уровня
 	 levelUp() { 
 	 	if (this.Level < MAX_WARRIOR_LEVEL)
 	 	{
 	 		this.Level++;
 	 	} 
 	 }

 	 //следовать за героем
 	 follow(hero) {
 	 	hero.addNewWarrior(this);
 	 }
}