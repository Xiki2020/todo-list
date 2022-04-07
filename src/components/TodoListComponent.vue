<template>
  <div class="todo-list">
    <IllustrationSvg />
    <h2 class="todo-list__title">
      Today I need to
    </h2>
  </div>
</template>

<script>
import IllustrationSvg from '@/assets/IllustrationSvg.vue'

export default {
  name: 'TodoList',

  components: {
    IllustrationSvg,
  }
}
</script>

<style lang="scss" scoped>
.todo-list {
  align-items: center;
  background-color: $white;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 720px;
  padding: 2rem 2rem 2.25rem;
  width: 730px;
}

.todo-list__title {
  margin: 3rem 0 0;
}
</style>