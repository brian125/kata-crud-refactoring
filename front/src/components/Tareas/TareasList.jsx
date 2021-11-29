import React, { useContext, useEffect } from 'react';
import Store from '../common/Store';
import TodoForm from "../Todo/TodoForm";
import HOST_API from '../common/Connection';
import TodoList from "../Todo/TodoList";
import Banner from "../common/Banner";

const TareasList = () => {
	const { dispatch, state: { task, todo } } = useContext(Store);
	const currentList = task.taskList;
	const currentTodo = todo.todoList;

	useEffect(() => {
		fetch(HOST_API + "/tareas")
			.then(response => response.json())
			.then((taskList) => {
				dispatch({ type: "update-tasklist", taskList })
			})
	}, [dispatch]);

	const onDeleteTask = (id) => {
		currentTodo.forEach(item => {
			if (item.idList === id) {
				fetch(HOST_API + "/" + item.id + "/todo", {
					method: "DELETE"
				}).then((todoList) => {
					dispatch({ type: "delete-item", id })
				})
			}
		});
		fetch(HOST_API + "/" + id + "/tarea", {
			method: "DELETE"
		}).then((taskList) => {
			dispatch({ type: "delete-task", id })
		})
	};

	return <div>
		{currentList.map((item) => {
			return <div key={item.id}>
				<div>
					<div>
						<div>
							<div>
								<Banner />
								<button
									type="button"
									onClick={() => onDeleteTask(item.id)}
								>Eliminar</button>
							</div>
						</div>
						<div>
							<div>
								<h3>{item.name}</h3>
							</div>
						</div>
						<div>
							<div>
								<TodoForm TaskListId={item.id} />
							</div>
						</div>
					</div>
					<div>
						<TodoList TaskListId={item.id} />
					</div>
				</div>
			</div>
		})}
	</div>;
}

export default TareasList;