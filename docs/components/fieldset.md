# Fieldset

```js
export const inputsFieldset = {
  section_input: {
    display: "Inputs",
    type: "section",
  },
  text: {
    display: "Text",
    type: "text",
    placeholder: "Text input...",
    validate: "max:150",
    localizable: true,
  },
  textarea: {
    display: "Textarea",
    type: "textarea",
    placeholder: "Textarea input...",
    validate: "max:1000",
    localizable: true,
  },
  radio_group: {
    display: "Radio group",
    type: "radio-group",
    default: "default",
    options: {
      default: "Default",
      other: "Other",
    },
  },
  number: {
    display: "Number",
    placeholder: "Number input...",
    type: "number",
    min: 0,
  },

  year: {
    display: "Year",
    type: "year",
    placeholder: "Please select a year..",
    min: 2000,
  },
  section_tags: {
    display: "Tags",
    type: "section",
  },
  tag: {
    display: "Tag",
    type: "single-tag",
    placeholder: "Please select a tag...",
    can_add: true,
    add_config: {
      title: "Add age restriction",
      taxonomy: "age_restrictions",
      fieldset: "taxonomies/age_restrictions_co",
    },
    options: [
      {
        label: "Tag 1",
        value: "tag-1",
      },
      {
        label: "Tag 2",
        value: "tag-2",
      },
      {
        label: "Tag 3",
        value: "tag-3",
      },
      {
        label: "Tag 4",
        value: "tag-4",
      },
      {
        label: "Tag 5",
        value: "tag-5",
      },
      {
        label: "Tag 6",
        value: "tag-6",
      },
    ],
  },
  tags: {
    display: "Tags",
    placeholder: "Select tags..",
    type: "tags",
    max_items: 3,
    can_add: true,
    add_config: {
      title: "Add a genre",
      taxonomy: "genres",
      fieldset: "taxonomies/genres_co",
    },
    options: [
      {
        label: "Tag 1",
        value: "tag-1",
      },
      {
        label: "Tag 2",
        value: "tag-2",
      },
      {
        label: "Tag 3",
        value: "tag-3",
      },
      {
        label: "Tag 4",
        value: "tag-4",
      },
      {
        label: "Tag 5",
        value: "tag-5",
      },
      {
        label: "Tag 6",
        value: "tag-6",
      },
    ],
  },
  list: {
    display: "List",
    type: "list",
    placeholder: "List input...",
    localizable: true,
  },
  section_Images: {
    display: "Images",
    type: "section",
  },
  avatar: {
    display: "Avatar",
    type: "avatar",
    quality: 1,
    width: 390,
    height: 390,
  },
  image: {
    display: "Image",
    type: "image",
    value: "/DianaAndMe.jpg",
    width: 1920,
    height: 1080,
  },
  // film_still_imgs: {
  //   display: "Film stills",
  //   type: "images",
  //   max_files: 3,
  //   container: "img_film",
  //   folder: "film_stills",
  //   quality: 3,
  //   width: 640,
  //   height: 360
  // },
};
```
