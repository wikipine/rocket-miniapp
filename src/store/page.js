import { defineStore } from 'pinia';

const usePageStore = defineStore('page', {
    state: () => {
        return {
            refreshTime: 0,
        }
    },
    getters: {

    },
    actions: {
        setRefreshTime() {
            this.refreshTime = new Date().getTime();
        }
    },
});

export default usePageStore;
