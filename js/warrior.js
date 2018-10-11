'use strict'

class Warrior extends Human {

	constructor(newLevel, newWarriorType, hero) {
		super(false);									//вызов родительского конструктора
    	this.Level = newLevel;							//присвоение уровня
    	this.Type = getNewWarriorType(newWarriorType);	//тип воина
    	this.follow(hero); 								//Следовать за героем
 	 }

 	 MyName() { return super.MyName() }

 	 get Level() { return this._Level; }
 	 set Level(newLevel) { this._Level = newLevel; }

 	 get Type() { return this._Type; }
 	 set Type(newWarriorType) { this._Type = newWarriorType; }

 	 //Получение полной информации о воине
 	 warriorInfo() {
 	 	return `${this.MyName()} ${this.Type} ${this.Level}`;
 	 }

 	 //Получение полной информации о воине для вывода на странице
  	 warriorHtmlInfo() {
 	 	return `<span class="text--bold">${this.MyName()}</span> <span class="level-information">${this.Level}</span><br><span class="text--italic">${this.Type}</span>`;
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