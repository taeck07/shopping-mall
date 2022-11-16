import { Toast } from 'components/common/Toast';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ProductList } from './pages/ProductList';

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
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<ProductList />} />
					</Routes>
				</BrowserRouter>
				<Toast />
			</QueryClientProvider>
		</RecoilRoot>
	);
}

export default App;
