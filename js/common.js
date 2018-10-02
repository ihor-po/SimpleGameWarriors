'use strict'

const NAMES_COUNT = 10;
const MIN_ARMY_STRENGTH = 4;
const MAX_ARMY_STRENGTH = 10;

let names = ['Перун', 'Хорс', 'Дажьбог', 'Стрибог', 'Семаргл', 'Мокошь', 'Велес', 'Рожаницы и Род', 'Сварог', 'Сварожич'];

function randomNumber(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function getNewName(i)  { return names[i]; }