<template>
  <o-field
    :label="title"
    :tooltip="tooltip"
    :can-toggle="can_toggle"
    :type="{ 'is-danger': error }"
    :message="error"
    :label-for="key"
    :icon="fieldIcon"
    :number="fieldNumber"
    :hasValue="!!computedValue"
  >
    <textarea :name="key" :value="computedValue" hidden />
    <tip-tap v-model="computedValue" :field="field" :key="key" />
  </o-field>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
import { vModelMixin } from "../../utils/vModelMixin.js";
import TipTap from "../../tip-tap/TipTap.vue";
export default {
  name: "OctoFormRichText",
  mixins: [vModelMixin, fieldMixin],
  components: {
    TipTap
  }
};
</script>
