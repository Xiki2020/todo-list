<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>
<style lang="scss" scoped>
.app {
  align-items: center;
  background: $bg-color;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}
</style>
