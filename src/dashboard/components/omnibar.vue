<template>
  <div>
    <h2><span class="coming-up-label">Coming Up: </span>{{ comingUpText }}</h2>
	  <v-text-field label="Coming Up Text" dark v-model="newText"></v-text-field>
    <v-btn @click="setText" color="green">Update Coming Up Text</v-btn>
  </div>
</template>

<script>
const comingUp = nodecg.Replicant('comingUp');

export default {
  data() {
    return {
      comingUpText: '',
      newText: ''
    };
  },
  created() {
    NodeCG.waitForReplicants(comingUp).then(this.listen);
  },
  methods: {
    listen() {
      comingUp.on('change', newVal => {
        this.comingUpText =  newVal;
      });
	  },
  	setText() {
      comingUp.value = this.newText;
      this.newText = "";
  	}
  },
  computed: {
    startStopContent() {
      return this.running ? 'STOP' : 'START';
	  },
  }
};
</script>

<style lang="scss" scoped>
.coming-up-label{
  font-style: italic;
  color: lightgrey;
}

</style>