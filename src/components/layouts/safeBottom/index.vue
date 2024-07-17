<template>
  <view :style="{ 
          paddingBottom: $device.systemInfo.bottomBarHeight > 0 
          ? $device.systemInfo.bottomBarHeight +'px' : '10px'
        }">
    <slot />
  </view>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { $device } = getCurrentInstance().appContext.config.globalProperties;

</script>

<style>

</style>