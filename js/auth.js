import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

import {
  addDoc,
  setDoc,
  collection,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

import { auth, db } from '../index.js';

/*
 *   COMPONENTS
 */

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const buttonBackground = document.getElementById('buttonBackground');

const registerBtn = document.getElementById('registerBtn');
registerBtn.addEventListener('click', (e) => {
  registerBtn.classList.add('active');
  loginBtn.classList.remove('active');
  registerForm.classList.remove('hide');
  loginForm.classList.add('hide');
  buttonBackground.classList.add('register');
  buttonBackground.classList.remove('login');
});

const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', (e) => {
  registerBtn.classList.remove('active');
  loginBtn.classList.add('active');
  registerForm.classList.add('hide');
  loginForm.classList.remove('hide');
  buttonBackground.classList.add('login');
  buttonBackground.classList.remove('register');
});

const registerSubmitBtn = document.getElementById('registerSubmitBtn');
registerSubmitBtn.addEventListener('click', (e) => register(e));

const loginSubmitBtn = document.getElementById('loginSubmitBtn');
loginSubmitBtn.addEventListener('click', (e) => login(e));

/*
 *   AUTH FUNCTIONS
 */

async function register(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('passwordRegister').value;

  var obj = {
    username,
    email,
    password,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((userCredentials) => {
      alert('Conta criada com sucesso!');
      console.log(userCredentials.user.uid);

      const userData = {
        username: obj.username,
        email: obj.email,
        highscores: {
          easy: 0,
          medium: 0,
          hard: 0,
        },
      };

      setDoc(doc(db, 'users', userCredentials.user.uid), userData);
    })
    .catch((error) => {
      alert('Algo deu errado ao criar sua conta...');
      console.log(error);
    });
}

function login(e) {
  e.preventDefault();
  console.log('entrei');
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
}
