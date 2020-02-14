<template>
    <div>
        <h2><span class="label">On now: </span>{{ onNowText }}</h2>
        <v-text-field
            v-model="newOnNow"
            label="On Now Text"
            dark
        ></v-text-field>
        <v-btn
            color="green"
            @click="setOnNow"
        >
            Update On Now Text
        </v-btn>

        <br>
        <br>
        <hr>
        <br>
        <br>

        <h2><span class="label">Coming Up: </span>{{ comingUpText }}</h2>
        <v-text-field
            v-model="newComingUp"
            label="Coming Up Text"
            dark
        ></v-text-field>
        <v-btn
            color="green"
            @click="setComingUp"
        >
            Update Coming Up Text
        </v-btn>
    </div>
</template>

<script>
const comingUp = nodecg.Replicant('comingUp');
const onNow = nodecg.Replicant('onNow');

export default {
    data() {
        return {
            comingUpText: '',
            onNowText: '',
            newComingUp: '',
            newOnNow: ''
        };
    },
    created() {
        NodeCG.waitForReplicants(comingUp).then(this.listen);
    },
    methods: {
        listen() {
            comingUp.on('change', newVal => {
                this.comingUpText =  newVal;
            });
            onNow.on('change', newVal => {
                this.onNowText =  newVal;
            });
        },
        setComingUp() {
            comingUp.value = this.newComingUp;
            this.newComingUp = "";
        },
        setOnNow() {
            onNow.value = this.newOnNow;
            this.newOnNow = "";
        }
    }
};
</script>

<style lang="scss" scoped>
.label{
  font-style: italic;
  color: lightgrey;
}

</style>