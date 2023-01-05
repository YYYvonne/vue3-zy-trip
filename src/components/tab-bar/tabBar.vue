<template >
 <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabBarData">
        <van-tabbar-item  :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentIndex === index" :src="getAssetURL(item.imageActive)" alt="">
            <img v-else :src="getAssetURL(item.image)" alt="">
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { tabBarData } from '@/assets/data/tab-bar-data'
import { getAssetURL } from '@/utils/load_assets';
 
// 监听路由改变时, 找到对应的索引, 设置currentIndex
const route = useRouter()
const currentIndex = ref(0)
watch(route, (newRoute) => {
  const index = tabBarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) {
    return currentIndex.value = index }
})



</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  display: flex;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #f3f3f3;
  .tab-bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.active {
        color: var(--primary-color)
      }

      img {
        width: 32px;
      }

      .text {
        margin-top: 2px;
        font-size: 12px;
        }
    }
}
</style>