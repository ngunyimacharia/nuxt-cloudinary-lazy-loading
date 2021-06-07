<template>
  <div class="bg-black">
    <div class="flex relative text-center">
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
      <cld-image
        class="w-full object-cover h-72 block mx-auto sm:block sm:w-full"
        width="1920"
        height="288"
        :public-id="backgroundImage.public_id"
        gravity="auto:subject"
        fetchFormat="auto"
        quality="auto"
        :alt="`${board.name} hero image`"
      />
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
  computed: {
    backgroundImage() {
      const image =
        this.board.images[Math.floor(Math.random() * this.board.images.length)]
      console.log(image)
      return image
    },
  },
}
</script>