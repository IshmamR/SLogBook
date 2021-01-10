// wraps the whole application
import '../styles/index.css';
import {SLogsProvider} from '../contexts/SLogsContext';

function MyApp({ Component, pageProps }) {
	return (
		<SLogsProvider>
			<div className="container mx-auto my-10 max-w-xl">
				<Component {...pageProps} />
			</div>
		</SLogsProvider>
	)
}

export default MyApp;
