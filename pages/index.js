// index (home) page
import Head from 'next/head';
import { useEffect, useContext } from 'react';
import auth0 from './api/utils/Auth0';
import Navbar from '../components/Navbar';
import SLog from '../components/SLog';
import SlogForm from '../components/SlogForm';
import { table, minifyRecords } from './api/utils/Airtable';
import { SLogsContext } from '../contexts/SLogsContext';

export default function Home({ initialSLogs, user }) {
	// console.log(user);
	const { slogs, setSlogs } = useContext(SLogsContext); // methods and state from slogs context
	useEffect(() => {
		setSlogs(initialSLogs);
	}, [])

	return (
		<div>
			
			<Head>
				<title>Slog Book</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Navbar user={user} />

			<main>
				
				{user && (
				<>
					<SlogForm />
					<h1 className="text-3xl text-center my-4">My Slogs</h1>
					<ul>
					{slogs && slogs.map(slog => (
						<SLog key={slog.id} slog={slog} />
					))}
					</ul>
				</>
				)}

				{!user && (<h1 className="text-3xl text-center">Log in first</h1>)}
					
			</main>

		</div>
	)
}


export async function getServerSideProps(context) {
	const session = await auth0.getSession(context.req);
	//console.log(session);
	let slogs = [];

	try {
		if(session?.user) {
			slogs = await table.select({
				filterByFormula: `userid = '${session.user.sub}'`
			}).firstPage();
		}
		return {
			props: {
				initialSLogs: minifyRecords(slogs),
				user: session?.user || null
			}
		};
	} catch(e) {
		console.log(e);
		return {
			props: {
				error: "Something went wrong"
			}
		};
	}
}