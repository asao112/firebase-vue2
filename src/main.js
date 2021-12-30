import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';
import '@firebase/auth';

Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIZ2PWK2_0BOJltE3BAqCv6hici2FQnpo",
  authDomain: "vueis-d5266.firebaseapp.com",
  projectId: "vueis-d5266",
  storageBucket: "vueis-d5266.appspot.com",
  messagingSenderId: "108763436197",
  appId: "1:108763436197:web:1fd3e3088939724b69e94c",
  measurementId: "G-LK31PBZQ4R"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

