<style scoped>
.user-avatar {
  border-radius: 50%;
  display: block;
}
</style>
<template>
    <view>
        <image class="user-avatar" 
            :key="avatarUrl"
            :style="{
                width: size ? size + 'px' : '70px',
                height: size ? size + 'px' : '70px',
            }" 
            mode="aspectFit" 
            :src="avatarUrl" />
    </view>
</template>
<script setup>
import {getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
import useUserStore from "@/store/user";
const userStore = useUserStore();

const props = defineProps(['url', 'size']);

const avatarUrl = ref('');
const setAvatarUrl = (url) => {
    const prefix = 'default_';
    const index = url ? url.slice(prefix.length) : -1;
    if (index > -1 && index == parseInt(index)) {
        avatarUrl.value = '/static/avatar/' + index + '.svg';
    } else {
        avatarUrl.value = url;
    }
}

onMounted(()=>{
    setAvatarUrl(props.url ?? userStore.userInfo.avatar);
})

watch(() => [props.url], ([newVal], [oldVal]) => {
    setAvatarUrl(newVal);
}, { deep: true });

userStore.$subscribe((res)=>{
  // 不用res 的返回处理, 编译后取不到 events.target值，直接用 userStore.userInfo
  let info = userStore.userInfo;
  if(!props.url) {
    setAvatarUrl(info.avatar);
  }
})


</script>