<template>
    <div class="starting">
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
#countdown {
    margin-top: 500px;
    width: 100%;
}
</style>
