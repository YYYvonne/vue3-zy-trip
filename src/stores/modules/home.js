import { defineStore } from "pinia";
import {
  getSuggestAll,
  getCategoryAll,
  gethouselistAll,
} from "@/services/index";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houselist: [],
  }),
  actions: {
    async fetchSuggestData() {
      const res = await getSuggestAll();
      this.hotSuggests = res.data;
    },

    async fetchCategoryData() {
      const res = await getCategoryAll();
      this.categories = res.data;
    },
    async fetchHouselistData() {
      const res = await gethouselistAll(this.currentPage);
      this.houselist.push(...res.data); //展开防止二倍数组
      this.currentPage++;
    },
  },
});

export default useHomeStore;
