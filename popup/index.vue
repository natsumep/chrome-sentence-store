<template>
	<div>
		<div class="top-btns">
      	<switchComment @change="changeAudio" value="自动加载播放语音" :isCheck="false"></switchComment>
			<switchComment @change="changeAutoLoad" value="自动加载句子" :isCheck="true"></switchComment>
		</div>
		<LoginPanda></LoginPanda>
	</div>
</template>

<script>
/* eslint-disable */

import LoginPanda from "./LoginPanda";
import switchComment from "./switch";
export default {
	components: {
		LoginPanda: LoginPanda,
		switchComment: switchComment,
  },
  methods: {
    changeAudio(){

    },
    changeAutoLoad(){

    }
  },  
};
</script>
<style scoped>
  .top-btns{
    display: flex;
    justify-content:flex-end;
  }
</style>