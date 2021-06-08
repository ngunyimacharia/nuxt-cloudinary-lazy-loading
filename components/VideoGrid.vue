<template>
  <div>
    <div class="p-5 mx-auto max-w-screen-xl">
      <div
        class="
          grid grid-flow-row-dense grid-cols-2
          gap-3
          justify-between
          sm:grid-cols-3
          md:grid-cols-4
        "
      >
        <div v-for="video in board.videos" :key="video.public_id">
          <lazy-video
            :video="video"
            class="mb-1 border-solid w-full hover:border-yellow-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyVideo from './VideoGrid/LazyVideo.vue'

export default {
  components: {
    LazyVideo,
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
}
</script>