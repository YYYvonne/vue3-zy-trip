<template>
<div class="home-content">
    <h2 class="title">热门精选</h2>
    <div class="list">

        <template v-for="(item, index) in houselist " :key="item.data.houseId">
            <house-item-v9 v-if="item.discoveryContentType === 9" :itemData = "item.data"/>
            <house-item-v3 v-else-if="item.discoveryContentType === 3" :itemData = "item.data"/> 
        </template>
    </div>
</div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import houseItemV9 from '@/components/house-item/houseItemV9.vue';
import houseItemV3 from '@/components/house-item/houseItemV3.vue'
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.home-content {
    padding: 10px 8px;

    .title {
        font-size: 22px;
        padding: 10px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>