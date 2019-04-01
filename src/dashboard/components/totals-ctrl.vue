<template>
    <div class="totals-ctrl">
        <div id="toggles">
            <h5>Current Total:</h5>
            <h1>{{ total }}</h1>
            <div class="toggle">
                <nodecg-toggle
                    replicantName="autoUpdateTotal"
                    :toggleData="toggleData"
                ></nodecg-toggle>
            </div>
        </div>

        <v-dialog
            id="editDialog"
            v-model="dialog"
        >
            <template v-slot:activator="{ on }">
                <!--<v-btn
                    dark
                    v-on="on"
                >
                    Edit
                </v-btn-->
            </template>

            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                >
                    Edit Donation Total
                </v-card-title>

                <v-card-text>
                    <v-text-field
                        id="editTotalInput"
                        v-model="newTotal"
                        label="Donation Total"
                        type="number"
            
                        prepend-icon="remove"
                        append-outer-icon="add"
                        @click:prepend="decrement"
                        @click:append-outer="increment"
                    >
                    </v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        flat
                        @click="handleEditDialogConfirmed"
                    >
                        Accept
                    </v-btn>
                    <v-btn
                        color="primary"
                        flat
                        @click="dialog = false"
                    >
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-btn
            color="green"
            @click="sendDonation"
        >
            Send Donation
        </v-btn>
    </div>
</template>

<script>
const total = nodecg.Replicant('total');

export default {
    data() {
        return {
            total: null,
            newTotal: 0,
            dialog: false,
            toggleData: {
                text: {unchecked: 'autoupdate off', checked: 'autoupdate on'},
                color: {unchecked: 'red', checked: 'green'}
            }
        }
    },
    created() {
        total.on('change', newVal => {
            this.total = newVal.formatted;
        });
    },
    methods: {
        increment () {
            this.newTotal = parseInt(this.newTotal,10) + 1
        },
        decrement () {
            this.newTotal = parseInt(this.newTotal,10) - 1
        },
        handleEditDialogConfirmed () {
            this.dialog = false;
        },
        sendDonation() {
            nodecg.sendMessage('donation', {name: 'Dan Shields.', amount: '£10'})
        }
    }
}
</script>

