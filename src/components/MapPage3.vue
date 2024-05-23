<template>
    <div class="container flex h-full">
        <naver-map class="w-3/5 h-full" :map-options="mapOptions">
            <naver-marker v-for="(data, index) in slicedDatas" :key="index" :latitude=data.ycoordinate
                :longitude=data.xcoordinate @click="selectStore(data)" />
        </naver-map>
        <div class="store-list w-2/5 h-full p-4 overflow-y-auto bg-white shadow-lg rounded-lg">
            <template v-if="selectedStore">
                <div class="h-full flex flex-col justify-between">
                    <div>
                        <p class="font-semibold text-2xl">{{ selectedStore.name }}</p>
                        <p>{{ selectedStore.location }}</p>
                        <p>{{ selectedStore.startDate }} ~ {{ selectedStore.endDate }}</p>
                    </div>
                    <button @click="selectedStore = null" class="btn btn-primary mt-4 self-end">뒤로가기</button>
                </div>
            </template>
            <template v-else>
                <h2 class="text-xl font-bold mb-4">스토어 목록</h2>
                <ul class="space-y-4">
                    <li v-for="(data, index) in slicedDatas" :key="index"
                        class="p-2 border border-gray-300 rounded-lg cursor-pointer" @click="selectStore(data)">
                        <p class="font-semibold text-xl">{{ data.name }}</p>
                        <p>{{ data.location }}</p>
                    </li>
                </ul>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { NaverMap, NaverMarker } from 'vue3-naver-maps';

const mapOptions = ref({
    latitude: 37.5445024, // 지도 중앙 위도
    longitude: 127.0560905, // 지도 중앙 경도
    zoom: 15,
});

const datas = ref([]);
const selectedStore = ref(null);

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:8090/store', {
            method: 'get',
            credentials: 'include',
        });
        const result = await response.json();
        // Fetch 결과에서 data 배열을 추출하여 datas에 할당
        if (result.statusCode === "200") {
            datas.value = result.data;
        } else {
            console.error('Failed to fetch stores:', result.msg);
        }

        // 데이터 구조 확인을 위해 콘솔에 출력
        console.log('Fetched data:', datas.value);
        datas.value.slice(1).forEach((data, index) => {
            console.log(`Data at index ${index}:`, data);
            console.log(`xcoordinate: ${data.xcoordinate}, ycoordinate: ${data.ycoordinate}`);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const slicedDatas = computed(() => datas.value.slice(1));

const selectStore = (store) => {
    selectedStore.value = store;
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    height: 90vh;
    /* Set container height to 100% of viewport height */
}

.store-list {
    display: flex;
    flex-direction: column;
}
</style>
