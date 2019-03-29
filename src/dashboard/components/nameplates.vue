Skip to content
 
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@fill30 Sign out
This repository has been archived by the owner. It is now read-only.
3
4 0 UoMEsports/KotN-Graphics-Bundle
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights
KotN-Graphics-Bundle/src/dashboard/lower-third/desk-ctrl.vue
@Dan-Shields Dan-Shields Add AGPL notices to all src files
c299241 on 3 Dec 2018
149 lines (133 sloc)  3.69 KB
    
<!-- Copyright (C) 2018 Daniel Shields
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
    <v-container
        fluid
        grid-list-lg
    >
        <v-layout
            row
            wrap
        >
            <v-flex xs12>
                <v-card
                    class="current"
                    dark
                >
                    <h4 class="text">
                        Name1
                    </h4>
                    <h1 
                        v-if="name1"
                        class="text"
                    >
                        {{ name1.fullName }}
                    </h1>
                </v-card>
            </v-flex>
            <v-flex
                xs12
                sm6
                d-flex
            >
                <select
                    v-model="name1Select"
                    class="dropdown"
                >
                    <option
                        v-for="names in namesList"
                        :key="names.id"
                        :value="names.id"
                    >
                        {{ names.fullName }}
                    </option>
                </select>
            </v-flex>
            <v-flex xs12>
                <v-card
                    class="current"
                    dark
                >
                    <h4 class="text">
                        Name2
                    </h4>
                    <h1
                        v-if="name2"
                        class="text"
                    >
                        {{ name2.fullName }}
                    </h1>
                </v-card>
            </v-flex>
            <v-flex
                xs12
                sm6
                d-flex
            >
                <select
                    v-model="name2Select"
                    class="dropdown"
                >
                    <option
                        v-for="names in namesList"
                        :key="names.id"
                        :value="names.id"
                    >
                        {{ names.fullName }}
                    </option>
                </select>
            </v-flex>
            <v-flex xs12>
                <v-card
                    class="current"
                    dark
                >
                    <h4 class="text">
                        Name3
                    </h4>
                    <h1
                        v-if="name3"
                        class="text"
                    >
                        {{ name3.fullName }}
                    </h1>
                </v-card>
            </v-flex>
            <v-flex
                xs12
                sm6
                d-flex
            >
                <select
                    v-model="name3Select"
                    class="dropdown"
                >
                    <option
                        v-for="names in namesList"
                        :key="names.id"
                        :value="names.id"
                    >
                        {{ names.fullName }}
                    </option>
                </select>
            </v-flex>
            <v-flex xs12>
                <v-card
                    class="current"
                    dark
                >
                    <h4 class="text">
                        Name4
                    </h4>
                    <h1
                        v-if="name4"
                        class="text"
                    >
                        {{ name4.fullName }}
                    </h1>
                </v-card>
            </v-flex>
            <v-flex
                xs12
                sm6
                d-flex
            >
                <select
                    v-model="name4Select"
                    class="dropdown"
                >
                    <option
                        v-for="names in namesList"
                        :key="names.id"
                        :value="names.id"
                    >
                        {{ names.fullName }}
                    </option>
                </select>
            </v-flex>
            <v-btn
                color="green"
                @click="set"
            >
                Set
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
const clone = require('clone');
const name1 = nodecg.Replicant('name1');
const name2 = nodecg.Replicant('name2');
const name3 = nodecg.Replicant('name3');
const name4 = nodecg.Replicant('name4');
const names = nodecg.Replicant('names');
export default {
    data() {
        return {
            namesList: [],
            name1: null,
            name2: null,
            name3: null,
            name4: null,
            name1Select: null,
            name2Select: null,
            name3Select: null,
            name4Select: null
        };
    },
    created() {
        NodeCG.waitForReplicants(name1, name2, name3, name4, names).then(this.listen);
    },
    methods: {
        listen() {
            console.log("hi");
            names.on('change', newVal => {
                console.log(newVal);
                if (!Array.isArray(newVal)) {
                    this.namesList = [];
                } else {
                    let newList = clone(newVal);
                    
                    // sort by value
                    newList.sort(function(a, b) {
                        return a.realName.localeCompare(b.realName);
                    });
                    this.namesList = newList;
                }
            });
            name1.on('change', newVal => {
                this.name1 = clone(newVal) || {};
            });
            name2.on('change', newVal => {
                this.name2 = clone(newVal) || {};
            });
            name3.on('change', newVal => {
                this.name3 = clone(newVal) || {};
            });
            name4.on('change', newVal => {
                this.name4 = clone(newVal) || {};
            });
        },
        set() {
            if (this.name1Select &&this.name2Select && this.name3Select && this.name4Select) {
                name1.value = this.namesList.find(names => names.id == this.name1Select);
                name2.value = this.namesList.find(names => names.id == this.name2Select);
                name3.value = this.namesList.find(names => names.id == this.name3Select);
                name4.value = this.namesList.find(names => names.id == this.name4Select);
            }
            return;
        }
    }
};
</script>

<style lang="scss" scoped>
.text {
    width: 100%;
    text-align: center;
}
.light {
    background-color: white;
}
.dropdown {
    // the reason I have to do this is why Javascript is shite
    color: black;
    -webkit-appearance: menulist;
    background-color: white;
    border-style: solid;
}
</style>
