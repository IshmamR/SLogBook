import { table } from '../utils/Airtable';
import auth0 from '../utils/Auth0';

const ownRecord = (handler) => auth0.requireAuthentication(async(req, res) => {
	const {user} = await auth0.getSession(req);

	const {id} = req.body;
	try {
		const existingRecord = await table.find(id);

		if(!existingRecord || user.sub !== existingRecord.fields.userid) {
			res.statusCode = 404;
			return res.json({ msg: 'Record not found' });
		}

		req.record = existingRecord;
		return handler(req, res);
	} catch(err) {
		console.log(err);
	}
})

export default ownRecord;