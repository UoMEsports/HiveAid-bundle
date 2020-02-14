<template>
    <div>
        <h1>{{ countdown }}</h1>
    </div>
</template>

<script>
const countdownRep = nodecg.Replicant('countdown');

export default {
    data() {
        return {
            countdown: "0:00"
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
            countdownText.on('change', newVal => {
                var reformattedtime = newVal.formatted.slice(0, newVal.formatted.length-2);
                this.countdown = reformattedtime;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../shared/style/main.scss';

h1, h2 {
    color: white;
    text-align: center;
}

h1 {
    font-size: 150px;
    text-shadow: 5px 5px 20px black;
}

h2 {
    font-size: 100px;
    text-shadow: 3px 3px 15px black;
}

</style>

