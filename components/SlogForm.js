import React, { useState, useContext } from 'react';
import {SLogsContext} from '../contexts/SLogsContext';

const SlogForm = () => {
	const [slog, setSlog] = useState('');
	const {addSlog} = useContext(SLogsContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		addSlog(slog);
		setSlog('');
	}
	return (
		<form onSubmit={handleSubmit} className="form w-full my-5">
			<div className="flex justify-between items-center">
				<label htmlFor="slog">Slog:</label>
				<input 
					type="text" name="slog" id="slog" value={slog} 
					onChange={ (e) => setSlog(e.target.value) }
					placeholder="Add slog"
					className="border p-2 flex-1"
				/>
				<button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2">
					Submit
				</button>
			</div>
		</form>
	)
}

export default SlogForm;