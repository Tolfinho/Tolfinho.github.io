// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQKM7JyXMjiF4eqa-qEECZjzidWM1yqHw',
  authDomain: 'aimtraining-8ce9c.firebaseapp.com',
  databaseURL: 'https://aimtraining-8ce9c-default-rtdb.firebaseio.com',
  projectId: 'aimtraining-8ce9c',
  storageBucket: 'aimtraining-8ce9c.appspot.com',
  messagingSenderId: '1064146639667',
  appId: '1:1064146639667:web:d5be71c400f2537bef7c46',
  measurementId: 'G-FGEBTEGBPS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

function onAuthChanged() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      localStorage.setItem('user', uid);
      console.log('auth changed -> sign in');
    } else {
      // User is signed out
      console.log('auth changed -> sign out');
      localStorage.setItem('user', 'none');
    }
  });
}
onAuthChanged();

function signOutUser() {
  signOut(auth)
    .then(() => alert('usuário deslogado'))
    .catch((error) => alert('erro ao deslogar usuário'));
}

function getCurrentUser() {
  return localStorage.getItem('user');
}

window.addEventListener('load', () => {
  /*
   *   VARIABLES
   */
  let modo = null;
  let dificuldade = null;

  /*
   *   COMPONENTS
   */
  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener('click', (e) => showGamemodeForm(e));

  const linkToGame = document.getElementById('linkToGame');
  linkToGame.addEventListener('click', (e) => startGame(e));

  const modoElement = document.getElementById('modo');
  modoElement.addEventListener('change', (e) => (modo = e.target.value));

  const dificuldadeElement = document.getElementById('dificuldade');
  dificuldadeElement.addEventListener(
    'change',
    (e) => (dificuldade = e.target.value)
  );
  const gamemodeForm = document.getElementById('gamemodeForm');

  const signOutBtn = document.getElementById('signOutBtn');
  signOutBtn.addEventListener('click', (e) => {
    signOutUser();
  });

  function showGamemodeForm(e) {
    e.preventDefault();
    playBtn.classList.toggle('hide');
    gamemodeForm.classList.toggle('hide');
  }

  function startGame(e) {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = `./pages/jogo.html?modo=${modo}&dificuldade=${dificuldade}`;
    a.click();
  }
});
