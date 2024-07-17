<style scoped>
page{
  background: white;
}
</style>
<template>
  <view class="custom-page">
    <q-rich-text :content="htmlContent"></q-rich-text>
  </view>
</template>

<script setup>
import { reactive, ref } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { getDocumentByAliasApi } from "@/api/common";
import QRichText from '@/components/richtext';

onLoad((options)=>{
  alias.value = options.alias ? options.alias : '';
  if(options.title) {
     uni.setNavigationBarTitle({
	  title: options.title
    });
  }
})
onShow(()=>{
  searchDetail();
})
const alias = ref('');
const htmlContent = ref('<p style="color: red;">这是测试内容，请按接口替换</p>');
const searchDetail = async () => {
  const res = await getDocumentByAliasApi(alias.value);
  if(true === res.success) {
    htmlContent.value = res.data.content;
    // 动态设置页面标题
    uni.setNavigationBarTitle({
	  title: res.data.title
    });
  }
}
</script>