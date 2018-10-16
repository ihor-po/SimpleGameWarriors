'use strict'

/*
* HEADER
*/
let header = document.getElementById('header');

/*
* HEADER TITLE
*/
let headerTitle = document.getElementById('headerTitle');
header.addEventListener('transitionend', function() { rotateTitle(); } )
/*
* FIGHT SECTION
*/
let fightSection = document.getElementById('fightSection');
fightSection.addEventListener('transitionend', function() { friendEnemySidesShow(); } )

/*
* FIGHT SECTION FRIEND / ENEMY HERO SIDE
*/
let friendSide = document.getElementById('friendSide');
let enemySide = document.getElementById('enemySide');

/*
* CHAT SECTION
*/
let sectionChat = document.getElementById('sectionChat');
let chatForm = document.getElementById('chatForm');
sectionChat.addEventListener('transitionend', function() { chatForm.style.opacity = 1; })

/* ======================================================================================= */

setTimeout(function() { loadPage() }, 1000);


function loadPage(){
	header.style.opacity = 1;

	fightSection.style.width = '100%';
	fightSection.style.borderColor = 'rgba(99, 99, 99, 1)';

	sectionChatShow();
}

function sectionChatShow() {
	sectionChat.style.opacity = 1;
	sectionChat.style.width = '40rem';
	sectionChat.style.left = 'calc(50% - 20rem)';
	sectionChat.style.borderColor = 'rgba(9, 63, 162, 1)';
}

function friendEnemySidesShow() {
	friendSide.style.opacity = 1;
	enemySide.style.opacity = 1;
	friendSide.style.width = '50%';
	enemySide.style.width = '50%';
	friendSide.style.left = '0';
	enemySide.style.left = '0';
}

function rotateTitle() {
	headerTitle.style.transform = 'rotateY(360deg)';
	headerTitle.style.opacity = 0.5;
	headerTitle.style.opacity = 1;
}