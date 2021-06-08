## Background

To improve the performance of your application and save your system's resources while loading images or videos we need to use the technique `lazy-loading`.This is the practice of deferring the loading or initialization of resources or objects until they are actually needed.
In this Mediajam, we are going to learn how to use [nuxt.js](https://nuxtjs.org) a web application framework based on Vue.js to lazy-load images and videos.

# Nuxt lazy loading 

We are building a vision board project.

## NuxtJs Installation

https://nuxtjs.org/docs/2.x/get-started/installation

## Overview

Lazy loading allows our web pages to load quickly regardless of the volume of images and video content. This is especially useful for content heavy websites.

There are multiple approaches to achieve lazy loading:

HTML Attribute

- The HTML Image tag currently supports the `loading` attribute with the following values: `eager`, `lazy`

Intersection Observer API

https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

JavaScript packages

In order to lazy load media without the increased complexity of interacting with the browser level APIs, you may use plugnins. In this session, we shall be using https://www.npmjs.com/package/nuxt-lazy-load


### Cloudinary setup

install - https://cloudinary.nuxtjs.org/

Installation:

```
yarn add @nuxtjs/cloudinary

```

Configuration: 

File: `nuxt.config.js`
```
  modules: [
    ...
    '@nuxtjs/cloudinary',
    ...
  ],

```

Add environmtal variables:

`.env`

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Inject environmental variables safely:

`nuxt.config.js`
```
  privateRuntimeConfig: {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
```

Runtime config allows passing dynamic config and environment variables to the nuxt context. 

https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config#privateruntimeconfig

Add cloudinary configuration:

`nuxt.config.js`

```
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    useComponent: true
  },
```


### Nuxt Lazy Load setup

URL: https://www.npmjs.com/package/nuxt-lazy-load

Install:

```
yarn add nuxt-lazy-load
```

Setup

File: `nuxt.config.js`


```
  modules: [
    ...
    'nuxt-lazy-load'
    ...
  ],
```

### Fetch images and videos to display by tag

Upload images / videos to your cloudinary account. You may add tags for easy fetching via the admin API.

To ensure your API Key / Secret are kept safe and away from your front-end application, let's perform the API call via our vuex store

https://vuex.vuejs.org/

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.
#

File: `store\index.js`
```
export const actions = {
    async nuxtServerInit({ dispatch }) {
        // Trigger load action in boards module
        await dispatch('modules/boards/load')
    }
}

```

File `boards.js`

```

// We set the tags we want to obtain
export const state = () => ({
    boards: [
        { name: "cars", images: [], videos: [] },
        { name: "houses", images: [], videos: [] },
        { name: "vacation", images: [], videos: [] }
    ]
})

// Fetch and set image and video list by tag from cloudinary API
export const actions = {
    async load({ state }) {
        const cloudName = this.$config.cloudinaryCloudName;

        const axios = this.$axios;

        const boards = state.boards;

        for (const index in boards) {

            const imageUrl = `http://res.cloudinary.com/${cloudName}/image/list/${boards[index].name}.json`;

            const images = await axios.$get(imageUrl);

            boards[index].images = images.resources;

            const videoUrl = `http://res.cloudinary.com/${cloudName}/video/list/${boards[index].name}.json`;

            const videos = await axios.$get(videoUrl);

            boards[index].videos = videos.resources;

        }

        state.boards = boards;
    }
}

```

### Display content

Let's display each of the boards we have. For each we'll display:
- Hero image (Random banner image) + title
- Images
- Videos

`pages/index.vue`
```
    <div
      v-for="board in this.$store.state.modules.boards.boards"
      :key="board.name"
    >
      <Hero :board="board" />
      <ImageGrid :board="board" />
      <VideoGrid :board="board" />
    </div>
```

### Lazy load background image (Hero)

Get a random image to display and return image url:

File: `components\Hero.vue`

```
  computed: {
    backgroundUrl() {
      const image =
        this.board.images[Math.floor(Math.random() * this.board.images.length)]

      return this.$cloudinary.image.url(image.public_id, {
        class: 'w-full object-cover h-72 block mx-auto sm:block sm:w-full',
        width: '1920',
        height: '288',
        gravity: 'auto:subject',
        fetchFormat: 'auto',
        quality: 'auto',
        crop: 'fill',
      })
    },
  },
```

Lazy load image using ` nuxt-lazy-load` package. We do this by adding a `lazy-background` attribute to the div

File: `components\Hero.vue`

```
<div class=".." :lazy-background="backgroundUrl">
 ...
</div> 
```


### Lazy loading images

Loop through all images in board / tag.

Use `cld-image` component to display image.

Use `loading` attribute on `cld-image` component to lazy load the images.

File: `components\ImageGrid.vue`

```
   <div v-for="image in board.images" :key="image.public_id">
          <cld-image
            :public-id="image.public_id"
            width="200"
            height="200"
            crop="fill"
            gravity="auto:subject"
            fetchFormat="auto"
            quality="auto"
            class="mb-1 border-solid w-full hover:border-yellow-500"
            :alt="`${image.public_id} image`"
            loading="lazy"
          />
        </div>
```

### Lazy loading videos

Loop through all videos from cloudinary:

File: `components\VideoGrid.vue`

```
<div v-for="video in board.videos" :key="video.public_id">
    <lazy-video
            :video="video"
            class="mb-1 border-solid w-full hover:border-yellow-500"
          />
</div>
```

Compute video url and thumbnail url from cloudinary's API: 

``` components\VideoGrid\LazyVideo.vue
  computed: {
    videoUrl() {
      return this.$cloudinary.video.url(this.video.public_id, {
        controls: true,
        crop: 'fill',
        format: 'mp4',
        width: 200,
        height: 200,
        quality: 'auto',
      })
    },

    thumbnailUrl() {
      const { url } = this.$cloudinary.video.thumbnail(this.video.public_id, {
        version: this.video.version,
        crop: 'fill',
        width: 200,
        height: 200,
      })
      return url
    },
  },
```

Lazy load video using `v-lazy-load` attribute on html `video` element.
You may also specify the poster using `data-poster` attribute.

File: `components\VideoGrid\LazyLoad.vue`
```
  <video
    class="..."
    :data-poster="thumbnailUrl"
    autoplay
    muted
    v-lazy-load
  >
    <source :data-src="videoUrl" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
```
