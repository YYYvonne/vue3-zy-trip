<template>
  <div class="home-category" @click="categoryClick">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="title">
                    {{ item.title }}
                </div>
            </div>
        </template>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const route = useRouter()

const homeStore = useHomeStore()
homeStore.fetchCategoryData()
const { categories } = storeToRefs(homeStore)

const categoryClick = () => {
    window.location.href  = 'https://www.ke.com/?freeze=1'
}


</script>

<style lang="less" scoped>
.home-category {
        // width: 100%;
        margin: 8px;
        display: flex;
        padding: 7px 5px 0;
        // padding-bottom: 10px;
        overflow-x: auto;
        &::-webkit-scrollbar {
            display: none;
        }
    
            .item {
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 70px;
                text-align: center;
    
                img {
                    height: 32px;
                    width: 32px;
                }
    
                .title {
                    font-size: 12px;
                    margin-top: 8px;
                }
            }
        }
</style>