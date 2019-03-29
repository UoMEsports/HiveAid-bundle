<template>
    <div>
        <h2>Minutes</h2>
        <number-input
            v-model="mins"
            :min="0"
            :max="60"
            inline
            controls
            rounded
        ></number-input>
        <h2>Seconds</h2>
        <number-input
            v-model="seconds"
            :min="0"
            :max="59"
            inline
            controls
            rounded
            :step="10"
        ></number-input>
    </div>
</template>

<script>
const countdownRep = nodecg.Replicant('countdownNext');
export default {
    data () {
        return {
            mins: 10,
            seconds: 0
        }
    },
    created() {
        document.addEventListener('dialog-confirmed', () => {
            let time = (this.mins * 60) + this.seconds;
            countdownRep.value = time;
        });
    }
};
</script>
<style lang="scss" scoped>
* {
  color: black;
}
h2 {
  color: white;
}
</style>
