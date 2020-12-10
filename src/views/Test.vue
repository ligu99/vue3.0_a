<template>
  <div class="test">
    <a-button type="primary" @click="getAttr">点击1</a-button>
    <ul>
      <li
        style="float: left;margin-right: 10px;"
        v-for="item in formData.cpc_ebs_type.list"
        :key="item.id"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
import { getApi } from "@/api/base";
export default {
  setup() {
    let formData = reactive({
      month: "",
      cpc_ebs_type: "",
      volumes: ""
    });

    let getAttr = () => {
      getApi({ url: "v1//gw/order/operation/Get?operationId=cpc.ebs" }).then(res => {
        let { data: { attr } } = res.data
        console.log(attr)
        for (let key in attr) {
          console.log(attr[key].tpId)
          getTpid(attr[key].tpId)
        }
      })
    }
    let getTpid = (tpid) => {
      getApi({ url: `v1/gw/order/operation/GetProperty?operationId=cpc.ebs&tpId=${tpid}` }).then(res => {
        let { data } = res.data;
        if (data.pId === "month") {
          formData.month = data
        } else if (data.pId === "cpc_ebs_type") {
          formData.cpc_ebs_type = data
        } else if (data.pId === "volumes") {
          formData.volumes = data
        }
        console.log(data)
        console.log(formData)
      })
    }
    return {
      formData,
      getAttr
    }
  }
}
</script>

<style>
</style>