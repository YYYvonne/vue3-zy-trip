<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <home-nav-bar />
      <div class="banner">
        <img src="@/assets/img/home/banner.webp" alt="">
      </div>
      <home-search-box :hotSuggestion="hotSuggests" />
      <home-category />
      <div class="search" v-if="isSearch">
        <search-bar startDateSch="8.25" endDateSch="8.29"/>
      </div>
      <home-content />
    </van-pull-refresh>
  
   
  </div>
 
</template>>

<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { computed } from '@vue/reactivity';
import HomeNavBar from './cpns/HomeNavBar.vue';
import HomeSearchBox from './cpns/HomeSearchBox.vue';
import HomeCategory from './cpns/HomeCategory.vue';
import HomeContent from './cpns/HomeContent.vue';
import useHomeStore from '@/stores/modules/home';
import useScroll from '@/hooks/useScroll';
import searchBar from '@/components/search-bar/searchBar.vue';

//发送网络请求
//1.热门建议
const homeStore = useHomeStore()
homeStore.fetchSuggestData()
const { hotSuggests } = storeToRefs(homeStore)
//2.category
homeStore.fetchCategoryData()
//3.houselist
homeStore.fetchHouselistData()



//监听window创建的滚动
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData()
    isReachBottom.value = false
  }
})
//搜索框显示设置
// const isSearch = ref(false) 
// watch(scrollTop, (newTop) => {
//   isSearch.value = newTop >100
// })
//计算属性也是响应式的
const isSearch = computed(() => {
  return scrollTop.value >= 360
})

//上拉数据刷新
const isLoading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    homeStore.fetchHouselistData()
    isLoading.value = false;
  }, 1000);
};


</script>


<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
 }

 .search {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
 }
</style>