<template>
  <div>
    <a-row>
      <a-form layout="inline" :model="formData">
        <a-form-item label="name">
          <a-input v-model:value="formData.name" style="width: 100px" />
        </a-form-item>

        <a-form-item label="Activity zone">
          <a-select v-model:value="formData.region" placeholder="select zone">
            <a-select-option value="shanghai"> Zone one </a-select-option>
            <a-select-option value="beijing"> Zone two </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-row>
  </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance } from "vue";
import { postApi } from "@/api/base.js";
export default {
  components: {
  },
  setup() {
    onMounted(() => {
      const { proxy } = getCurrentInstance();
      console.log(proxy);
      getNewsData();
    });
    let formData = reactive({
      name: ""
    });

    let getNewsData = async () => {
      let { data } = await postApi({
        url: "/news/getList/",
        data: {
          pageNumber: 1,
          pageSize: 10
        }
      });
      console.log(data);
    };
    return {
      formData,
      getNewsData
    };
  }
}
</script>

<style>
</style>