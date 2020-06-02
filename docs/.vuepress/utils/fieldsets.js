export const filmFieldset = {
  title: {
    display: "Film title",
    type: "text",
    validate: "required|max:150",
    localizable: true
  },
  section_title_director: {
    display: "Director",
    type: "section"
  },
  film_directors: {
    display: "Director(s) full name",
    type: "list"
  },
  film_directors_bio: {
    display: "Director's bio",
    type: "textarea",
    validate: "required|max:1000",
    localizable: true
  },
  section_title_metadata: {
    display: "Metadata",
    type: "section"
  },
  film_type: {
    display: "Film type",
    type: "radio-group",
    validate: "required",
    default: "feature",
    options: {
      feature: "Feature film",
      short: "Short film"
    }
  },
  film_trailer_link: {
    display: "Youtube Trailer link",
    type: "text",
    validate: "url"
  },
  film_original_title: {
    display: "Original film title",
    type: "text"
  },
  duration_in_minutes: {
    display: "Film duration in minutes",
    type: "number",
    validate: "required",
    min: 0,
  },
  age_restrictions: {
    display: "Age restriction",
    type: "single-tag",
    validate: "required",
    placeholder: "Please select age restriction",
    can_add: true,
    add_config: {
      title: "Add age restriction",
      taxonomy: "age_restrictions",
      fieldset: "taxonomies/age_restrictions_co",
    },
    options: [
      {
        label: 'N-7',
        value: 'n-7'
      },
      {
        label: 'N-13',
        value: 'n-13'
      },
      {
        label: 'N-14',
        value: 'n-14'
      },
      {
        label: 'N-16',
        value: 'n-16'
      },
      {
        label: 'N-18',
        value: 'n-18'
      },
      {
        label: 'F - family friendly',
        value: 'f-family-friendly'
      },
    ],
  },
  film_countries: {
    display: "Countries",
    type: "countries",
    validate: "required",
    placeholder: "Select countries...",
  },
  film_release_year: {
    display: "Year of the release",
    type: "year",
    validate: "required",
    placeholder: "Please select a year..",
    min: 2000,
  },
  film_external_link: {
    display: "Film website or other external link",
    type: "text",
    validate: "url"
  },
  genres: {
    display: "Select up to 3 genres",
    type: "tags",
    validate: "required",
    max_items: 3,
    can_add: true,
    add_config: {
      title: "Add a genre",
      taxonomy: "genres",
      fieldset: "taxonomies/genres_co",
    },
    options: [
      {
        label: 'Animation',
        value: 'animation'
      },
      {
        label: 'Drama',
        value: 'drama'
      },
      {
        label: 'Thriller',
        value: 'thriller'
      },
      {
        label: 'Historical',
        value: 'historical'
      },
      {
        label: 'Crime',
        value: 'crime'
      },
      {
        label: 'Musical',
        value: 'musical'
      },
    ],
  },
  film_languages: {
    display: "Film language",
    type: "languages",
    validate: "required"
  },
  film_subtitles_language: {
    display: "Subtitle language",
    type: "languages",
    validate: "required"
  },
  section_title_crew: {
    display: "Crew",
    type: "section"
  },
  film_producers: {
    display: "Producer(s)",
    type: "list"
  },
  film_scriptwriters: {
    display: "Scriptwriter(s)",
    type: "list"
  },
  film_composers: {
    display: "Music composer(s)",
    type: "list"
  },
  film_camera: {
    display: "Camera",
    type: "list"
  },
  film_actors: {
    display: "Starring",
    type: "list"
  },
  section_title_award_1: {
    display: "Award 1",
    type: "section"
  },
  film_award_1_title: {
    display: "Award 1 title",
    type: "text",
    validate: "max:50",
    localizable: true
  },
  film_award_1_description: {
    display: "Award 1 description",
    type: "text",
    validate: "max:50",
    localizable: true
  },
  section_title_award_2: {
    display: "Award 2",
    type: "section"
  },
  film_award_2_title: {
    display: "Award 2 title",
    type: "text",
    validate: "max:50",
    localizable: true
  },
  film_award_2_description: {
    display: "Award 2 description",
    type: "text",
    validate: "max:50",
    localizable: true
  }
};

export const inputsFieldset = {
  switch_test: {
    display: "Switch",
    type: "switch",
    // can_toggle: true,
  },
  svg: {
    display: "SVG upload",
    type: "svg",
    // can_toggle: true,
  },
  iamge_file: {
    display: "Image upload",
    type: "image-file",
    // can_toggle: true,
  },
  section_test: {
    display: "Test",
    type: "section",
    can_toggle: true,
  },
  text_for_tesst: {
    display: "Text",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "text",
    placeholder: 'Text input...',
    validate: "max:150",
  },
  switch: {
    display: "Switch",
    type: "switch",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    show_when: { text_for_tesst: 'any_value' }
  },
  show_if: {
    display: "Show if switch is on",
    type: "switch",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    show_when: { switch: true }
  },
  select_items: {
    show_when: { section_test: true },
    display: "Select items",
    type: "select-items",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    options: [
      {
        label: 'Films',
        value: "films",
      },
      {
        label: 'Sponsors',
        value: "sponsors",
      },
      {
        label: 'Events',
        value: "events",
      },
      {
        label: 'Recommendations',
        value: "recommendations",
      },
      {
        label: 'Bundles',
        value: "bundles",
      },
      {
        label: "Genre tags",
        value: 'genre-tags',
      },
      {
        label: 'Sections',
        value: "sections",
      },

    ]

  },
  date_range: {
    show_when: { section_test: true },
    display: "Date range",
    minDate: 'today',
    value: {
      start: '2020-03-31T00:00:00.000000Z',
      end: '2020-04-30T00:00:00.000000Z',
    },
    type: "date-range"
  },
  date_range_empty: {
    show_when: { section_test: true },
    display: "Date range empty",
    minDate: 'today',
    type: "date-range"
  },
  section_input: {
    display: "Inputs",
    type: "section",
    can_toggle: true,
  },
  text: {
    show_when: { section_input: true },
    display: "Text",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "text",
    placeholder: 'Text input...',
    validate: "max:150",
    localizable: true
  },
  textarea: {
    show_when: { section_input: true },
    display: "Textarea",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "textarea",
    placeholder: 'Textarea input...',
    validate: "max:1000",
    localizable: true
  },
  radio_group: {
    show_when: { section_input: true },
    display: "Radio group",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "radio-group",
    default: "default",
    options: {
      default: "Default",
      other: "Other"
    }
  },
  label_select: {
    show_when: { section_input: true },
    display: "Label select",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "label-select",
    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "Editor",
        value: "editor",
      },
      {
        label: "Attendee",
        value: "attendee",
      },
    ],
  },
  number: {
    show_when: { section_input: true },
    display: "Number",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    placeholder: 'Number input...',
    type: "number",
    min: 0,
  },

  year: {
    show_when: { section_input: true },
    display: "Year",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "year",
    placeholder: "Please select a year..",
    min: 2000,
  },
  date: {
    show_when: { section_input: true },
    display: "Date",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "date",
    placeholder: "Please select a date..",
    min: 2000,
  },
  partition_tags: {
    type: 'partition',
  },
  section_tags: {
    display: "Tags",
    type: "section"
  },
  tag: {
    display: "Tag",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
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
        label: 'Tag 1',
        value: 'tag-1'
      },
      {
        label: 'Tag 2',
        value: 'tag-2'
      },
      {
        label: 'Tag 3',
        value: 'tag-3'
      },
      {
        label: 'Tag 4',
        value: 'tag-4'
      },
      {
        label: 'Tag 5',
        value: 'tag-5'
      },
      {
        label: 'Tag 6',
        value: 'tag-6'
      },
    ],
  },
  tags: {
    display: "Tags",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
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
        label: 'Tag 1',
        value: 'tag-1'
      },
      {
        label: 'Tag 2',
        value: 'tag-2'
      },
      {
        label: 'Tag 3',
        value: 'tag-3'
      },
      {
        label: 'Tag 4',
        value: 'tag-4'
      },
      {
        label: 'Tag 5',
        value: 'tag-5'
      },
      {
        label: 'Tag 6',
        value: 'tag-6'
      },
    ],
  },
  list: {
    display: "List",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "list",
    placeholder: 'List input...',
    localizable: true
  },
  countries: {
    display: "Countries",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "countries",
    placeholder: "Select countries...",
  },
  languages: {
    display: "Languages",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "languages",
    placeholder: "Select languages..",
  },
  partition_images: {
    type: 'partition',
  },
  section_Images: {
    display: "Images",
    type: "section",
    can_toggle: true,
  },
  avatar: {
    display: "Avatar",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    type: "avatar",
    quality: 1,
    width: 390,
    height: 390,
  },
  image: {
    display: "Image",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    // can_toggle: true,
    has_focus: true,
    // validate: "required",
    type: "image",
    // value: "/DianaAndMe.jpg",
    width: 1920,
    height: 1080
  },
  images: {
    display: "Images",
    type: "images",
    // validate: "required",
    icon: "sample-badge",
    number: 1,
    tooltip: 'some tooltip',
    can_toggle: true,
    max_files: 3,
    value: [
      {
        id: "some-id",
        src: "/DianaAndMe.jpg",
      }
    ],
    width: 1920,
    height: 1080
  },
};

export const inputsFieldsetErrors = {
  text: ['text input is required'],
  textarea: ['textarea input is required'],
  radio_group: ['radio group input is required'],
  number: ['number input is required'],
  year: ['year input is required'],
  tag: ['tag input is required'],
  tags: ['tags input is required'],
  list: ['list input is required'],
  countries: ['countries input is required'],
  languages: ['languages input is required'],
  avatar: ['avatar input is required'],
  image: ['image input is required'],
}