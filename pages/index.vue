<template>
  <div>
    <div class="h-screen flex flex-col justify-center items-center text-center">
      <h1 class="text-2xl font-bold mb-20">Lazy loading using cloudinary</h1>
      <ul class="list-disc text-left text-2xl mb-20">
        <li>Images</li>
        <li>Background images</li>
        <li>Videos</li>
      </ul>
      <p class="text-2xl">Scroll to view lazy loading media</p>
    </div>
    <div
      v-for="board in this.$store.state.modules.boards.boards"
      :key="board.name"
    >
      <Hero :board="board" />
      <ImageGrid :board="board" />
      <VideoGrid :board="board" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    boards() {
      return this.$store.state.modules.boards.boards
    },
  },
}
</script>
