<template>
  <div class="login-user">
    <ul>
      <li class="userList">{{username}}さんようこそ</li>
      <span class="balance">残高 : 1000</span>
      <button class="login-btn button is-info" @click="signOut">ログアウト</button>
    </ul>
    <h1 class="title">ユーザー覧</h1>
    <div class="userName">
      <h4 class="subtitle1">ユーザ名</h4>
      <form class="userlist">
        <ul>
          <li class="userList" v-for="userName in usernames" :key="userName">
            <span>{{ userName }}</span>
            <button class="userButton">walletを見る</button>
            <button>送る</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    username() {
      return this.$store.getters.setUsername
    },
    usernames() {
      return this.$store.getters.setUsers
    }
  },
  created() {
    this.$store.dispatch('setUser', {
      username: this.username,
      usernames: this.usernames
    },)
    console.log(this.username)
    console.log(this.usernames)
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut', {
        displayName: this.username
      })
    }
  },
};
</script>