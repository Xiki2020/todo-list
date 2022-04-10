<template>
  <div class="todo-list">
    <IllustrationSvg />
    <h2 class="todo-list__title">
      Today I need to
    </h2>
    <form
      class="todo-list__form form"
      @submit.prevent=""
    >
      <input
        v-model="valueInput"
        type="text"
        placeholder="Add new todo..."
        class="form__input"
      >
      <button
        v-if="isViewBtn"
        class="form__button"
        @click="addTodo"
      >
        Submit
      </button>
    </form>
    <div
      v-if="getTodoList.length"
      class="todo-list__content"
    >
      <div class="todo-list__todo-items">
        <div 
          v-for="todoItem in getFilterTodoList"
          :key="todoItem.id"
          class="todo-list__todo-item todo-item"
          :class="{
            'todo-item--complieted': todoItem.todoStatus
          }"
        >
          <IconDrag 
            v-if="!isEditTodo"
            class="todo-item__icon-drag"
          />
          <input
            class="todo-item__checkbox"
            type="checkbox"
            :checked="todoItem.todoStatus"
            @input="editStatusTodo(todoItem.id, $event)"
          >
          <div 
            v-if="!todoItem.isEdit"
            class="todo-item__value"
          >
            {{ todoItem.todoValue }}
          </div>
          <form 
            v-else
            class="todo-item__edit"
            @submit.prevent="saveEditTodo(todoItem.id, $event)"
          >
            <input 
              class="todo-item__input"
              :value="todoItem.todoValue"
              autofocus
            >
            <button class="todo-item__btn-submit">
              Save
            </button>
          </form>
          <div class="todo-item__icons-control">
            <IconEdit 
              v-if="!isEditTodo"
              @click="editTodo(todoItem.id)"
            />
            <IconDelete 
              @click="deleteTodo(todoItem.id)" 
            />
          </div>
        </div>
      </div>
      <div class="todo-list__container-statistics">
        <TodoListStatistics 
          :color="'iris'"
          :count-all-tasks="getTodoList.length"
          :count-tasks="getTodoListComplitedCount"
          :name="'Completed'"
        />
        <TodoListStatistics 
          :color="'pink'"
          :count-all-tasks="getTodoList.length"
          :count-tasks="getTodoListUnfulfilledCount"
          :name="'To be finished'"
        />
      </div>
      <div class="todo-list__btns-control">
        <div
          class="todo-list__btn-control"
          :class="{
            'todo-list__btn-control--hidden': isAllTodoComplited
          }"
          @click="checkAllTodo"
        >
          Check All
        </div>
        <div 
          class="todo-list__btn-control"
          :class="{
            'todo-list__btn-control--active': statusSort === 'All'
          }"
          @click="showAllTodo"
        >
          All
        </div>
        <div 
          v-if="isTodoVarious"
          class="todo-list__btn-control"
          :class="{
            'todo-list__btn-control--active': statusSort === 'Active'
          }"
          @click="showActiveTodo"
        >
          Active
        </div>
        <div 
          v-if="isTodoVarious"
          class="todo-list__btn-control"
          :class="{
            'todo-list__btn-control--active': statusSort === 'Complited'
          }"
          @click="showComplitedTodo"
        >
          Complited
        </div>
        <div 
          class="todo-list__btn-control"
          :class="{
            'todo-list__btn-control--hidden': !isTodoComplited
          }"
          @click="clearComplitedTodo"
        >
          Clear complited
        </div>
      </div>
    </div>
    <div 
      v-else
      class="todo-list__footer footer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.561 7.44409L12.005 15.0001L8.228 11.2221"
          stroke="#8F99A3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C13.453 3 14.821 3.353 16.036 3.964"
          stroke="#8F99A3"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="footer__text">Congrat, you have no more tasks to do</span>
    </div>
  </div>
</template>

<script>
import IconDelete from '@/assets/IconDelete.vue'
import IconDrag from '@/assets/IconDrag.vue'
import IconEdit from '@/assets/IconEdit.vue'
import IllustrationSvg from '@/assets/IllustrationSvg.vue'
import TodoListStatistics from '@/components/TodoListStatistics.vue'
import { getUniqId } from "@/utils/common"

import { mapGetters, mapActions } from "vuex"


export default {
  name: "TodoList",

  components: {
    IconDelete,
    IconDrag,
    IconEdit,
    IllustrationSvg,
    TodoListStatistics
  },

  data() {
    return {
      valueInput: '',
      isViewBtn: false,
      statusSort: 'All',
      isEditTodo: false
    }
  },

  computed: {
    ...mapGetters('todoList', ['getTodoList']),

    getFilterTodoList() {
      if(this.statusSort === 'Active') {
        return this.getTodoList.filter((todo) => !todo.todoStatus)
      }

      if(this.statusSort === 'Complited') {
        return this.getTodoList.filter((todo) => todo.todoStatus)
      }

      return this.getTodoList
    },

    getTodoListComplitedCount() {
      return this.getTodoList.filter((todo) => todo.todoStatus).length 
    },

    getTodoListUnfulfilledCount() {
      return this.getTodoList.filter((todo) => !todo.todoStatus).length 
    },

    isTodoComplited() {
      return this.getTodoList.some((todo) => todo.todoStatus)
    },

    isAllTodoComplited() {
      return this.getTodoList.every((todo) => todo.todoStatus)
    },

    isTodoVarious() {
      const isTodoComplited = this.getTodoList.some((todo) => todo.todoStatus)
      const isTodoUnfulfilled = this.getTodoList.some((todo) => !todo.todoStatus)

      return isTodoComplited && isTodoUnfulfilled
    },
  },

  watch: {
    valueInput(value) {
      if(value.length > 0) {
        this.isViewBtn = true
        return
      }

      this.isViewBtn = false
    },
  },

  methods: {
    ...mapActions('todoList', ['editTodoList']),

    addTodo() {
      const todoList = this.getTodoList
      todoList.unshift(
        {
          id: getUniqId(),
          todoValue: this.valueInput,
          todoStatus: false,
          isEdit: false
        }
      )
      this.editTodoList(todoList)
      this.valueInput = ''
    },

    checkAllTodo() {
      const todoList = this.getTodoList
      for(let i = 0; i < todoList.length; i++) {
        todoList[i].todoStatus = true
      }
      this.editTodoList(todoList)
    },

    clearComplitedTodo() {
      this.editTodoList(this.getTodoList.filter((todo) => !todo.todoStatus))
    },

    deleteTodo(id) {
      const todoList = this.getTodoList
      todoList.map((todo, index) => {
        if(todo.id === id) {
          todoList.splice(index, 1)
        }
      })
      this.editTodoList(todoList)
    },

    editTodo(id) {
      this.isEditTodo = true
      const todoList = this.getTodoList
      todoList.map((todo, index) => {
        if(todo.id === id) {
          todoList[index].isEdit = true
        }
      })
      this.editTodoList(todoList)
    },

    editStatusTodo(id, event) {
      const todoList = this.getTodoList
      todoList.map((todo, index) => {
        if(todo.id === id) {
          todoList[index].todoStatus = event.target.checked
        }
      })
      this.editTodoList(todoList)
    },

    saveEditTodo(id, event) {
      const todoList = this.getTodoList
      todoList.map((todo, index) => {
        if(todo.id === id) {
          todoList[index].todoValue = event.target[0].value
          todoList[index].isEdit = false
        }
      })
      this.isEditTodo = false
      this.editTodoList(todoList)
    },

    showAllTodo() {
      this.statusSort = 'All'
    },

    showActiveTodo() {
      this.statusSort = 'Active'
    },

    showComplitedTodo() {
      this.statusSort = 'Complited'
    },
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
  padding: 2rem 8.75rem 2.25rem;
  width: 730px;
}

.todo-list__title {
  margin: 3rem 0 0;
}

.todo-list__form {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3.25rem;
  width: 100%;
}

.form__input {
  border: 1px solid $ligth-gray;
  border-radius: 0.5rem;
  height: 40px;
  max-width: 320px;
  outline: none;
  padding: 0.75rem;
  transition: $transition-base;
  width: 100%;

  &::placeholder {
    color: $gray;
  }

  &:focus {
    box-shadow: $shadow-base;
  }
}

.form__button {
  background-color: $primary;
  border: none;
  border-radius: 0.5rem;
  color: $white;
  cursor: pointer;
  font-weight: 600;
  outline: none;
  width: 75px;

  &:hover {
    box-shadow: $shadow-base;
  }
}

.todo-list__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 2.625rem;
  width: 100%;
}

.todo-list__todo-items {
  max-height: 85px;
  overflow: auto;
  padding:0.2rem 1.125rem;
}

.todo-item {
  display: flex;
  position: relative;

  & + & {
    margin-top: 1.25rem;
  }

  &--complieted {
    color: rgba($color: $black, $alpha: 0.5);
  }

  &:hover .todo-item__icon-drag {
    opacity: 0.5;
  }
}

.todo-item__icon-drag {
  cursor: pointer;
  left: -1rem;
  position: absolute;
  opacity: 0;
  transition: $transition-base;
}

.todo-item__checkbox {
  height: 1rem;
  margin: 0;
  margin-right: 0.625rem;
  width: 1rem;
}

.todo-item__value {
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.todo-item__edit {
  margin-right: 1rem;
  position: relative;
  width: 100%;
}

.todo-item__input {
  border: 1px solid $ligth-gray;
  border-radius: 0.5rem;
  outline: none;
  padding: 0 4rem 0 0.75rem;
  transition: $transition-base;
  width: 100%;

  &:focus {
    box-shadow: $shadow-base;
  }
}

.todo-item__btn-submit {
  background-color: $primary;
  border: none;
  border-radius: 0.5rem;
  color: $white;
  cursor: pointer;
  font-weight: 600;
  position: absolute;
  right: 0;
  outline: none;
  width: 60px;

  &:hover {
    box-shadow: $shadow-base;
  }
}

.todo-item__icons-control {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.todo-list__container-statistics {
  display: flex;
  gap: 1.875rem;
  justify-content: space-between;
  margin-top: auto;
  padding: 0 1rem;
}

.todo-list__btns-control {
  align-items: center;
  color: $black;
  display: flex;
  font-size: 0.8125rem;
  font-weight: 600;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 0 2rem;
}

.todo-list__btn-control {
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }

  &--active {
    background-color: $primary;
    color: $white;
  }

  &--hidden {
    visibility: hidden;
  }
}

.todo-list__footer {
  align-items: center;
  color: $gray;
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.footer__text {
  line-height: 1;
}
</style>