<template>
  <div class="city-group-item">
<!-- <template v-for="item in allCities[tabActive]?.cities"> -->
    <van-index-bar :index-list="indexList">
    <!-- 热门城市 -->
    <van-index-anchor index= "热门" />
    <div class="list">
        <template v-for="city in groupData.hotCities">
            <div class="list-item" @click="cityClick(city)">
                {{ city.cityName }}
            </div>
        </template>
    </div>


    <!-- 城市 -->
    <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index = "group.group "/>
        <template v-for="(city, indey) in group.cities" :key="indey">
            <van-cell :title = "city.cityName" @click="cityClick(city)" />
        </template>
    </template>
</van-index-bar>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

//传值
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

//动态索引处理
const indexList = computed(()=> {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list

})

//监听城市点击处理
const cityStore = useCityStore()
const route = useRouter()
const cityClick = (city) => {
    cityStore.currentCity = city
    route.back()
}
</script>

<style lang="less" scoped>
.city-group-item {
    
    .list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px;
    padding-right: 25px;

    .list-item {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 0;
    }
}
}

</style>