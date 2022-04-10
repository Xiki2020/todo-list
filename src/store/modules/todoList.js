export default {
	namespaced: true,
	actions: {
		editTodoList(ctx, todoList) {
			ctx.commit('setTodoList', todoList)
		}
	},
	mutations: {
		setTodoList(state, todoList) {
      localStorage.setItem('todoList', JSON.stringify(todoList))
			state.todoList = todoList
		}
	},
	state() {
		return {
			todoList: JSON.parse(localStorage.getItem('todoList')),
		}
	},
	getters: {
		getTodoList(state) {
			return state.todoList
		},
	},
}