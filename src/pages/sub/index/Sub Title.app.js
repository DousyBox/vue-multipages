import Vue from "libs/vendor-vue.js";
import app from "./app.vue";

new Vue({
  render: h => h(app)
}).$mount("#app");
