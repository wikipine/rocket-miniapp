<template>
  <view>
    <view v-if="activeTab === 'home'" class="main-container rkt-side-px">
      <!-- pages -->
      <index-home />
      <!-- tabbar -->
    </view>
    <!-- <index-user v-if="activeTab === 'user'" /> -->
    <!-- <index-compass v-if="activeTab === 'compass'" /> -->
    <layout-tabbar type="home"></layout-tabbar>
  </view>
</template>

<script setup>
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import { onReachBottom, onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import IndexHome from '@/pages/home/index.vue';
import LayoutTabbar from '@/components/layouts/tabbar/index.vue';

const activeTab = ref('home');

onLoad((options)=>{
  // 设置默认tab
  // activeTab.value = options.tab || 'home';
})

// home - recommend - onReachBottom
onReachBottom(() => {
  // 发出全局事件
  uni.$emit('onReachBottom');
});

// 分享定义处理
onShareAppMessage((options)=>{
   return {
        title: '欢迎使用AI萌图库',
        path: '/pages/index/index',
    }
})

// 分享到朋友圈
onShareTimeline((options) => {
  return {
      title: '欢迎使用AI萌图库',
      path: '/pages/index/index',
  }
})

const setActiveTab = (event) => {
  activeTab.value = event;
}
</script>

<style scoped>
.main-container {
  background-repeat: no-repeat;
  background-size: 100%;
  box-sizing: border-box;

  padding-bottom: 90px;
}
</style>
