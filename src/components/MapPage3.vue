<template>
    <div class="container flex h-full">
        <naver-map class="w-3/5 h-full" :map-options="mapOptions">
            <div v-for="(data, index) in datas" :key="index">
                <naver-marker :latitude="parseFloat(data.ycoordinate)"
                    :longitude="parseFloat(data.xcoordinate)" @click="selectStore(data)">
                    <div class="marker">
                        <img src="../assets/marker.png" alt="Marker">
                    </div>
                </naver-marker>
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
                        <!-- 후기 작성 및 보여주기 -->
                        <div class="space-y-2 mt-4">
                            <h3 class="text-xl mb-2 text-end">reviews</h3>
                            <div v-for="(review, index) in selectedStore.reviews" :key="review.commentId" class="card bg-base-100 shadow p-2">
                                <div class="flex justify-between items-center">
                                    <p class="text-sm"><strong>{{ review.writer }}</strong><br /> {{ review.content }}</p>
                                    <button v-if="isReviewOwner(review.writer)" @click="deleteReview(review.commentId, index)" class="btn btn-outline btn-sm btn-error">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            <textarea v-model="newReview" class="textarea textarea-bordered w-full" placeholder="후기 작성"></textarea>
                            <button @click="addReview" class="btn btn-primary mt-2">후기 추가</button>
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
import {useBaseStore} from '../stores/base';

const mapOptions = ref({
    latitude: 37.5445024, // 지도 중앙 위도
    longitude: 127.0560905, // 지도 중앙 경도
    zoom: 15,
});

const baseStore = useBaseStore();
const datas = ref([]);
const selectedStore = ref(null);
const newReview = ref('');
const memberId = sessionStorage.getItem("userId"); // 세션에서 멤버 ID를 가져옴
const writer = sessionStorage.getItem("loginId"); // 세션에서 작성자 이름을 가져옴

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
            // 리뷰를 위한 초기값 설정
            datas.value.forEach(store => store.reviews = []);
        } else {
            console.error('Failed to fetch stores:', result.msg);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const fetchReviews = async (storeId) => {
    try {
        const response = await fetch(`http://localhost:8090/comment/${storeId}`, {
            method: 'get',
            credentials: 'include',
        });
        const result = await response.json();
        if (result.statusCode === "200") {
            selectedStore.value.reviews = result.data;
        } else {
            console.error('Failed to fetch reviews:', result.msg);
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

const selectStore = (store) => {
    selectedStore.value = store;
    fetchReviews(store.id); // 스토어 ID로 후기를 불러옴
};

const addReview = async () => {
    if(baseStore.getIsLoggedIn() == false){
        alert("로그인이 필요합니다.");
    }
    else if (newReview.value.trim()) {
        try {
            const response = await fetch('http://localhost:8090/comment/register', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    memberId: parseInt(sessionStorage.getItem("userId")),
                    storeId: parseInt(selectedStore.value.id),
                    writer: sessionStorage.getItem("loginId"),
                    content: newReview.value.trim(),
                }),
            });
            const result = await response.json();
            if (result.statusCode === "200") {
                selectedStore.value.reviews.push({
                    commentId: result.commentId, // 서버에서 반환된 commentId 사용
                    writer: sessionStorage.getItem("loginId"),
                    content: newReview.value.trim(),
                });
                newReview.value = '';
            } else {
                console.error('Failed to add review:', result.msg);
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    }
};

const deleteReview = async (commentId, index) => {
    try {
        const response = await fetch(`http://localhost:8090/comment/delete/${commentId}`, {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (result.statusCode === "200") {
            selectedStore.value.reviews.splice(index, 1);
        } else {
            console.error('Failed to delete review:', result.msg);
        }
    } catch (error) {
        console.error('Error deleting review:', error);
    }
};

const isReviewOwner = (reviewWriter) => {
    return reviewWriter === writer;
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
