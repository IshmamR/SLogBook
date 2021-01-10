import { useState, createContext, useContext } from 'react';

const SLogsContext = createContext();

const SLogsProvider = ({ children }) => {
	const [slogs, setSlogs] = useState([]);

	// REFRESH
	const refreshSlogs = async() => {
		try {
			const res = await fetch('api/getSLogs');
			const latestSlogs = await res.json();
			setSlogs(latestSlogs);
		} catch(err) {
			console.log(err);
		}
	}

	// ADD / CREATE
	const addSlog = async(description) => {
		try {
			const res = await fetch('api/createSLog', {
				method: 'POST',
				body: JSON.stringify({ description }),
				headers: {'Content-Type': 'application/json'}
			});
			const newSlog = await res.json();
			setSlogs(prev => {
				return [newSlog, ...prev]
			});
		} catch(err) {
			console.log(err);
		}
	}

	// UPDATE
	const updateSlog = async(updatedSlog) => {
		try {
			const res = await fetch('api/updateSLog', {
				method: 'PUT',
				body: JSON.stringify({ ...updatedSlog }),
				headers: {'Content-Type': 'application/json'}
			});
			await res.json();
			setSlogs(prev => {
				const existingSlogs = [...prev];
				const slogToUpdate = existingSlogs.find(slog => slog.id === updatedSlog.id);
				slogToUpdate.fields = updatedSlog.fields;
				return existingSlogs;
			});
		} catch(err) {
			console.log(err);
		}
	}

	// DELETE
	const deleteSlog = async(id) => {
		try {
			const res = await fetch('api/deleteSLog', {
				method: 'DELETE',
				body: JSON.stringify({ id }),
				headers: {'Content-Type': 'application/json'}
			});

			setSlogs(prev => {
				return prev.filter(slog => slog.id !== id);
			});
		} catch(err) {
			console.log(err);
		}
	}

	const returnValues = {
		slogs,
		setSlogs,
		refreshSlogs,
		updateSlog,
		deleteSlog,
		addSlog
	};
	return (
		<SLogsContext.Provider value={ returnValues }>
			{children}
		</SLogsContext.Provider>
	)
}

export { SLogsContext, SLogsProvider };