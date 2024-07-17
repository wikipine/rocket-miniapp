<style scoped>
@import "./index.css";
</style>
<template>
  <view :class="showHeader" style="width: 100%;">
    <view class="header-navbar"
        :style="{ paddingTop: $device.systemInfo.statusBarHeight + 'px', height: $device.systemInfo.nav + 'px' }">
      <view class="nav-item-btn-group" v-if="btn">
        <van-icon v-if="btn === 'backPage'" class="nav-item__btn" name="arrow-left" size="32rpx" />
      </view>
      <view class="nav-item__title" v-if="title">{{ title }}</view>
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { $device } = getCurrentInstance().appContext.config.globalProperties;

const props = defineProps({
  title: {
    type: String,
    default: '奇味小说'
  },
  btn: {
    type: String,
    default: ''
  }
})
</script>