import { defineStore } from "pinia";
import { getCityAll } from "@/services/index";

const useCityStore = defineStore("city", {
  state: () => ({
    allCities: {}, //定义默认的空对象数据，防止获取数据失败时报错，普通获值时，防错用？

    currentCity: {
      cityName: "福州",
    }, //定义为对象，因为需要获取name，id
  }),

  //通过this获取其它的store属性
  actions: {
    async fetchCityAllData() {
      const res = await getCityAll();
      this.allCities = res.data;
    },
  },
});

export default useCityStore;
