import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<div className="App"></div>
			</QueryClientProvider>
		</RecoilRoot>
	);
}

export default App;
