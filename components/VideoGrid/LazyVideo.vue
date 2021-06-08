<template>
  <video
    class="mb-1 border-solid w-full hover:border-yellow-500"
    :data-poster="thumbnailUrl"
    autoplay
    muted
    v-lazy-load
  >
    <source :data-src="videoUrl" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
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
}
</script>