<template>
    <div class="starting">
        <h1>Up Next:</h1>
        <h2>{{ upNext }}</h2>
        <Countdown id="countdown"></Countdown>
    </div>
</template>

<script>
import Countdown from './countdown';

const comingUp = nodecg.Replicant('comingUp');

export default {
    components: {
        Countdown
    },

    data() {
        return {
            upNext: ''
        };
    },
    
    created() {
        NodeCG.waitForReplicants(comingUp).then(this.listen);
    },

    methods: {
        listen() {
            comingUp.on('change', newVal => {
                this.upNext = newVal;
            });
        }
    }

    
}
</script>

<style scoped>
@import '../../../shared/style/main.scss';

h1 {
    color: white;
    position: fixed;
    width: 1920px;
    text-align: center;
    top: 675px;
    text-shadow: 2px 2px 10px black;
}

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
