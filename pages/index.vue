<template>
  <div>
    <div
      v-for="board in this.$store.state.modules.boards.boards"
      :key="board.name"
    >
      <Hero :board="board" />
      <ImageGrid :board="board" />
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
