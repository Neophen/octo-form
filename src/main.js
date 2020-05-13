import * as fields from "./Fields";

import Form from "./Form";
import Field from "./Field";

import "./styles/app.scss";

// To tell if it is installed or not
let _Vue = null;

const OctoForm = {
  extraFields: {},
  component(name, definition) {
    if (typeof name === "object") {
      definition = name;
      name = definition.name;
    }

    this.extraFields[name] = definition;
  },
  install(Vue) {
    // To not install twice
    if (_Vue) return;
    _Vue = Vue;

    // fields
    for (const field in fields) {
      OctoForm.component(fields[field].name, fields[field]);
    }

    // const fieldsContainer
    Vue.component(
      Field.name,
      Vue.extend(Field).extend({
        components: this.extraFields
      })
    );
    Vue.component(Form.name, Form);
  }
};

export default OctoForm;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(OctoForm);
}
