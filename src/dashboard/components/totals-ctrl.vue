<template>
    <div class="totals-ctrl">
        <div id="toggles">
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
                <v-btn
                    dark
                    v-on="on"
                >
                    Edit
                </v-btn>
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
                        v-model="total"
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 0,
            dialog: false,
            toggleData: {
                text: {unchecked: 'autoupdate off', checked: 'autoupdate on'},
                color: {unchecked: 'red', checked: 'green'}
            }
        }
    },
    methods: {
        increment () {
            this.total = parseInt(this.total,10) + 1
        },
        decrement () {
            this.total = parseInt(this.total,10) - 1
        },
        handleEditDialogConfirmed () {
            this.dialog = false;

        }
    }
}
</script>

