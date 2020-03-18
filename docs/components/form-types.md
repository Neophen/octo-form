# Form types

## Default
<Demo componentName="examples-form-default-doc" />

#### Code
```html
<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Default</o-h>
    <octo-form :fieldset="defaultFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      defaultFieldset: {
        with_icon: {
          display: "Field with icon",
          type: "text",
          placeholder: "Enter some text...",
          icon: "contact-email",
          validate: "email|max:100",
          autocomplete: "email",
          inputType: "email"
        },
        with_number: {
          display: "Field with number",
          type: "text",
          placeholder: "Enter some text...",
          number: 99,
          validate: "max:100",
          autocomplete: "phone"
        },
        with_tooltip: {
          display: "Text with tooltip",
          type: "text",
          placeholder: "Enter some text...",
          tooltip:
            "Some information about the field, goes here.<br><br>It can contain html",
          validate: "max:100"
        },
        toggle_value: {
          display: "Field toggle, value provided",
          type: "text",
          placeholder: "Enter some text...",
          value: "Some value",
          canToggle: true,
          validate: "max:100"
        },
        toggle_nope: {
          display: "Field toggle, no value",
          type: "text",
          placeholder: "Enter some text...",
          canToggle: true,
          validate: "max:100"
        }
      }
    });

    return { ...toRefs(state) };
  }
};
</script>
```


## Link
<Demo componentName="examples-form-link-doc" />

#### Code
```html
<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Form with link</o-h>
    <octo-form :fieldset="linkFieldset" :config="linkConfig" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      linkFieldset: {
        email: {
          display: "Email",
          type: "text",
          validate: "required|email|max:100",
          autocomplete: "email",
          inputType: "email"
        },
        password: {
          display: "Password",
          type: "password",
          validate: "required",
          autocomplete: "password",
        }
      },
      linkConfig: {
        confirm: "Login",
        confirmDusk: "login-button",
        type: "link",
        secondary: "Forgot your password?",
        secondaryAction: () => {
          console.log("hey this is the secondary action");
        }
      }
    });

    return { ...toRefs(state) };
  }
};
</script>
```

## Accept
<Demo componentName="examples-form-accept-doc" />

#### Code
```html
<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Form with accept</o-h>
    <octo-form :fieldset="acceptFieldset" :config="acceptConfig">
      <div slot="accept">
        I agree to
        <o-button type="is-link" @click.stop>terms and conditions</o-button>
      </div>
    </octo-form>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      acceptFieldset: {
        email: {
          display: "Name",
          type: "text",
          autocomplete: "name",
          placeholder: "Name..."
        },
        phone: {
          display: "Phone",
          type: "text",
          autocomplete: "phone",
          placeholder: "Phone..."
        }
      },
      acceptConfig: {
        confirm: "Continue",
        confirmDusk: "continue-button",
        type: "accept",
        acceptName: 'remember',
      }
    });

    return { ...toRefs(state) };
  }
};
</script>
```

## Icons
<Demo componentName="examples-form-icons-doc" />

#### Code
```html
<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Icons</o-h>
    <octo-form :fieldset="iconFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      iconFieldset: {
        facebook: {
          display: "Link to Facebook profile",
          type: "text",
          icon: "contact-facebook",
          validate: "max:100"
        },
        slack: {
          display: "Slack username",
          type: "text",
          validate: "max:100",
          icon: "contact-slack"
        }
      }
    });

    return { ...toRefs(state) };
  }
};
</script>
```

## Numbered
<Demo componentName="examples-form-numbered-doc" />

#### Code
```html
<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Numbered</o-h>
    <octo-form :fieldset="numberedFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      numberedFieldset: {
        email: {
          display: "Email",
          type: "text",
          number: 1,
          validate: "email|max:100",
          autocomplete: "email",
          inputType: "email"
        },
        phone: {
          display: "Phone",
          type: "text",
          number: 2,
          validate: "max:100",
          autocomplete: "phone",
        },
      }
    });

    return { ...toRefs(state) };
  }
};
</script>
```

## Numbered + Icons
<Demo componentName="examples-form-numbered-icons-doc" />

#### Code
```html
<template>
  <div class="octo-box mb-4 mt-6">
    <o-h size="3" class="mb-4">Numbered + Icons</o-h>
    <octo-form :fieldset="numberedIconsFieldset" />
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";

export default {
  setup() {
    const state = reactive({
      numberedIconsFieldset: {
        email: {
          display: "Email",
          type: "text",
          number: 1,
          icon: 'contact-email',
          validate: "email|max:100",
          autocomplete: "email",
          inputType: "email"
        },
        phone: {
          display: "Phone",
          type: "text",
          number: 2,
          icon: 'contact-phone',
          validate: "max:100",
          autocomplete: "phone",
        },
      }
    });

    return { ...toRefs(state) };
  }
};
</script>
```

#### props

|Name|Description|Type|Values|Default|
|---|---|---|---|---|
|**prop_name**|description|type|values|default|

#### slots

|Name|Description|
|---|---|
|**slot_name**|this will display the text|

<portal-target name="octo-modals" transition="o-modal-transition" multiple />
<portal-target name="octo-datepicker" />