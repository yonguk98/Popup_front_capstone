<template>
    <div>
        <button class="btn" @click="crawlingRequest">Crawling Start</button>
        <button class="btn" @click="getArticles">Get Articles</button>
        <div class="overflow-x-auto">
            <table class="table">
                <tbody>
                    <tr v-for="data in datas.data" :key="data.id">
                        <td>{{ data.id }}</td>
                        <td>{{ data.content }}</td>
                        <td>{{ data.date }}</td>
                        <td>
                            <button class="btn btn-primary" @click="showModal(data)">등록</button>
                            <button class="btn btn-danger" @click="deleteArticle(data.id)">삭제</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <dialog ref="modal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Article Details</h3>
                <div>{{ selectedData.content }}</div>
                <form @submit.prevent="registerArticle" method="post">
                    <div class="py-4">
                        <label for="name" class="label">이름</label>
                        <input id="name" v-model="storeCreateData.name" class="input input-bordered" type="text" required>
                    </div>
                    <div class="py-4">
                        <label for="address" class="label">주소</label>
                        <input id="address" v-model="storeCreateData.location" class="input input-bordered" type="text"
                            required>
                    </div>
                    <div class="py-4">
                        <label for="startDate" class="label">시작일</label>
                        <input id="startDate" v-model="storeCreateData.startDate" class="input input-bordered" type="text"
                            required>
                    </div>
                    <div class="py-4">
                        <label for="endDate" class="label">종료일</label>
                        <input id="endDate" v-model="storeCreateData.endDate" class="input input-bordered" type="text"
                            required>
                    </div>
                    <div class="modal-action">
                        <button type="button" class="btn" @click="closeModal">Close</button>
                        <button type="submit" class="btn btn-primary">등록</button>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
</template>


<script>
import { ref } from 'vue';
import { useBaseStore } from '../stores/base';

export default {
    setup() {
        const baseStore = useBaseStore();
        const baseUrl = baseStore.baseUrl;

        const datas = ref({ data: null });
        const modalOpen = ref(false);
        const selectedData = ref({});
        const storeCreateData = ref({
            name: null,
            startDate: null,
            endDate: null,
            location: null,
        });

        const modal = ref(null);

        const getArticles = async () => {
            try {
                const response = await fetch(`${baseUrl}/admin/article`, {
                    method: 'GET',
                    credentials: 'include',
                });
                datas.value = await response.json();
            } catch (error) {
                console.error('Failed to fetch articles:', error);
            }
        };

        const showModal = (data) => {
            selectedData.value = { ...data }; // Shallow copy to avoid direct mutation
            try {
                const parsedData = splitString(selectedData.value.content);
                storeCreateData.value = {
                    name: parsedData.name,
                    location: parsedData.location,
                    startDate: parsedData.startDate,
                    endDate: parsedData.endDate,
                };
            } catch (error) {
                console.error('Failed to parse content:', error);
                resetStoreCreateData();
            }
            modalOpen.value = true;
            modal.value.showModal(); // Show the dialog
        };

        const closeModal = () => {
            modalOpen.value = false;
            modal.value.close(); // Close the dialog
        };

        const crawlingRequest = async () => {
            const response = await fetch(`${baseUrl}/admin/store/crawling?accountName=seongsu_bible`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        }

        const registerArticle = async () => {
            try {
                const response = await fetch(`${baseUrl}/admin/store/create`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(storeCreateData.value),
                });

                if (response.ok) {
                    alert('등록 성공!');
                    resetStoreCreateData();
                    closeModal();
                    getArticles(); // Update the table with the new data
                } else {
                    alert('등록 실패.');
                }
            } catch (error) {
                console.error('Failed to register article:', error);
            }
        };

        const deleteArticle = async (id) => {
            try {
                const response = await fetch(`${baseUrl}/admin/article/${id}/delete`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                if (response.ok) {
                    getArticles(); // Reload articles after deletion
                } else {
                    console.error('Failed to delete article');
                }
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        };

        const resetStoreCreateData = () => {
            storeCreateData.value = {
                name: null,
                startDate: null,
                endDate: null,
                location: null,
            };
        };

        function splitString(input) {
            // 정규 표현식을 사용하여 문자열을 분리
            const regex = /([^/]+)\/\s*([^/]+)\s*\(([^~]+)(~([^~]+))?\)/;
            const matches = input.match(regex);

            if (matches) {
                let [_, name, location, startDate, , endDate] = matches;

                // 종료 날짜가 없는 경우 endDate를 null로 설정
                if (!endDate) {
                    endDate = startDate;
                } else if (!endDate.includes('/')) {
                    // 종료 날짜가 일수만 주어진 경우 시작 날짜의 월을 사용하여 완성
                    const startMonth = startDate.split('/')[0];
                    endDate = `${startMonth}/${endDate}`;
                }

                return {
                    name: name.trim(),
                    location: location.trim(),
                    startDate: startDate.trim(),
                    endDate: endDate ? endDate.trim() : null,
                };
            } else {
                throw new Error('Input string does not match the expected format.');
            }
        }
        return {
            datas,
            modalOpen,
            selectedData,
            storeCreateData,
            getArticles,
            showModal,
            closeModal,
            registerArticle,
            deleteArticle,
            crawlingRequest,
            modal,
        };
    },
};
</script>
