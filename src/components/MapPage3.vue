<template>
    <div class="container flex h-full">
        <naver-map class="w-3/5 h-full" :map-options="mapOptions">
            <div v-for="(data, index) in datas" :key="index">
            <naver-marker :latitude="data.ycoordinate"
            :longitude="data.xcoordinate" @click="selectStore(data)">
                <div class="marker">
                    <img src="../assets/marker.png" alt="Marker">
                </div>
            </naver-marker>
            <naver-info-window :marker="marker" :open="isOpen">
                <div class="infowindow-style">click Marker!😎</div>
            </naver-info-window>
            </div>
        </naver-map>
        <div class="store-list w-2/5 h-full p-4 overflow-y-auto bg-white shadow-lg rounded-lg">
            <template v-if="selectedStore">
                <div class="h-full flex flex-col justify-between">
                    <div class="card bg-base-100 shadow-xl p-4">
                        <h2 class="card-title text-3xl p-4">{{ selectedStore.name }}</h2>
                        <div class="space-y-2">
                            <div class="card bg-base-100 shadow p-2">
                                <p class="text-sm">위치: {{ selectedStore.location }}</p>
                            </div>
                            <div class="card bg-base-100 shadow p-2">
                                <p class="text-sm">시작일: {{ selectedStore.startDate }}</p>
                            </div>
                            <div class="card bg-base-100 shadow p-2">
                                <p class="text-sm">종료일: {{ selectedStore.endDate }}</p>
                            </div>
                        </div>
                    </div>
                    <button @click="selectedStore = null" class="btn btn-primary mt-4 self-end">뒤로가기</button>
                </div>
            </template>
            <template v-else>
                <h2 class="text-xl font-bold mb-4">스토어 목록</h2>
                <div class="grid grid-cols-1 gap-4">
                    <div v-for="(data, index) in datas" :key="index"
                        class="card w-full bg-base-100 shadow-xl cursor-pointer" @click="selectStore(data)">
                        <div class="card-body">
                            <h2 class="card-title text-xl">{{ data.name }}</h2>
                            <p>{{ data.location }}</p>
                            <p>{{ data.startDate }} ~ {{ data.endDate }}</p>
                        </div>
                    </div>
                </div>
            </template>
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
const selectedStore = ref(null);
const isOpen =true;

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
        datas.value.forEach((data, index) => {
            console.log(`Data at index ${index}:`, data);
            console.log(`xcoordinate: ${data.xcoordinate}, ycoordinate: ${data.ycoordinate}`);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

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

.marker img {
    width: 25px;
    /* 원하는 너비로 설정 */
    height: 25px;
    /* 원하는 높이로 설정 */
}
</style>


