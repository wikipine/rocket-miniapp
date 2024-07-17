<style scoped>
.empty-body {
    margin-top: 30px;
    text-align: center;
    color: #4b5563;
    font-size: 12px;
}
</style>
<template>
    <view class="empty-body">{{ title }}</view>
</template>
<script setup>
const props = defineProps(['title']);
</script>
