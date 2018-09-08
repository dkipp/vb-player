import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

/**
 * from:
 * https://medium.com/@amenallah.hsoumi/building-a-progressive-quiz-app-with-vue-vuex-and-firestore-part-1-ce73c7ba695d
 */

firebase.initializeApp({
  apiKey: 'paste your own',
  authDomain: 'paste your own',
  databaseURL: 'paste your own',
  projectId: 'paste your own',
  storageBucket: 'paste your own',
  messagingSenderId: 'paste your own',
});

export default firebase;
