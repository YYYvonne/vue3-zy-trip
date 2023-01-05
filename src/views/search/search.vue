<template>
  <div class="search">
    <h2>开始时间: {{ $route.query.startDate }}</h2>
    <h2>结束时间: {{ $route.query.endDate }}</h2>
    <h2>当前城市: {{ $route.query.currentCity }}</h2>
    <div class="other">
        其它数据还没展示哟~
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.search {
    text-align: center;
    font-size: 15px;
    margin-top: 50px;
    background-color: #FFF;
    .other {
        margin-top: 20px;
    }
}
</style>