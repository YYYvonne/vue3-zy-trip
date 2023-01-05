<template>
  <div class="city top-page">
    
    <div class="top">
        <van-search v-model="searchValue" 
        show-action placeholder="城市/区域/位置" 
        shape="round"
        @cancel="onCancel" />
        
        <!-- active是默认索引,     除了绑定title, 还可以绑定name获取key, 这样tabActive就可以获取到key值-->
        <van-tabs v-model:active="tabActive" color="#ff9854" >
            <template v-for="( value, key, index ) in allCities" :key="key">
                <van-tab :title="value.title" :name="key"></van-tab>
            </template>
        </van-tabs>
    </div>

    <div class="content">
        <!-- 优化性能，提高nav的切换效率 tabActive === key 类似排他-->
        <template v-for="( value, key, index ) in allCities" :key="key">
            <city-group-item v-show=" tabActive === key " :groupData="value" />
        </template>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia';
import cityGroupItem from './cpns/CityGroupItem.vue'


const searchValue = ref('')
const route = useRouter()
const onCancel = () => {
    route.back()
};

const tabActive = ref()

const cityStore = useCityStore()
cityStore.fetchCityAllData()
const { allCities } = storeToRefs(cityStore)

//获取选中标签后的数据,这样确保数据是响应式的，但是两个都是ref，都需取value值，allCities.valuevalue[tabActive.value],这样反而失去了响应式
//用计算属性包裹可以返回响应式
//1. 获取正确的key：将tabs中绑定的tabActive正确绑定
//2. 根据key从allCities获取数据，默认直接根据的数据不是响应式的，所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value] )

</script>

<style lang="less" scoped>
.city {
    .top {
        position: relative;
        z-index: 9;
    }
    .content {
        height: calc( 100vh - 98px);
        overflow-y: auto;
    }
}
</style>