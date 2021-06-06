<template>
  <div>
    <Hero />
    <ImageGrid />
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$cloudinary)
  },
}
</script>
