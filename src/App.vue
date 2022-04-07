<template>
  <div class="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from '@/components/TodoListComponent.vue'
export default {
  name: "App",

  components: {
    TodoList
  }
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
