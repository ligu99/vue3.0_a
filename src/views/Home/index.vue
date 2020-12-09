<template>
  <div class="index" @click="click">home</div>
</template>

<script>
import { getApi } from "@/api/login";
export default {

  setup() {
    let click = () => {
      let url = "/v1/s/q04sv38ZSzTBF4mEHo+3dVsyWITNHb2AHhoKmmcfMQvFLURsx3V4aUR26W8PQUqCSaa+Jm++DRZ9OBs55XAJDQyzq0eJOMiIR1DqFyeHkjiFz/TPP8FfRddLJaCyZHeBqfEnQtelvIQ="
      getApi({
        url: url
        /**
         * 相当于请求http://localhost:8080/v1/portal/menu/GetTree?domain=agent
         * 由于设置了代理
         * 最终请求的是https://wwwtest.ctyun.cn:21443/v1/portal/menu/GetTree?domain=agent
        */

      }).then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }

    return {
      click
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  position: relative;
}
</style>