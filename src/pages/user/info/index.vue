<style scoped>
.info-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
}
.submit-btn{
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-image: linear-gradient(45deg, rgb(157, 23, 77), rgb(91, 33, 182));
    color: #fff;
    border-radius: 4px;
}
</style>
<template>
    <view class="rkt-side-px">
        <view class="info-cell">
            <view style="flex: 1;">头像</view>
            <button class="btn-init" style="display: flex; align-items: center; justify-content: flex-end"
                open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <user-avatar v-if="avatarUrl" :url="avatarUrl" :size="60"/>
            </button>
        </view>
        <view class="info-cell">
            <view>昵称</view>
            <input type="nickname" :value="username" placeholder="请输入昵称" style="flex: 1; text-align: right;"
                @change="setNameValue" />
        </view>
        <view class="submit-btn" 
        :style="{
            opacity: hasEdit ? 1 : 0.7,
        }"
        @tap="onSubmit()"
        >更新保存</view>
    </view>
</template>
<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import config from "@/config/index";
import loginUtil from "@/utils/login";
import UserAvatar from "@/components/user/avatar/index.vue";
import { saveUserProfileApi } from "@/api/user";

const avatarUrl = ref('');
const username = ref('');
const hasEdit = ref(false);
const setHasEdit = (bool) => {
    hasEdit.value = true;
}
const submitLoading = ref(false);
const setSubmitLoading = (bool) => {
    if(bool) {
        uni.showLoading({ title: '更新中', mask: true });
    } else {
        uni.hideLoading();
    }
    submitLoading.value = bool;
}

onShow(() => {
    const cacheUserInfo = loginUtil.getUserInfo();
    avatarUrl.value = cacheUserInfo['avatar'];
    username.value = cacheUserInfo['username'];
});

// 选择头像
const onChooseAvatar = (event) => {
    // 微信临时文件
    const tmpFilePath = event.detail.avatarUrl;
    uni.uploadFile({
        url: config.getImageUploadUrl(),
        filePath: tmpFilePath,
        name: "file",
        formData: {
            "access-token": loginUtil.getToken(),
            "saas-app-id": config.getSassAppId(),
        },
        success: (uploadFileRes) => {
            const res = uploadFileRes.data;
            // 前4位为http即为成功
            if (res.slice(0, 4) === "http") {
                avatarUrl.value = res;
                setHasEdit(true);
            } else {
                uni.showToast({ title: "request upload fail", icon: "none" });
            }
        },
        fail: () => {
            uni.showToast({ title: "local upload fail", icon: "none" });
        },
    });
};

// 设置昵称
const setNameValue = (event) => {
    username.value = event.detail.value;
    setHasEdit(true);
}

// 更新用户信息
const onSubmit = async () => {
    if(!hasEdit.value || submitLoading.value) {
        return;
    }
    let data = {
        username: username.value,
        avatar: avatarUrl.value
    }
    setSubmitLoading(true);
    const res = await saveUserProfileApi(data);
    setSubmitLoading(false);
    if (true === res.success) {
        uni.showToast({ title: "更新成功", icon: "none" });
        // 更新用户信息
        loginUtil.setUserInfo({
            username: data.username,
            avatar: data.avatar,
        })
        setHasEdit(false);
    }
}
</script>