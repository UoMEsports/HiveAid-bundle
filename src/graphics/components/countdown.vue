<template>
  <div>
    <h1 class="somthingsensible">{{countdown}}</h1>
  </div>
</template>

<script>
const countdownRep = nodecg.Replicant('countdown');
export default {
	data() {
		return {
			countdown: "0:00",
		};
  },
  
	created() {
		NodeCG.waitForReplicants(countdownRep).then(this.listen);
  },

  methods: {
    listen() {
      countdownRep.on('change', newVal => {
        var reformattedtime = newVal.formatted.slice(0, newVal.formatted.length-2);
        this.countdown = reformattedtime;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../shared/style/main.scss';
.somthingsensible{
  color: $primary;
  font-size: 500px
}
</style>

