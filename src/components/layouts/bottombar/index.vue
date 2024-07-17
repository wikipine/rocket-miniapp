<template>
  <view class="rkt-bottom-bar"
        :style="{ background: background, paddingBottom: $device.systemInfo.bottomBarHeight + 'px' }">
    <slot />
  </view>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { $device } = getCurrentInstance().appContext.config.globalProperties;

const props = defineOptions({
  background: {
      type: String,
      default: '#FFFFFF'
    }
})

</script>

<style>

.rkt-bottom-bar {
  position: fixed;
  z-index: 999;
  bottom: 0;
  width: 100%;
  display: flex;
}

</style>