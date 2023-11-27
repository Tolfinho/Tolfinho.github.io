import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

import { auth } from '../index.js';

/*
 *   COMPONENTS
 */

const registerBtn = document.getElementById('registerBtn');
registerBtn.addEventListener('click', (e) => register(e));

const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', (e) => login(e));

/*
 *   AUTH FUNCTIONS
 */

function register(e) {
  e.preventDefault();

  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;

  var obj = {
    email,
    password,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((success) => {
      alert('Conta criada com sucesso!');
    })
    .catch((error) => {
      alert('Algo deu errado ao criar sua conta...');
    });
  console.log('registrando');
}

function login(e) {
  e.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;

  var obj = {
    email,
    password,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then((success) => {
      alert('Usuário logado com sucesso');
    })
    .catch((error) => {
      alert('algo du errado ao logar');
    });

  console.log('logando');
}

function getCurrentUser() {
  return localStorage.getItem('user');
}
