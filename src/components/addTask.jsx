import React, { useState } from 'react'

const AddTask = ({ addTask }) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [dueDate, setDueDate] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (!title || !dueDate) {
			setError('Обязательно заполните поля заголовка и дедлайна')
			return
		}
		addTask({ title, description, dueDate })
		setTitle('')
		setDescription('')
		setDueDate('')
		setError('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Заголовок'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Описание'
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
			<input
				type='date'
				value={dueDate}
				onChange={e => setDueDate(e.target.value)}
			/>
			{error && <p>{error}</p>}
			<button type='submit'>Добавить задачу</button>
		</form>
	)
}

export default AddTask
