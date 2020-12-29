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
import { reactive } from "vue";
export default {
  components: {
  },
  setup() {
    let formData = reactive({
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