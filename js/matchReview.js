import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

import { auth, db } from '../index.js';

window.addEventListener('load', async (e) => {
  let placarGlobal = [];

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const score = parseInt(urlParams.get('score'));
  const dificuldade = urlParams.get('dificuldade');

  const scoreDiv = document.getElementById('matchScore');
  scoreDiv.innerHTML = `Pontuação: ${score}`;

  let highscore = localStorage.getItem('highscore');

  if (highscore === null || score > parseInt(highscore)) {
    localStorage.setItem('highscore', score);
    highscore = score;
  }

  //console.log('Score -> ' + score);
  //console.log('Recorde -> ' + highscore);

  if (localStorage.getItem('user') !== 'none') {
    const uid = localStorage.getItem('user');

    // Altera o highscore do usuário atual, caso a sua pontuação atual seja maior
    const user = await getDoc(doc(db, 'users', uid));
    if (user.exists()) {
      var data = user.data();

      switch (dificuldade) {
        case 'facil':
          if (score > data.highscores.easy) data.highscores.easy = score;
          break;
        case 'medio':
          if (score > data.highscores.medium) data.highscores.medium = score;
          break;
        case 'dificil':
          if (score > data.highscores.hard) data.highscores.hard = score;
          break;
      }

      await updateDoc(doc(db, 'users', uid), data);
    } else {
      console.log('Usuário não encontrado!');
    }
  } else {
    alert(
      'Como você não está autenticado, não vai poder salvar seu progresso no placar Global. Autentique-se e alcance o TOP 1!'
    );
  }

  // Mostra o placar global
  const docsSnapshot = await getDocs(collection(db, 'users'));

  await docsSnapshot.forEach((doc) => {
    let docData = doc.data();
    let dataScore;

    switch (dificuldade) {
      case 'facil':
        dataScore = docData.highscores.easy;
        break;
      case 'medio':
        dataScore = docData.highscores.medium;
        break;
      case 'dificil':
        dataScore = docData.highscores.hard;
        break;
    }

    if (dataScore > 0) {
      placarGlobal.push({
        username: docData.username,
        score: dataScore,
      });
    }
  });

  var placarAux = [];

  console.log(placarGlobal);

  // order placarGlobal Array, DESC
  do {
    var maior, maiorIndex;

    for (var i = 0; i < placarGlobal.length; i++) {
      if (i === 0) {
        maior = placarGlobal[i];
        maiorIndex = i;
      } else if (maior.score < placarGlobal[i].score) {
        maior = placarGlobal[i];
        maiorIndex = i;
      }
    }

    placarAux.push(maior);
    placarGlobal.splice(maiorIndex, 1);
  } while (placarGlobal.length > 0);

  renderPlacarGlobal();

  function renderPlacarGlobal() {
    const placarGlobalList = document.getElementById('placarGlobal-list');

    placarAux.map((item, index) => {
      var div = document.createElement('div');
      var div1 = document.createElement('div');
      var div2 = document.createElement('div');
      var div3 = document.createElement('div');

      var textNode = document.createTextNode(index + 1);
      div1.appendChild(textNode);
      var textNode = document.createTextNode(item.username);
      div2.appendChild(textNode);
      var textNode = document.createTextNode(item.score);
      div3.appendChild(textNode);
      div.appendChild(div1);
      div.appendChild(div2);
      div.appendChild(div3);
      div.classList.add('placarGlobal-line');
      placarGlobalList.appendChild(div);
    });
  }

  function playAgain() {}
});
