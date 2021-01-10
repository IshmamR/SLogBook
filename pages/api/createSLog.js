import { table } from './utils/Airtable';
import auth0 from './utils/Auth0';

// requireAuthentictaion requires a logged in user
export default auth0.requireAuthentication(async (req, res) => {
	// description from POST request body
	const { description } = req.body;
	const { user } = await auth0.getSession(req);
	try {
		const createdRecords = await table.create([
			{ fields: {description, userid: user.sub} }
		]);
		const createdRecord = {
			id: createdRecords[0].id,
			fields: createdRecords[0].fields
		};
		res.statusCode = 200;
		res.json(createdRecord);
	} catch(e) {
		res.statusCode = 500;
		res.json({msg: 'Something went wrong'});
	}
	
})