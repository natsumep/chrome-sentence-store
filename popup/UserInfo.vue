<template>
  <div class="box-card">
    <div
      v-if="userinfo"
      style="
        padding: 10px;
        box-shadow: 0 0 10px rgb(0 0 0 / 10%);
        border-radius: 20px;
        position: relative;
      "
    >
      <span class="exit-btn" @click="handleExit">退出</span>
      <div v-if="userinfo.avatar" class="flex flex-just-center">
        <img class="user-img" :src="userinfo.avatar" alt="" />
      </div>
      <div class="text-centen" style="color: #3c68e6; margin-bottom: 10px">
        {{ userinfo.nickname }}
      </div>
      <div
        v-if="!profile"
        class="text-centen"
        style="font-size: 13px; color: #999"
      >
        这个人很懒，啥都没留下~~
      </div>
      <div v-else style="font-size: 14px; color: #333" v-html="profile"></div>
    </div>
    <div style="margin-top: 10px" class="flex">
      <div style="width: 50%" class="flex-fix">
        <div class="text-centen">句子杂货铺</div>
        <div class="icon-list">
          <div class="icon-item">
            <div class="img-box">
              <img src="../images/like.png" alt="" srcset="" />
            </div>
            <span class="w-max fix-fix text-centen">{{
              sentence.sentenceLikeLength || 0
            }}</span>
          </div>
          <div class="icon-item">
            <div class="img-box">
              <img src="../images/collce.png" alt="" srcset="" />
            </div>
            <span class="w-max fix-fix text-centen">{{
              sentence.sentenceCollectLength || 0
            }}</span>
          </div>
        </div>
      </div>
      <div class="splice-line"></div>
      <div>
        <div class="text-centen">彩虹屁🌈</div>
        <div class="icon-list">
          <div class="icon-item">
            <div class="img-box">
              <img src="../images/like.png" alt="" srcset="" />
            </div>
            <span class="w-max fix-fix text-centen">{{
              caihong.caihongLikeLength || 0
            }}</span>
          </div>
          <div class="icon-item">
            <div class="img-box">
              <img src="../images/collce.png" alt="" srcset="" />
            </div>
            <span class="w-max fix-fix text-centen">{{
              caihong.caihongCollectLength || 0
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="isLoading">
			<span class="loader"> </span>
		</div> -->
  </div>
</template>
<script>
function api(url, token) {
  return new Promise((a) => {
    fetch(url, {
      credentials: "include",
      method: "GET", // or 'PUT'
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: "Bearer " + token,
      }),
    }).then((res) => {
      res.json().then((data) => {
        a(data.body);
      });
    });
  });
}

import { cleanToken } from "./utils/storage";
export default {
  data() {
    return {
      userinfo: null,
      isLoading: true,
      profile: "",
      caihong: {},
      sentence: {},
    };
  },
  props: ["token"],
  mounted() {
    setTimeout(() => {
      this.getUserinfo();
      this.getSentenceInfo();
      this.getCaihongInfo();
    }, 100);
  },
  methods: {
    async handleExit() {
      await cleanToken();
      this.$emit("change");
    },
    async getUserinfo() {
      this.isLoading = true;
      const url = "https://www.tinker.run/api/user?edit=true";
      const data = await api(url, this.token);
      this.isLoading = false;
      this.userinfo = data;
      this.profile = data.profile;
    },
    async getSentenceInfo() {
      const url = "https://www.tinker.run/api/sentence/info";
      const data = await api(url, this.token);
      console.log(data);
      this.sentence = data;
    },
    async getCaihongInfo() {
      const url = "https://www.tinker.run/api/caihong/info";
      const data = await api(url, this.token);
      console.log(data);
      this.caihong = data;
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-just-center {
  display: flex;
  justify-content: center;
}
.text-centen {
  text-align: center;
}
.w-max {
  width: 100%;
}
.flex-fix {
  flex: 0 0 auto;
}
.box-card {
  min-width: 150px;
  min-height: 150px;
  padding: 20px;
  max-width: 300px;
  width: 300px;
}
.user-img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  animation: rotation 1s linear infinite;
}
.loader:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  background: #ff3d00;
  width: 16px;
  height: 16px;
  transform: translate(-50%, 50%);
  border-radius: 50%;
}
.exit-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: cornflowerblue;
}
.icon-list {
  display: flex;
  justify-content: space-around;
  padding: 5px;
}
.icon-item {
  width: 50%;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
}
.icon-item .img-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
}
.icon-item .img-box img {
  width: 30px;
  height: 30px;
}
.splice-line {
  border-left: 1px solid #d4d4d4;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(360deg);
  }
}
</style>
