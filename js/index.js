'use strict'

needRedirect();

/*
* HEADER
*/
let header = document.getElementById('header');

let registerForm = document.getElementById('registerForm');

let login = document.getElementById('login');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let team = document.getElementById('team');

let loginError = document.getElementById('login__error');
let emailError = document.getElementById('email__error');
let phoneError = document.getElementById('phone__error');
let teamError = document.getElementById('team__error');

const LOGIN_REGEX = /^[A-Za-z0-9_-\s]{2,14}$/g;
const EMAIL_REGEX = /^[0-9a-zA-Z-\._]{1,}@(([a-zA-Z0-9-]{1,}|[а-яА-Я0-9-]{1,})\.)+([a-zA-Z0-9]{2,}|[а-яА-Я0-9-]{2,})$/g;
const PHONE_REGEX = /^(\+380)\d{2}-\d{3}-\d{2}-\d{2}$/g;

const DOMAIN  = 'warriors.loc';

registerForm.addEventListener("submit", function(e) { actionLogin(e); } );

//Загрузка страницы
setTimeout(function() { 
		header.style.opacity = 1;
		showError(loginError, false);
		showError(emailError, false);
		showError(phoneError, false);
		showError(teamError, false);
	 }, 500);


//Отображение ошибок
function showError(field, show)
{
	if (show)
	{
		field.style.display = 'block';
	}
	else
	{
		field.style.display = 'none';
	}
}

//Попытка входа
function actionLogin(e)
{
	e.preventDefault();

	let errors = [];

	if (login.value.match(LOGIN_REGEX) == null)
	{
		errors.push(loginError);
	}
	else { showError(loginError, false); }

	if (email.value.match(EMAIL_REGEX) == null)
	{
		errors.push(emailError);
	}
	else { showError(emailError, false); }

	if (phone.value.match(PHONE_REGEX) == null)
	{
		errors.push(phoneError)
	}
	else { showError(phoneError, false); }

	if (team.value == '')
	{
		errors.push(teamError);
	}
	else { showError(teamError, false); }

	if (errors.length > 0)
	{
		errors.forEach(function(item) 
		{
			showError(item, true);
		});
	}
	else
	{
		let options = [];

		let fields = registerForm.elements; //получение всех полей в форме

		for (let i = 0; i < fields.length; i++) {

			if (fields[i].name != '')
			{
				options[fields[i].name] = fields[i].value; //запись в переменную значений полей
			}
		}
		setCookies(options); //установка cookie

		needRedirect();
	}
}

//Запись куки
function setCookies(options)
{
	let cookiesString = '';
	let domain = 'domain=' + DOMAIN;
	let expires = new Date(Date.now()+ 30 * 60 *1000).toUTCString(); //куки хранятся 30 минут
	document.cookie=domain + ';' + 'expires=' + expires + ';';
	for(let key in options)
	{
		let val = encodeURIComponent(options[key]);
		cookiesString = key + '=' + val + ';' + 'expires=' + expires + ';';
		document.cookie = cookiesString;
	}
}

//Получение куки
function getCookie() {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )"
  ));

  let res = undefined;

  if (matches.input != '')
  {
  	res = [];
  	let str = decodeURIComponent(matches.input);
  	let keyValue = str.split('; ');
  	for(let key in keyValue)
  	{
  		let cookie = keyValue[key].split('=');
  		res[cookie[0]] = cookie[1];
  	}
  }
  return res;
}

//редирект на страницу игры
function needRedirect()
{
	if (getCookie() != undefined)
	{
		if(localStorage.getItem('login'))
		{
			window.location.replace('game.html');
		}	
	}
}