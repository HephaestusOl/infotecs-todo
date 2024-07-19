import React, { useState } from 'react'

const TaskList = ({ tasks, editTask, deleteTask, toggleCompleted }) => {
	const [editingTaskId, setEditingTaskId] = useState(null)
	const [editedTask, setEditedTask] = useState({
		title: '',
		description: '',
		dueDate: '',
	})

	const handleEdit = task => {
		setEditingTaskId(task.id)
		setEditedTask({
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
		})
	}

	const handleSave = () => {
		editTask(editingTaskId, editedTask)
		setEditingTaskId(null)
		setEditedTask({ title: '', description: '', dueDate: '' })
	}

	const handleCancel = () => {
		setEditingTaskId(null)
		setEditedTask({ title: '', description: '', dueDate: '' })
	}

	return (
		<ul>
			{tasks.map(task => (
				<li key={task.id}>
					{editingTaskId === task.id ? (
						<>
							<input
								type='text'
								value={editedTask.title}
								onChange={e =>
									setEditedTask({ ...editedTask, title: e.target.value })
								}
							/>
							<input
								type='text'
								value={editedTask.description}
								onChange={e =>
									setEditedTask({ ...editedTask, description: e.target.value })
								}
							/>
							<input
								type='date'
								value={editedTask.dueDate}
								onChange={e =>
									setEditedTask({ ...editedTask, dueDate: e.target.value })
								}
							/>
							<button onClick={handleSave}>Сохранить</button>
							<button onClick={handleCancel}>Отменить</button>
						</>
					) : (
						<>
							<input
								type='checkbox'
								checked={task.completed}
								onChange={() => toggleCompleted(task.id)}
							/>
							<h3>{task.title}</h3>
							<p>{task.description}</p>
							<p>Дедлайн: {task.dueDate}</p>
							<button onClick={() => handleEdit(task)}>Редактировать</button>
							<button onClick={() => deleteTask(task.id)}>Удалить</button>
						</>
					)}
				</li>
			))}
		</ul>
	)
}

export default TaskList
