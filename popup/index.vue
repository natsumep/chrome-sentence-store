<template>
  <div
    style="
      min-width: 330px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    "
  >
    <div class="top-btns">
      <switchComment
        @change="changeAudio"
        value="自动加载播放语音"
        :isCheck="audio"
      ></switchComment>
      <switchComment
        @change="changeAutoLoad"
        value="显示内容"
        :isCheck="play"
      ></switchComment>
    </div>
	<div class="top-btns">
      <switchComment
        @change="changeCaihongLoad"
        value="切换到彩虹屁🌈"
        :isCheck="caihong"
      ></switchComment>
    </div>
    <LoginPanda v-if="!token" @login="changeLogin"></LoginPanda>
    <UserInfo
      v-if="token"
      :token="token"
      @change="changeLogin(null)"
    ></UserInfo>
	
	<div style="text-align: center;
    color: #2196f3;
    padding:0px 10px 10px 10px;
    cursor: pointer;" @click="toSign" > 点击前往句子杂货铺官网 </div>

  </div>
</template>

<script>
/* eslint-disable */

import LoginPanda from "./LoginPanda";
import switchComment from "./switch";
import { getToken ,getPlay, setPlay, getAudio,setAudio , getBgView ,setToken, cleanToken ,sendMessageToContentScript , getCaihong,setCaihong } from "./utils/storage";
import UserInfo from "./UserInfo";

export default {
	data: () => {
		return {
			token: "",
			audio:false,
			play:true,
			caihong: false
		};
	},
	components: {
		LoginPanda: LoginPanda,
		switchComment: switchComment,
		UserInfo,
	},
	async mounted() {
		this.audio = await getAudio();
		this.play = await getPlay();
		const token = await getToken();
		this.caihong = await getCaihong();
		this.token = token;
	},
	methods: {
		async changeAudio(val) {
			await setAudio(val)
			sendMessageToContentScript({type:'audio',value:val})
		},
		async changeAutoLoad(val) {
			await setPlay(val)
			sendMessageToContentScript({type:'play',value:val})
		},
		async changeCaihongLoad(val){
			await setCaihong(val);
			sendMessageToContentScript({type:'caihong',value:val})
		},
		async changeLogin(token) {
			this.token = token;
			if(!token){
				await cleanToken(token);
			}
			getBgView().initLogoText();
		},
		toSign() {
			globalThis.chrome.tabs.create({ url: "https://www.tinker.run/sentence" });
		},
	},
};
</script>
<style scoped>
.top-btns {
  display: flex;
  /* justify-content: flex-end; */
  flex: 0 0 auto;
  width: 100%;
}
</style>