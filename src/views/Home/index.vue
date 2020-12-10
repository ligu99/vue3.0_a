<template>
  <div class="home">
    <a-layout class="outwrap">
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { getApi } from "@/api/base";
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
.home {
  height: 100%;
  .ant-layout.ant-layout-has-sider {
    height: 100%;
  }
  .ant-layout {
    height: 100%;
  }
  .ant-layout-sider {
    height: 100%;
    float: left;
    color: #fff;
  }
  .ant-layout-header {
    background: #ccc;
    color: #fff;
  }
  .ant-layout-content {
    min-height: calc(100% - 134px);
  }
}
</style>
