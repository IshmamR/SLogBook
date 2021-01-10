import React, { useContext } from 'react';
import { SLogsContext } from '../contexts/SLogsContext';

const SLog = ({ slog }) => {
	const { updateSlog, deleteSlog } = useContext(SLogsContext);

	const handleToggleCompleted = () => {
		const fieldsUpdated = {
			...slog.fields,
			completed: !slog.fields.completed
		};
		const slogUpdated = {id: slog.id, fields: fieldsUpdated};
		updateSlog(slogUpdated);
	}

	return (
		<li className="flex items-center my-2 shadow-sm hover:shadow-md px-2 border">
			<input 
				type="checkbox" name="completed" 
				id="completed" checked={slog.fields.completed} 
				className="mr-3" onChange={handleToggleCompleted}
			/>

			<p className={
				`flex-1 text-gray-800 ${slog.fields.completed? 'line-through' : ''}`
				}
			>
				{slog.fields.description}
			</p>

			<button type="button" 
				className="m-2 px-2 bg-red-500 hover:bg-red-600 hover:shadow-inner"
				onClick={ () => {deleteSlog(slog.id)} }
			>
				Delete
			</button>
		</li>
	)
}

export default SLog;