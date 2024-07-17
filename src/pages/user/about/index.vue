<style scoped>
@import "./index.css";
</style>
<template>
  <view>
    <view class="cell-group">
      <view class="cell-item" @click="$goto.navigateTo('agreement-privacy')">
        <view class="cell-title">
          <view>隐私协议</view>
        </view>
        <image class="arrow-icon" src="@/static/icon/arrow_right.svg" />
      </view>
      <view class="cell-item" @click="$goto.navigateTo('agreement-violation')">
        <view class="cell-title">
          <view>侵权处理</view>
        </view>
        <image class="arrow-icon" src="@/static/icon/arrow_right.svg" />
      </view>
    </view>
  </view>
</template>
<script setup>
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
const { $goto } = getCurrentInstance().appContext.config.globalProperties;
</script>