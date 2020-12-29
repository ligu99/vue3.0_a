<template>
  <div>
    <a-form layout="inline" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Activity name">
        <a-input v-model:value="formData.name" />
      </a-form-item>

      <a-form-item label="Activity zone">
        <a-select v-model:value="formData.region" placeholder="please select your zone">
          <a-select-option value="shanghai"> Zone one </a-select-option>
          <a-select-option value="beijing"> Zone two </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  components: {
  },
  setup() {
    let formData = reactive({
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      name: ""
    });
    return {
      formData
    };
  }
}
</script>

<style>
</style>