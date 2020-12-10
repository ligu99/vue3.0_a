<template>
  <div class="test">
    <a-button type="primary" @click="getAttr">点击</a-button>
    <ul>
      <li
        style="float: left;margin-right: 10px;"
        v-for="item in formData.cpc_ebs_type.list"
        :key="item.id"
        @click="seletType(item.id)"
      >{{item.name}}</li>
    </ul>
    <div>
      <a-input-number
        id="inputNumber"
        v-model:value="formData.month"
        :min="1"
        :max="10"
        @change="getPrice"
      />
      当前值：{{ formData.month }}
    </div>
    <div>
      <a-input-number
        id="inputNumber"
        v-model:value="formData.volumes"
        :min="1"
        :max="10"
        @change="getPrice"
      />
      当前值：{{ formData.volumes }}
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { getApi, getParamsApi } from "@/api/base";
export default {
  setup() {
    let formData = reactive({
      month: 1,
      cpc_ebs_type: "",
      volumes: 1
    });

    let priAttr = {
      month: formData.month,
      cpc_ebs_type: "",
      volumes: formData.volumes,
      operationId: "cpc.ebs"
    }
    let getAttr = () => {
      getApi({ url: "/v1/gw/order/operation/Get?operationId=cpc.ebs" }).then(res => {
        let { data: { attr } } = res.data
        console.log(attr)
        for (let key in attr) {
          console.log(attr[key].tpId)
          getTpid(attr[key].tpId)
        }
      })
    };
    let getTpid = (tpid) => {
      getApi({ url: `/v1/gw/order/operation/GetProperty?operationId=cpc.ebs&tpId=${tpid}` }).then(res => {
        let { data } = res.data;
        if (data.pId === "cpc_ebs_type") {
          formData.cpc_ebs_type = data
        }
        // else if (data.pId === "cpc_ebs_type") {
        //   formData.cpc_ebs_type = data
        // } else if (data.pId === "volumes") {
        //   formData.volumes = data
        // }
        console.log(data)
        console.log(formData)
      })
    };
    let seletType = (id) => {
      priAttr.cpc_ebs_type = id
    };
    let getPrice = () => {
      getParamsApi({ url: `/v1/gw/order/operation/GetPrice2`, data: priAttr }).then(res => {
        console.log(res.data)
      })
    }
    return {
      formData,
      getAttr,
      seletType,
      getPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  ul {
    overflow: hidden;
  }
}
</style>