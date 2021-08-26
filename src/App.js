import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import HomePage from "./pages/homepage";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<HomePage />
		</QueryClientProvider>
	);
}

export default App;
