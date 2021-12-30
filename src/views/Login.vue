<template>
  <div class="user">
    <h1 class="title">ログイン画面</h1>
    <form>
      <ul>
        <li>
          <label for="email">メールアドレス</label>
          <input type="email" id="email" placeholder="E-mail" v-model="email" />
        </li>
        <li>
          <label for="password">パスワード</label>
          <input type="password" id="password" placeholder="PassWord" v-model="password" />
        </li>
      </ul>
    </form>
    <button class="button is-info is-outlined" @click="loginUser">ログイン</button>
    <br />
    <router-link to="/">新規登録はこちらから</router-link> 
  </div>
</template>
<script>
export default {
  name: 'singin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch('loginUser', {
        email: this.email, 
        password: this.password
      })
    }
  }
};
</script>