import { table, getMinifiedRecord } from './utils/Airtable';
import auth0 from './utils/Auth0';
import ownRecord from './middleware/OwnRecord';

export default ownRecord(async (req, res) => {
	// description from request body
	const { id, fields } = req.body;
	// console.log(req.body);
	const { user } = await auth0.getSession(req);
	
	try {
		const updatedRecords = await table.update([
			{ id, fields }
		]);

		res.statusCode = 200;
		res.json(getMinifiedRecord(updatedRecords[0]));
	} catch(err) {
		console.log(err);
		res.statusCode = 500;
		res.json({msg: 'Something went wrong'});
	}
	
})