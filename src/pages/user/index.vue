<style scoped>
@import "./index.css";
</style>
<template>

  <view class="container rkt-side-px">
    <!-- profile -->
    <view class="rkt-margin-bottom">
      <!-- info -->
      <view class="user-content">
        <view>
          <user-avatar @tap="changeProfile()" data-eventsync="true" />
        </view>
        <view>
          <view class="user-baseInfo">
            <view @tap="changeProfile()" data-eventsync="true">{{ userInfo.username }}</view>
            <image style="width: 18px; height: 18px; display: block;" 
              src="@/static/icon/edit.svg" 
              @tap="changeProfile()" 
              data-eventsync="true" />
           </view>
          <!-- <view style="color: #9ca3af; font-size: 14px;">ID: 1548200354</view> -->
        </view>
      </view>

    </view>

    <view class="action-panel" style="margin-bottom: 20px;">

      <view class="cell-group">
        <view class="cell-item" @click="$goto.navigateTo('user-about')">
          <view class="cell-title">
            <view>关于我们</view>
          </view>
          <image class="arrow-icon" src="@/static/icon/arrow_right.svg" />
        </view>
      </view>
     
    </view>
    <!-- tabbar -->
    <layout-tabbar type="user"></layout-tabbar>
  </view>
</template>

<script setup>
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import loginUtil from "@/utils/login";
import config from "@/config";
import LayoutTabbar from '@/components/layouts/tabbar/index.vue';
import UserAvatar from "@/components/user/avatar/index.vue";
import useUserStore from "@/store/user";
const userStore = useUserStore();
const { $goto } = getCurrentInstance().appContext.config.globalProperties;

const userInfo = reactive({
  uid: '',
  username: '',
  creator: false,
  code: '',
  likeVal: 0,
  collectVal: 0,
  followVal: 0,
  downloadVal: 0
})

onMounted(()=>{
  userInfo.uid = userStore.userInfo.uid;
  userInfo.username = userStore.userInfo.username;
  userInfo.creator = userStore.userInfo.extendMap.creator;
  userInfo.code = userStore.userInfo.extendMap.code;
  searchHomepageInfo();
})

userStore.$subscribe((res)=>{
  // 不用res 的返回处理, 编译后取不到 events.target值，直接用 userStore.userInfo
  let info = userStore.userInfo;
  userInfo.uid = info.uid;
  userInfo.username = info.username;
  searchHomepageInfo();
})

// 查询主页信息
const searchHomepageInfo = async () => {
  // 对接接口处理
}

// 获取用户头像和昵称
const changeProfile = () => {
  const { isWeixin } = config.getPlatformEnv();
  // 微信小程序的处理逻辑
  if(isWeixin) {
    $goto.navigateTo('user-info');
    return;
  }
  // 抖音小程序的处理逻辑
  uni.getUserProfile({
      success: function (infoRes) {
        let data = {
          username: infoRes.userInfo.nickName,
          avatar: infoRes.userInfo.avatarUrl
        }
        uni.showLoading({ title: '更新中', mask: true });
        // 对接接口处理
      }
    });
}
</script>