import React, { useRef, useState, useContext } from 'react';
import HOST_API from '../common/Connection';
import Store from '../common/Store';

const TareasForm = () => {
	const formRef = useRef(null);
	const { dispatch, state: { task: tarea } } = useContext(Store);
	const item = tarea.item;
	const [state, setState] = useState(item);
	const vsExprReg = /[A-Za-z0-9_]/;

	const onAdd = (event) => {
		event.preventDefault();

		const request = {
			name: state.name,
			id: null,
		};

		if (vsExprReg.test(request.name)) {
			document.querySelector(".alertTareas").innerHTML = "";
			fetch(HOST_API + "/tareas", {
				method: "POST",
				body: JSON.stringify(request),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then((tarea) => {
					dispatch({ type: "add-task", item: tarea });
					setState({ name: "" });
					formRef.current.reset();
				});
		} else {
			document.querySelector(".alertTareas").innerHTML = "Solo utilice caracteres Alfanuméricos";
		}
	}

	return <div >
		<nav>
			<div>
				<p>Gestor de tareas</p>
				<div>
					<form ref={formRef}>
						<div>
							<input
								type="text"
								name="name"
								placeholder="Lista nueva..."
								defaultValue={item.name}
								onChange={(event) => {
									setState({ ...state, name: event.target.value })
								}} />
							<button onClick={onAdd} disabled={!state.name}>Nueva Lista</button>
						</div>

						<div className="alertTareas"></div>
					</form>
				</div>
			</div>
		</nav>
	</div>

};

export default TareasForm;