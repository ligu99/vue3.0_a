<template>
  <div class="test">
    <a-spin v-if="loading" />
    <div v-else>
      <a-button type="primary">询价测试</a-button>
      <ul>
        <li
          style="float: left; margin-right: 10px"
          v-for="item in formData.cpc_ebs_type.list"
          :key="item.id"
          @click="seletType(item.id)"
        >{{ item.name }}</li>
      </ul>
      <div>
        <a-input-number
          id="inputNumber"
          v-model:value="formData.month"
          :min="1"
          :max="10"
          @change="getPrice"
        />
        月份：{{ formData.month }}
      </div>
      <div>
        <a-input-number
          id="inputNumber"
          v-model:value="formData.volumes"
          :min="1"
          :max="10"
          @change="getPrice"
        />
        数据盘：{{ formData.volumes }}
      </div>
      <div>原价：{{ moneyFormat(priceData.originalTotal) }}</div>
      <div>优惠价：{{ moneyFormat(priceData.total) }}</div>
      <div>
        测试正则：
        <a-input v-model:value="testData.regValue" @change="changestr" placeholder="Basic usage" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, onMounted } from "vue";
import { getApi, getParamsApi } from "@/api/base";
export default {
  setup() {
    let formData = reactive({
      month: 1,
      cpc_ebs_type: "",
      volumes: 1,
      typeId: ""
    });

    let loading = ref(true);

    let testData = reactive({
      regValue: ''
    });

    let priAttr = computed(() => {
      return {
        month: formData.month,
        cpc_ebs_type: formData.typeId,
        volumes: formData.volumes,
        operationId: "cpc.ebs"
      };
    });
    let priceData = reactive({
      originalTotal: "",
      total: ""
    });
    // 获取tpid
    let getAttr = () => {
      getApi({ url: "/v1/gw/order/operation/Get?operationId=cpc.ebs" }).then(res => {
        let { data: { attr } } = res.data;
        let attrTpid = {};
        for (let key in attr) {
          attrTpid[key] = attr[key].tpId;
        }
        // console.log(attrTpid);
        getTpid(attrTpid['cpc_ebs_type']);
      });
    };
    //获取参数
    let getTpid = (tpid) => {
      getApi({ url: `/v1/gw/order/operation/GetProperty?operationId=cpc.ebs&tpId=${tpid}` }).then(res => {
        let { data } = res.data;
        // if (data.pId === "cpc_ebs_type") {
        //   formData.cpc_ebs_type = data;
        // }
        // else if (data.pId === "cpc_ebs_type") {
        //   formData.cpc_ebs_type = data
        // } else if (data.pId === "volumes") {
        //   formData.volumes = data
        // }
        switch (data.pId) {
          case "cpc_ebs_type":
            formData.cpc_ebs_type = data;
            formData.typeId = formData.cpc_ebs_type.list[0].id;
            break;
          default:
            return;
        }
        loading.value = false;
        getPrice();
      });
    };
    // 选择类型
    let seletType = (id) => {
      formData.typeId = id;
      getPrice();
    };
    // 询价
    let getPrice = () => {
      getParamsApi({ url: `/v1/gw/order/operation/GetPrice2`, data: priAttr.value }).then(res => {
        Object.assign(priceData, res.data.data);
        // console.log(priceData);
      });
    };
    let changestr = () => {
      console.log(testData.regValue)
      // const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(www\.)?(ctyun){1}(\.cn\/){1}/;
      const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(www\.)?(ctyun){1}(\.cn)(?=\/|$)/;//如果有/就得匹配，没/就不匹配；.cna .cnb .cnx 不符合
      let re = new RegExp(strRegex);
      console.log(re.test(testData.regValue))
    };
    //格式化价格 
    let moneyFormat = (val) => {
      console.log(val)
      val = val / 100;
      if (val.toString().indexOf('.') !== -1) {//带小数点
        let b = val.toLocaleString();
        return b;
      } else {//不带小数点
        let c = val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return `${c}.00`;
      }
    };
    onMounted(() => {
      console.log("onMounted");
      getAttr();
    });
    return {
      formData,
      getAttr,
      seletType,
      getPrice,
      priceData,
      loading,
      testData,
      changestr,
      moneyFormat
    };
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