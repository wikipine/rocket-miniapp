import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        uid: "",
        username: "",
        avatar: "/static/avatar.png",
        updateTime: 0,
        extendMap: {}
      }
    }
  },
  getters: {

  },
  actions: {
    setUserInfo(data) {
      let info = this.userInfo;
      if(!!info) {
          for(let i in data) {
              info[i] = data[i];
          }
      } else {
          info = data;
      }
      // 头像默认处理
      info['avatar'] = info['avatar'] ?? '/static/avatar.png';
      this.userInfo = info;
    }
  },
});

export default useUserStore;
