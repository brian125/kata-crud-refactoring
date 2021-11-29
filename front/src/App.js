import React from "react";
import { StoreProvider } from "./components/common/Store";
import TareasList from "./components/Tareas/TareasList";
import TareasForm from "./components/Tareas/TareasForm";

function App() {
	return <div className="container">
		<StoreProvider>
			<TareasForm />
			<TareasList />
		</StoreProvider>
	</div>
}

export default App;
