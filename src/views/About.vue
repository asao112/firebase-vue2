<template>
  <div class="login-user">
    <ul>
      <li class="loginUser">
        <span>{{username}}さんようこそ</span>
        <span>残高 : {{myWallet}}</span>
        <button class="login-btn button is-info" @click="signOut">ログアウト</button>
      </li>
    </ul>
    <h1 class="title">ユーザー覧</h1>
    <div class="userName">
      <h4 class="subtitle1">ユーザ名</h4>
      <ul>
        <li class="userLists" v-for="(userDate, index) in users" v-bind:key="index">
          <span>{{userDate.name}}</span>
          <form class="userForm">
            <button type="button" class="userWallet" @click="openModel(userDate.uid)">walletを見る</button>
            <button type="button" class="moneyTransfer">送る</button>
          </form>
        </li>
      </ul>
    </div>
    <transition>
      <Model v-show="showContent" @click="closeModal" @open="showContent = true" @close="showContent = false"></Model>
    </transition>
  </div>
</template>
<script>
import Model from '../views/Model.vue'
export default {
  name: 'About',
  components: {
    Model
  },
  data() {
    return {
      showContent: false,
    }
  },
  computed: {
    username() {
      return this.$store.getters.setUsername
    },
    users() {
      return this.$store.getters.setUsers
    },
    myWallet() {
      return this.$store.getters.myWallet
    },
    uid() {
      return this.$store.getters.uid
    }
  },
  created() {
    this.$store.dispatch('setUser', {
      username: this.username,
    },)
  },
  methods: {
    openModel(uid) {
      this.showContent = true
      console.log(uid)
      this.$store.dispatch('setModel', uid)
    },    
    closeModal() {
      this.showContent = false
    },
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
};
</script>