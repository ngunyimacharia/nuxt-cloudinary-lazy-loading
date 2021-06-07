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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
}
</script>