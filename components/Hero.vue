<template>
  <div class="flex w-full h-72 text-center" :lazy-background="backgroundUrl">
    <h1
      class="
        text-3xl
        tracking-wider
        text-white text-sha
        uppercase
        font-bold
        p-4
        self-center
        z-10
        content-center
        absolute
        text-center
        w-full
        md:text-4xl
      "
    >
      {{ board.name }}
    </h1>
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
}
</script>