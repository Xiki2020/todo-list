<template>
  <div class="statistic">
    <div class="statistic__count-tasks">
      {{ countTasks }} tasks
    </div>
    <div class="statistic__descr">
      {{ name }}
    </div>
    <div class="statistic__visually">
      <div 
        v-if="!countTasks"
        class="statistic__visually-start"
        :class="`statistic__visually-progress--${color}`" 
      />
      <div 
        v-else
        class="statistic__visually-progress"
        :class="`statistic__visually-progress--${color}`"
        :style="`width: ${getStatistics}%;`"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoListStatistics',

  props: {
    color: {
      type: String,
      reqired: true,
      default: () => 'iris',
    },

    countAllTasks: {
      type: Number,
      reqired: true,
      default: () => null,
    },

    countTasks: {
      type: Number,
      reqired: true,
      default: () => null,
    },

    name: {
      type: String,
      reqired: true,
      default: () => '',
    },
  },

  computed: {
    getStatistics() {
      return this.countTasks / this.countAllTasks * 100
    }
  }
}
</script>

<style lang="scss" scoped>
.statistic {
  background-color: rgba($color: $black, $alpha: 0.05);
  border-radius: 0.5rem;
  color: $black;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  padding: 1rem;
  width: 100%;
}

.statistic__count-tasks {
  color: rgba($color: $black, $alpha: 0.5);
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.statistic__visually {
  background-color: rgba($color: $black, $alpha: 0.07);
  border-radius: 0.5rem;
  height: 4px;
  margin-top: 0.75rem;
  width: 100%;
}

.statistic__visually-start {
  height: 100%;
  width: 1px;

  &--iris {
    background-color: $iris;
  }

  &--pink {
    background-color: $pink;
  }
}

.statistic__visually-progress {
  border-radius: 0.5rem;
  height: 100%;
  width: 0%;

  &--iris {
    background-color: $iris;
  }

  &--pink {
    background-color: $pink;
  }
}
</style>