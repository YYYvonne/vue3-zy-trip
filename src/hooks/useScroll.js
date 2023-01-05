import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from "vue";
import { throttle } from "underscore";

export default function useScroll() {
  const isReachBottom = ref(false);
  const scrollTop = ref(0);
  const clientHeight = ref(0);
  const scrollHeight = ref(0);

  //从调用处传回调函数
  // export default function useScroll(reachBottomCB) {
  //防抖节流
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight;
    scrollTop.value = document.documentElement.scrollTop;
    scrollHeight.value = document.documentElement.scrollHeight;
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("-------");
      console.log("滚动到底部了");
      isReachBottom.value = true;
      //   if (reachBottomCB) {
      //     reachBottomCB();
      //     //还可以设置reachBottom为false true ，html中侦听其变化调用数据请求并改回false
      //   }
    }
  }, 100);

  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  });
  onActivated(() => {
    window.addEventListener("scroll", scrollListenerHandler);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler);
  });
  onDeactivated(() => {
    window.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollHeight, scrollTop };
}
