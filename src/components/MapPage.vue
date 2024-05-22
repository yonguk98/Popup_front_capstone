<script setup>
import { NaverMap, NaverMarker } from 'vue3-naver-maps'

import CustomMarker from './CustomMarker.vue'


const mapOptions = {
    latitude: 37.51347, // 지도 중앙 위도
    longitude: 127.041722, // 지도 중앙 경도
    zoom: 13,
}

const addr = "분당구 불정로 6";
async function geocode() {
    await fetch(`http://localhost:8090/store/geocode?addr=` + addr,{
    method: "GET",
}).then(res => {
    console.log(res);
// }).then(json => {
//     console.log(json)
}).catch(()=>{
    console.log("error")
})
}
const datas = []
</script>

<template>
    <naver-map style="width: 100%; height: 400px" :map-options="mapOptions">
        <!-- <custom-marker v-for="(data) in datas" :key="data.id" :v-bind="data" /> -->
        <!-- <naver-marker v-for="(data) in datas" :key="data.id" :latitude="data.lat" :longitude="data.lng">
            <div class="marker">
                <img :src="data.imageUrl">
            </div>
        </naver-marker> -->
        <naver-marker latitude="37.51347" longitude="127.041722" />
    </naver-map>
    <button type="submit" @click="geocode()" class="btn dark:btn-primary hover:btn-primary dark:hover:btn-ghost mt-3">geocode
              </button>
</template>
<style scoped>
/* setIcon 방식으로 css를 적용하려면 :deep() 을 사용해야 합니다. */
:deep(.marker) {
    /* 원하는 style 코드를 여기에 작성합니다. */
}
</style>