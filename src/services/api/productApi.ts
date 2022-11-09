import { client } from './client';

export const ProductApi = {
	getList: async (pageParam: number, limit = 10) => {
		const { data } = await client.get('/products', {
			params: {
				_start: (pageParam - 1) * limit,
				_limit: limit,
			},
		});
		return {
			result: data,
			totalCount: 50,
			currentPage: pageParam,
		};
	},
};
