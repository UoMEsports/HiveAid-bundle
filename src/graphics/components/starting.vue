<template>
    <div class="starting">
        <Countdown id="countdown"></Countdown>
        <h2>{{ countdownText }}</h2>
    </div>
</template>

<script>
import Countdown from './countdown';

const countdownText = nodecg.Replicant('countdownText');

export default {
    components: {
        Countdown
    },

    data() {
        return {
            countdownText: ""
        };
    },
  
    created() {
        NodeCG.waitForReplicants(countdownText).then(this.listen);
    },

    methods: {
        listen() {
            countdownText.on('change', newVal => {
                this.countdownText = newVal;
            });
        }
    }
}
</script>

<style scoped>
@import '../../../shared/style/main.scss';
h2 {
    color: white;
    text-align: center;
    font-size: 100px;
    text-shadow: 3px 3px 15px black;
}
#countdown {
    margin-top: 500px;
    width: 100%;
}
</style>
