<template>
  <div class="home-search-box">
    <!-- 位置信息 -->
    <div class="location bottom-gray-line">
        <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
        <div class="position" @click="getPosition">
            <span class="text">我的位置</span>
            <img src="@/assets/img/home/icon_location.png" alt="">
        </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line"  @click="showCalendar = true">
        <div class="start">
           <div class="date">
            <span class="tip">入住</span>
            <span class="time">{{ startDate }}</span>
           </div>
        </div>
        <div class="stay">共{{ stayDate }}晚</div>
        <div class="end">
           <div class="date">
            <span class="tip">离店</span>
            <span class="time">{{ endDate }}</span>
           </div>
        </div>
    </div>
    <van-calendar v-model:show="showCalendar" 
                  type="range" 
                  color="#ff9854"
                  :round="false"
                  :show-confirm="false" 
                  @confirm="onConfirm" />

    <!-- 价格人数-->
    <div class="section price-counter bottom-gray-line">
        <div class="start">价格不限</div>
        <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggest">
        <template v-for="(item, index) in hotSuggestion" :key="index">
             <div class="suggestion"
                    :style="{ color: item.tagText.color, background: item.tagText.background.color }">
                {{ item.tagText.text }}
             </div>
        </template>
    </div>

    <!-- 热门搜索 -->
    <div class="section search-btn">
        <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>


  </div>
</template>

<script  setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { formatMonthDay, getDiffDays } from '@/utils/format_date';

const router = useRouter();

defineProps({
    hotSuggestion : {
        type: Array,
        default: () => []
    }
})


//城市信息
const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)
const cityClick = () => {
    router.push('/city')
}
//获取位置信息 mdn查看
const getPosition = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log(res);
    }), err => {
        console.log('获取位置失败', err);
    }
}


//日期处理范围
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))
const stayDate = ref(getDiffDays(nowDate, newDate))
const date = ref(0)
const showCalendar =ref(false)
const onConfirm = (values) => {
    const [start, end] = values;
    startDate.value = formatMonthDay(start);
    endDate.value = formatMonthDay(end);
    stayDate.value = getDiffDays(start, end);
    showCalendar.value = false;
}

const searchBtnClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    })
}


</script>

<style lang="less" scoped>
.home-search-box {
    --van-calendar-popup-height: 100%;
}
.location {
     display: flex;
     align-items: center;
     height: 44px;
     padding: 0 20px;

     .city {
         flex: 1;
         color: #333;
         font-size: 12px;
     }

     .position {
         width: 80px;
         display: flex;
         align-items: center;

         .text {
             position: relative;
             top: 1px;
             font-size: 12px;
             color: #666;
         }

         img {
             margin-left: 5px;
             width: 18px;
             height: 18px;
         }
     }
 }

 .section {
     display: flex;
     flex-wrap: wrap;
     align-items: center;
     padding: 0 20px;
     color: #999;
     height: 44px;

     .start {
         flex: 1;
         display: flex;
         height: 44px;
         align-items: center;
     }

     .end {
         min-width: 30%;
         padding-left: 20px;
     }

     .date {
         display: flex;
         flex-direction: column;

         .tip {
             font-size: 12px;
             color: #999;
         }

         .time {
             margin-top: 3px;
             color: #333;
             font-size: 15px;
             font-weight: 500;
         }
     }
 }

 .date-range {
     height: 44px;

     .stay {
         flex: 1;
         text-align: center;
         font-size: 12px;
         color: #666;
     }
 }

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.hot-suggest {
    margin: 10px;
    height: auto; //自动计算高度
    .suggestion {
        padding: 4px, 8px;
        margin: 4px;
        // line-height: 1px;
        border-radius: 14px;
        font-size: 12px;
    }
}

.search-btn {
    // margin-left: 10px;
    .btn {
        width: 342px;
        height: 38px;
        // padding-left: 10px;
        max-height: 100px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}

</style>