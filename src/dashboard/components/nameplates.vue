<template>
    <div>
        <h2><span class="label">Current Names<br></span><span class="names">1. {{ Name1 }}<br>2. {{ Name2 }}<br>3. {{ Name3 }}<br>4. {{ Name4 }}</span></h2>
        <br>
        <h2>Names of Guests<br>(leave blank for no guest)</h2>
        <v-text-field
            v-model="newName1"
            label="Name 1"
            dark
        ></v-text-field>
        <v-text-field
            v-model="newName2"
            label="Name 2"
            dark
        ></v-text-field>
        <v-text-field
            v-model="newName3"
            label="Name 3"
            dark
        ></v-text-field>
        <v-text-field
            v-model="newName4"
            label="Name 4"
            dark
        ></v-text-field>
        <v-btn
            color="green"
            @click="setNames"
        >
            Update the Names
        </v-btn>
    </div>
</template>

<script>
const names = nodecg.Replicant('names');

export default {
    data() {
        return {
            Name1:'',
            Name2:'',
            Name3:'',
            Name4:''
        };
    },
    created() {
        NodeCG.waitForReplicants(names).then(this.listen);
    },
    methods: {
        listen() {
            names.on('change', newVal => {
                this.Name1 = newVal.name1;
                this.Name2 = newVal.name2;
                this.Name3 = newVal.name3;
                this.Name4 = newVal.name4;
            });
        },
        showNameplates() {
            NodeCG.sendmessage('showNameplates');
        },
        setNames() {
            const namesobj = {
                name1: this.newName1,
                name2: this.newName2,
                name3: this.newName3,
                name4: this.newName4}
            names.value = {
                noOfNames: Object.keys(namesobj).filter((key) => namesobj[key] !== undefined && namesobj[key].length > 0).length,
                ...namesobj
            }
            this.newName1 = "";
            this.newName2 = "";
            this.newName3 = "";
            this.newName4 = "";
        }
    }
};
</script>

<style lang="scss" scoped>
.label{
  font-style: italic;
  color: lightgrey;
}
.names {
  font-style: normal;
  font-size: 15px
  
}

</style>