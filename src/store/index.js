import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
//import { set } from 'vue/types/umd'
//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    myWallet: '500',
    users: [],
    email: '',
    password: '',
    loggedIn: false,
  },
  getters: {
    setUsername(state) {
      return state.username
    },
    setUsers(state) {
      return state.users
    },
    myWallet(state) {
      return state.myWallet
    },
  },
  mutations: {
    registerState(state, payload) {
      state.username = payload.username
      state.email = payload.email
      state.password = payload.password
    },
    loginState(state, payload) {
      state.username = payload.username
      state.email = payload.email
      state.password = payload.password
    },
  },
  actions: {
    setUser() {
      const db = firebase.firestore()
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.state.username = user.displayName
          db.collection('user').where(firebase.firestore.FieldPath.documentId(), '!=', user.uid).limit(5)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const userDate = {
                uid: doc.get('uid'),
                name: doc.data().username,
                myWallet: doc.data().myWallet
              }       
              this.state.users.splice(4,this.state.users.length)
              this.state.users.push(userDate) 
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        }
      });
    },
    signOut() {
      firebase.auth().signOut()
      .then(() => {
        console.log('ログアウトします');
      })
      .then(() => {
        router.push('/login')
      })
      .catch((e) => {
        console.error('エラー :', e.message)
      })
    },
    newRegister(context, payload) {
      firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        const user = firebase.auth().currentUser
        user.updateProfile({
          displayName: payload.username,
        },)
        .then(() => {
          // データベースへ登録
          const db = firebase.firestore();
          db.collection("user").doc(user.uid).set({
              uid: user.uid,
              email: payload.email,
              password: payload.password,
              username: payload.username,
              myWallet: this.state.myWallet
          })
        })
        .then(() => {
          context.commit('registerState', payload)
        })  
        .then(() => {
          router.push('/about')
        })})
      .catch((e) => {
        console.error('エラー :', e.message)
      })
    },
    loginUser(context, payload) {
      firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        context.commit('loginState', payload)
      })
      .then(() => {
        console.log('ログイン成功!');
        router.push('/about');
      })
      .catch((e) => {
        console.error('エラー :', e.message)
      })
    },
    /*
    setModel(context, payload) {
    }
    */
  },
})







