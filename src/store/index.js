import { createStore } from 'vuex'
import todoList from './modules/todoList'

const store = createStore({
	modules: {
    todoList
	}
})

export default store