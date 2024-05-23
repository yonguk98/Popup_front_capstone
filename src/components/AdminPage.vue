<template>
    <button class="btn" @click="getArticles()">get article</button>
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
    <dialog id="register_modal" class="modal" v-if="modalOpen">
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
                    <label for="duration" class="label">시작일</label>
                    <input id="duration" v-model="storeCreateData.startDate" class="input input-bordered" type="text"
                        required>
                </div>
                <div class="py-4">
                    <label for="duration" class="label">종료일</label>
                    <input id="duration" v-model="storeCreateData.endDate" class="input input-bordered" type="text"
                        required>
                </div>
                <div class="modal-action">
                    <button type="button" class="btn" @click="closeModal()">Close</button>
                    <button type="submit" class="btn btn-primary">등록</button>
                </div>
            </form>
        </div>
    </dialog>
</template>

<script>
import { useBaseStore } from '../stores/base'
const baseStore = useBaseStore();
const baseUrl = baseStore.baseUrl;

export default {
    data() {
        return {
            datas: { data: null },
            modalOpen: false,
            selectedData: {},
            storeCreateData: {
                name: null,
                startDate: null,
                endDate: null,
                location: null,
            }
        }
    },
    methods: {
        async getArticles() {
            this.datas = await fetch(baseUrl + "/admin/article", {
                method: 'get',
                credentials: 'include',
            }).then(res => res.json());
            return this.datas.data;
        },
        showModal(data) {
            this.selectedData = { ...data }; // Shallow copy to avoid direct mutation
            this.modalOpen = true;
            this.$nextTick(() => {
                const dialog = document.getElementById('register_modal');
                if (dialog) {
                    dialog.showModal();
                }
            });
        },
        closeModal() {
            this.modalOpen = false;
            const dialog = document.getElementById('register_modal');
            if (dialog) {
                dialog.close();
            }
        },
        async registerArticle() {
            const response = await fetch(`${baseUrl}/admin/store/create`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.storeCreateData),
            });

            if (response.ok) {
                alert('등록 성공!');
                this.resetStoreCreateData();
                this.closeModal();
                this.getArticles(); // Update the table with the new data
            } else {
                alert('등록 실패.');
            }
        },
        deleteArticle(id) {
            fetch(baseUrl + `/admin/article/${id}/delete`, {
                method: 'delete',
                credentials: 'include',
            }).then(res => {
                if (res.ok) {
                    // Reload articles after deletion
                    this.getArticles();
                } else {
                    // Handle error
                    console.error('Failed to delete article');
                }
            }).catch(error => {
                console.error('Error deleting article:', error);
            });
        },
        resetStoreCreateData() {
            this.storeCreateData = {
                name: null,
                startDate: null,
                endDate: null,
                location: null,
            };
        },
    }
}
</script>

<style>
/* Add any additional styling you need */
</style>
