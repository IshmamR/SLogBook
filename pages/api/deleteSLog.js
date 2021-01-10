import { table, getMinifiedRecord } from './utils/Airtable';
import auth0 from './utils/Auth0';
import ownRecord from './middleware/OwnRecord';

export default ownRecord(async (req, res) => {
	// description from POST request body
	const { id } = req.body;
	const { user } = await auth0.getSession(req);

	try {
		const deletedRecords = await table.destroy([id]);

		res.statusCode = 200;
		res.json(getMinifiedRecord(deletedRecords[0]));
	} catch(err) {
		console.log(err);
		res.statusCode = 500;
		res.json({msg: 'Something went wrong'});
	}
	
})