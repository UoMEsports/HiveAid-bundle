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
    text-align: center;
    text-shadow: 2px 2px 10px black;

    position: fixed;
    width: 1920px;
    top: 675px;
    
}

h2 {
    color: white;
    text-align: center;
    text-shadow: 3px 3px 15px black;
    font-size: 100px;

    position: fixed;
    width: 1920px;
    top: 690px;

}

#countdown {
    margin-top: 500px;
    width: 100%;
}
</style>
