import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    userNames: [],
    email: '',
    password: '',
  },
  getters: {
    setUsername(state) {
      return state.username
    },
    setUsers(state) {
      return state.userNames
    }
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
    setUser(state, payload) {
      state.username = payload.username
    }
    
  },
  actions: {
    setUser(context, payload) {
      const db = firebase.firestore()
      firebase.auth().onAuthStateChanged((username) => {
        payload.username = username.displayName;
      })
      db.collection('user').orderBy('namber', 'desc').limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.get('username'))
          this.state.userNames.push(doc.get('username')) 
          console.log(this.state.userNames)
        });
      })
      .then(() => {
        context.commit('setUser', payload)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      console.log(this.state.userNames)
    },
    signOut(context, payload) {
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

      context.commit('setUser', payload)
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
              namber: firebase.firestore.Timestamp.fromDate(new Date())
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
    }
  },
})







