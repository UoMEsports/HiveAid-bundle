<template>
  <div>
    <h2><span class="coming-up-label">Coming Up: </span>{{ comingUpText }}</h2>
    <v-text-field
      v-model="newText"
      label="Coming Up Text"
      dark
    />
    <v-btn
      color="green"
      @click="setText"
    >
      Update Coming Up Text
    </v-btn>
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
    computed: {
        startStopContent() {
            return this.running ? 'STOP' : 'START';
	  },
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
    }
};
</script>

<style lang="scss" scoped>
.coming-up-label{
  font-style: italic;
  color: lightgrey;
}

</style>