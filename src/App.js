import React, { useState, useCallback, useEffect } from 'react'
import AddTask from './components/addTask'
import TaskList from './components/taskList'
import './styles/App.css'

const App = () => {
	const [tasks, setTasks] = useState([])
	const [filter, setFilter] = useState('all')
	const [sortOrder, setSortOrder] = useState('asc')

	useEffect(() => {
		if (localStorage) {
			const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
			setTasks(storedTasks)
		}
	}, [])

	  const addTask = useCallback(task => {
			const newTask = { ...task, id: Date.now(), completed: false }
			setTasks(tasks => {
				const updatedTasks = [...tasks, newTask]
				localStorage.setItem('tasks', JSON.stringify(updatedTasks))
				return updatedTasks
			})
		}, [])

		const editTask = useCallback((id, updatedTask) => {
			setTasks(tasks => {
				const updatedTasks = tasks.map(task =>
					task.id === id ? { ...task, ...updatedTask } : task
				)
				localStorage.setItem('tasks', JSON.stringify(updatedTasks))
				return updatedTasks
			})
		}, [])

		const deleteTask = useCallback(id => {
			setTasks(tasks => {
				const updatedTasks = tasks.filter(task => task.id !== id)
				localStorage.setItem('tasks', JSON.stringify(updatedTasks))
				return updatedTasks
			})
		}, [])

		const toggleCompleted = useCallback(id => {
			setTasks(tasks => {
				const updatedTasks = tasks.map(task =>
					task.id === id ? { ...task, completed: !task.completed } : task
				)
				localStorage.setItem('tasks', JSON.stringify(updatedTasks))
				return updatedTasks
			})
		}, [])

	const filteredTasks = tasks.filter(task => {
		if (filter === 'all') {
			return true
		} else if (filter === 'completed') {
			return task.completed
		} else if (filter === 'uncompleted') {
			return !task.completed
		}
	})

	const sortedTasks = filteredTasks.sort((a, b) => {
		if (sortOrder === 'asc') {
			return new Date(a.dueDate) - new Date(b.dueDate)
		} else if (sortOrder === 'desc') {
			return new Date(b.dueDate) - new Date(a.dueDate)
		}
	})

	return (
		<div className='App'>
			<h1>Infotecs To-Do</h1>
			<AddTask addTask={addTask} />
			<div>
				<button onClick={() => setFilter('all')}>Все задачи</button>
				<button onClick={() => setFilter('completed')}>Выполненные задачи</button>
				<button onClick={() => setFilter('uncompleted')}>Невыполненные задачи</button>
			</div>
			<div>
				<button onClick={() => setSortOrder('asc')}>
					Сортировка даты по возрастанию
				</button>
				<button onClick={() => setSortOrder('desc')}>
					Сортировка даты по убыванию
				</button>
			</div>
			<TaskList
				tasks={sortedTasks}
				editTask={editTask}
				deleteTask={deleteTask}
				toggleCompleted={toggleCompleted}
			/>
		</div>
	)
}

export default App
