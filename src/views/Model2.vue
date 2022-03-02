<template>
  <div id="overlay" v-show="showContent2">
    <div id="content">
      <p>あなたの残高：{{val.myWallet}}</p>
      <p>送る金額</p>
      <input type="number" class="text"  v-model.number="sendWallet" />
      <p><button @click="closeModal2(val)" class="modal-button">送信</button></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Model2',
  props: ['val'],
  data() {
    return {
      showContent2: false,
      sendWallet: '',
    };
  },
  methods: {
    openModal2() {
      this.$emit("open", this.showContent2);
    },
    closeModal2(val) {
      console.log(val)
      this.$store.dispatch('sendModel', {
        sendWallet: this.sendWallet,
        val
      });
      this.$emit("close", this.showContent2);
    },
  },
};
</script>