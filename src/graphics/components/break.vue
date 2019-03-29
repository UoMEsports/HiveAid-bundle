<template>
    <div class="starting">
        <h1>Up Next:</h1>
        <Countdown id="countdown"></Countdown>
    </div>
</template>

<script>
import Countdown from './countdown';

export default {
    components: {
        Countdown
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

#countdown {
    margin-top: 500px;
    width: 100%;
}
</style>
