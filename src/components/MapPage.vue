<script setup>
import { NaverMap, NaverMarker } from 'vue3-naver-maps'

import CustomMarker from './CustomMarker.vue'


const mapOptions = {
    latitude: 37.5445024, // 지도 중앙 위도
    longitude: 127.0560905, // 지도 중앙 경도
    zoom: 15,
}

const datas = []

</script>

<template>
    <naver-map style="width: 60%; height: 600px" :map-options="mapOptions">
        <!-- <custom-marker v-for="(data) in datas" :key="data.id" :v-bind="data" /> -->
        <!-- <naver-marker v-for="(data) in datas" :key="data.id" :latitude="data.lat" :longitude="data.lng">
            <div class="marker">
                <img :src="data.imageUrl">
            </div>
        </naver-marker> -->
        <naver-marker v-model="mapOptions" latitude=37.5445024 longitude=127.0560905 />
    </naver-map>
    <button type="submit" @click="geocode()"
        class="btn dark:btn-primary hover:btn-primary dark:hover:btn-ghost mt-3">geocode
    </button>
</template>