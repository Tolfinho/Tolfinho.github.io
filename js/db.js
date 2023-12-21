import {
  addDoc,
  setDoc,
  collection,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

function createUser(db, userData) {}

function getUser(id) {
  return console.log('retorna usuario em questao com o id -> ' + id);
}

export default { createUser, getUser };
