import { client } from './client';
import { FilterTypes } from '../../hooks/query/useProductInfinityQuery';

const delay = (ms: number) => {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			try {
				resolve(ms);
			} catch (error) {
				reject(error);
			}
		}, ms);
	});
};

export const ProductApi = {
	getList: async (filter: FilterTypes, pageParam: number, limit = 10) => {
		const { data } = await client.get('/products?isSoldOut=false', {
			params: {
				_start: (pageParam - 1) * limit,
				_limit: limit,
				...filter,
			},
		});
		await delay(500);
		return {
			result: data,
			totalCount: 50,
			currentPage: pageParam,
		};
	},
};
