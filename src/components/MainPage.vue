<template>
    <h1>MainPage~~~{{ title }}</h1>
    <input type="text" v-model="input1" />
    <button type="button" @click="getData">GET</button>
    <button type="button" @click="setData">SET</button>
    <select class="form-control" v-model="region" @change="chagneRegion">
        <option :key="i" :value="d.v" v-for="(d, i) in options">{{ d.t }}</option>
    </select>

    <table class="table table-bordered" v-if="tableShow">
        <tr :key="i" v-for="(d, i) in options">
            <td>{{ d.v }}</td>
            <td>{{ d.t }}</td>
        </tr>
    </table>
    ------------------------------------------------------
    <table class="table table-bordered" v-show="tableShow">
        <tr :key="i" v-for="(d, i) in options">
            <td>{{ d.v }}</td>
            <td>{{ d.t }}</td>
        </tr>
    </table>
    <RouterLink to="/map">Map</RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "MainPage",
    data() {
        return {
            title: "메인페이지",
            title2: "title2222",
            input1: "abcd",
            options: [
                { v: "S", t: "Seoul" },
                { v: "J", t: "Jeju" },
                { v: "B", t: "Busan" },
            ],
            region: "S",
            tableShow: true
        };
    },
    watch: {
        input1() {
            console.log(this.input1);
        },
        title() {
        }
    },
    methods: {
        getData() {
            alert(this.input1);
        },
        setData() {
            this.input1 = 12345;
        },
        chagneRegion() {
            alert(this.region);
        }
    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created() {
        console.log("created");
    },
    beforeMount() {
        console.log("beforeMount");
    },
    mounted() {
        console.log("mounted");
    },
    beforeUpdate() {
        console.log("beforeUpdate");
    },
    updated() {
        console.log("updated");
    },
    beforeDestroy() {
        console.log("beforeDestroy");
    },
    destroyed() {
        console.log("destroyed");
    },
    components: { RouterLink }
}
</script>