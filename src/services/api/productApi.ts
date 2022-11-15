import { client } from './client';
import { FilterTypes } from '../../hooks/query/useProductInfinityQuery';

export const ProductApi = {
	getList: async (filter: FilterTypes, pageParam: number, limit = 10) => {
		const { data } = await client.get('/products?isSoldOut=false', {
			params: {
				_start: (pageParam - 1) * limit,
				_limit: limit,
				...filter,
			},
		});
		return {
			result: data,
			totalCount: 50,
			currentPage: pageParam,
		};
	},
};
