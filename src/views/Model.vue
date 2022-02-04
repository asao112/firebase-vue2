<template>
  <div id="overlay" v-show="showContent">
    <div id="content">
      <div class="userLists" v-for="(userDate, index) in walletDates" :key="index" >
      <p>{{userDate.name}}さんの残高</p>
      <p>{{myWallet}}</p>
      </div>
        <p>
          <button @click="closeModal" class="modal-button">close</button>
        </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showContent: false,
    };
  },
  computed: {
    walletDates() {
      return this.$store.getters.walletDate
    },
    myWallet() {
      return this.$store.getters.myWallet
    },
    uid() {
      return this.$store.getters.uid
    },
  },
  methods: {
    openModal() {
      this.$emit("open", this.showContent);
    },
    closeModal() {
      this.$emit("close", this.showContent);
    },
  },
};
</script>

  