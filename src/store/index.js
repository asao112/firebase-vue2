import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    users: [],
    email: '',
    password: '',
    sendWallet: '',
    loggedIn: false,
    myWallet: ''
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
      state.myWallet = payload.myWallet
    },
    loginState(state, payload) {
      state.email = payload.email
      state.password = payload.password
      state.myWallet = payload.myWallet
    },
    sendModel(state, payload) { 
      state.sendWallet = payload.sendWallet
      state.myWallet = payload
    },
  },
  actions: {
    setUser() {
      this.state.users = []
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
                myWallet: doc.get('myWallet'),
              }  
              this.state.users.splice(4,this.state.users.length)
              this.state.users.push(userDate)
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        }
      })
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
              myWallet: 500
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
        const user = firebase.auth().currentUser
        const sfDocRef = firebase.firestore().collection('user').doc(user.uid)
        sfDocRef.get().then((doc) => {
            if (doc.exists) {
              context.commit('loginState', doc);
            } else {
              console.log('No such document!');
            }
          })
      })
      .then(() => {
        console.log('ログイン成功!');
        router.push('/about');
      })
      .catch((e) => {
        console.error('エラー :', e.message)
      })
    },
    sendModel(context, payload) {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      const sfDocRef = db.collection('user').doc(user.uid);
      return db.runTransaction((transaction) => {
        return transaction.get(sfDocRef).then((sfDoc) => {
          console.log(sfDoc.data().myWallet)
          console.log(this.state.myWallet)
          const sendWallets = sfDoc.data().myWallet - payload.sendWallet
          transaction.update(sfDocRef, { myWallet: sendWallets })
          console.log(this.state.myWallet)
          context.commit('sendModel', sendWallets)
          console.log(this.state.myWallet)
          console.log(sendWallets)

        })
      })
    }
  },
  plugins: [createPersistedState({key: 'anyGreatApp'})] 
})







