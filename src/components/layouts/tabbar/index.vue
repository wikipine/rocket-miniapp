<style scoped>
@import "./index.css";
.rkt-tab-img{
  width: 100%; 
  height: 100%; 
  display: block;
}
</style>
<template>
  <view class="rkt-tabbar" :style="{ 
          paddingBottom: $device.systemInfo.bottomBarHeight > 0 
          ? $device.systemInfo.bottomBarHeight +'px' : '10px'
        }">
    <view style="display: flex; align-items: center; justify-content: space-around; width: 100%;">
      <view class="tab-item" v-for="(item, index) in tabBarList" :key="index" @click="changeTabBar(item.name)">
        <view class="rkt-icon">
          <image
            class="rkt-tab-img"
            :src="item.name === activeTabName ? item.activeIcon : item.icon" 
          />
        </view>
        <view style="color: #fff;">{{ item.label }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
const { $goto, $device } = getCurrentInstance().appContext.config.globalProperties;

const props = defineProps(['type']);

const emit = defineEmits(['change']);
const emitChange = () => {
  setNavigationBarTitle();
  emit('change', activeTabName.value);
}

 // #ifdef MP-WEIXIN
 const tabBarList = [
  { name: 'home', label: '首页' },
  { name: 'user', label: '我的' }
]
// #endif
// #ifdef MP-TOUTIAO
const tabBarList = [
  { name: 'home', label: '首页' },
  { name: 'compass', label: '发现' },
  { name: 'user', label: '我的' }
]
// #endif

tabBarList.forEach(val=>{
  val['icon'] = '/static/icon/tabbar/' + val.name + '.svg';
  val['activeIcon'] = '/static/icon/tabbar/' + val.name + '_active.svg';
})
const activeTabName = ref('');

onMounted(() => {
  activeTabName.value = props.type;
  setNavigationBarTitle();
})
// 设置标题
const setNavigationBarTitle = () => {
  const tabItem = tabBarList.find(item => item.name === activeTabName.value);
  uni.setNavigationBarTitle({ title: tabItem ? tabItem.label : '' });
}
const changeTabBar = (event) => {
  const tabName = event;
  // 若处于同一页面，不做跳转处理
  if (tabName === activeTabName.value) {
    return false;
  }
  // 组件的形式透出
  // activeTabName.value = tabName;
  // emitChange(tabName);
  // 页面跳转的形式
  if (tabName && tabName !== 'home') {
    uni.switchTab({
      url: `/pages/${tabName}/index`
    })
  } else {
    uni.switchTab({
      url: `/pages/index/index`
    })
  }
  

}
</script>