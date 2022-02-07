<template>
  <div id="overlay" v-show="showContent">
    <div id="content">
      <p>{{val.name}}さんの残高</p>
      <p>{{val.myWallet}}</p>
      <p>
        <button @click="closeModal" class="modal-button">close</button>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Model',
  props: ['val'],
  data() {
    return {
      showContent: false,
    };
  },
  computed: {
    myWallet() {
      return this.$store.getters.myWallet
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

  