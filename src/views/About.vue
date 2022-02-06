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
            <button type="button" class="userWallet" @click="openModel(userDate)">walletを見る</button>
            <button type="button" class="moneyTransfer">送る</button>
          </form>
        </li>
      </ul>
    </div>
    <transition>
      <Model :val="dateItem" v-show="showContent" @click="closeModal" @open="showContent = true" @close="showContent = false"></Model>
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
      dateItem: []
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
  },
  created() {
    this.$store.dispatch('setUser', {
      username: this.username,
    },)
  },
  methods: {
    openModel(userDate) {
      this.showContent = true
      this.dateItem = userDate
      console.log(userDate)
      //this.$store.dispatch('setModel', userDate)
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