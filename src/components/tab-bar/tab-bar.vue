<template >
 <div class="tab-bar">
   <template v-for=" (item, index) in tabBarData">
   <div class="tab-bar-item" 
        @click="activeButton(index, item)"
        :class="{ active: currentIndex === index }">
     <!-- vite专属的url加载方式 -->
     <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="" />
     <img v-else :src="getAssetURL(item.imageActive)" alt="" />
     <span class="text">{{ item.text }}</span>
   </div>
  </template>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { tabBarData } from '@/assets/data/tab-bar-data'
import { getAssetURL } from '@/utils/load_assets';
 
const currentIndex = ref(0);
const router = useRouter()
const activeButton = (index, item) => { 
  currentIndex.value = index,
  router.push(item.path)
}


</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;

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