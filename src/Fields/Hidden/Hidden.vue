<template>
  <input :name="key" type="text" :value="value" hidden />
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
export default {
  name: "OctoFormHidden",
  mixins: [fieldMixin],
  props: ["value"]
};
</script>
