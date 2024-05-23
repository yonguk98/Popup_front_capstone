<template>
    <div class="container flex">
        <naver-map class="w-3/5 h-96" :map-options="mapOptions">
            <naver-marker v-for="(data, index) in datas" :key="index" :latitude="data.lat" :longitude="data.lng">
                <div class="marker">
                    <img :src="data.imageUrl" />
                </div>
            </naver-marker>
        </naver-map>
        <div class="store-list w-2/5 h-96 p-4 overflow-y-auto bg-white shadow-lg rounded-lg">
            <h2 class="text-xl font-bold mb-4">스토어 목록</h2>
            <ul class="space-y-4">
                <li v-for="(data, index) in datas" :key="index" class="p-2 border border-gray-300 rounded-lg">
                    <p class="font-semibold">{{ data.name }}</p>
                    <p>{{ data.location }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { NaverMap, NaverMarker } from 'vue3-naver-maps';

const mapOptions = ref({
    latitude: 37.5445024, // 지도 중앙 위도
    longitude: 127.0560905, // 지도 중앙 경도
    zoom: 15,
});

const datas = ref([]);

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:8090/store', {
            method: 'get',
            credentials: 'include',
        });
        const result = await response.json();
        datas.value = result.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
});
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: row;
}
</style>

