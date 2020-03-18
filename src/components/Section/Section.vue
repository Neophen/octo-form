<template>
  <o-h size="2" :type="sectionType">{{ title }}</o-h>
</template>

<script>
import { fieldMixin } from "../../utils/fieldMixin.js";
export default {
  name: "OctoFormSection",
  mixins: [fieldMixin]
};
</script>
