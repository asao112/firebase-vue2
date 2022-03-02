<template>
  <div class="login-user">
    <ul>
      <li class="loginUser">
        <span>{{username}}さんようこそ</span>
        <span >残高 : {{myWallet}}</span>
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
            <button type="button" class="moneyTransfer" @click="openModel2(userDate)">送る</button>
          </form>
        </li>
      </ul>
    </div>
    <transition>
      <Model :val="dateItem" v-show="showContent" @click="closeModal" @open="showContent = true" @close="showContent = false"></Model>
    </transition>
    <transition>
      <Model2 :val="dateItem" v-show="showContent2" @click="closeModel2" @open="showContent2 = true" @close="showContent2 = false"></Model2>
    </transition>
  </div>
</template>
<script>
import Model from '../views/Model.vue'
import Model2 from '../views/Model2.vue'
export default {
  name: 'About',
  components: {
    Model,
    Model2
  },
  data() {
    return {
      showContent: false,
      showContent2: false,
      dateItem: [],
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
    }
  },
  created() {
    console.log(this.myWallet);
    this.$store.dispatch('setUser', {
      username: this.username,
    },)
  },
  methods: {
    openModel(userDate) {
      this.showContent = true
      this.dateItem = userDate
      console.log(userDate)
    },    
    openModel2(userDate) {
      this.showContent2 = true
      this.dateItem = userDate,
      console.log(userDate)
    },
    closeModal() {
      this.showContent = false
    },
    closeModel2() {
      this.showContent2 = false
    },
    signOut() {
      this.$store.dispatch('signOut')
    }
  }
};
</script>