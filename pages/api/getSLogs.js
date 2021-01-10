import { table, minifyRecords } from './utils/Airtable';
import auth0 from './utils/Auth0';

export default auth0.requireAuthentication(async (req, res) => {
	const { user } = await auth0.getSession(req);
	try {
		const records = await table.select({
			filterByFormula: `userid = '${user.sub}'`
		}).firstPage();
		const minifiedRecords = minifyRecords(records);
		res.statusCode = 200;
		res.json(minifiedRecords);
	} catch(e) {
		res.statusCode = 500;
		res.json({msg: 'Something went wrong'});
	}
	
})