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
    <tip-tap v-model="computedValue" :field="field" />
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
