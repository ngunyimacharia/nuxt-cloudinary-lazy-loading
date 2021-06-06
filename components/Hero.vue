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
        {{ backgroundImage }}
      </h1>
      <img
        class="w-full object-cover h-72 block mx-auto sm:block sm:w-full"
        src="https://images.unsplash.com/photo-1505934333218-8fe21ff87e69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="Banner"
        width="1920"
        height="288"
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