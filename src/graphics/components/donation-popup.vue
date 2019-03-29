<template>
    <h1>{{ donation }}</h1>
</template>

<script>
const countdownRep = nodecg.Replicant('countdown');
export default {
    data() {
        return {
            donation: "",
        };
    },
  
    created() {
        nodecg.listenFor('donation', this.newDonation);
    },

    methods: {
        newDonation(data) {
            var donation = data.name + " just donated " + data.formattedAmount;
            this.donation = donation;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../shared/style/main.scss';

h1 {
  color: $primary;
  font-size: 500px
}
</style>