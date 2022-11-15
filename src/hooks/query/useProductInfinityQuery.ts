import { useInfiniteQuery } from 'react-query';
import { productKeys } from 'keys/queryKey';
import { ProductApi } from '../../services/api/productApi';
import { ProductType } from 'types/product';
import { InfinityQueryType } from 'types/common';

export interface FilterTypes {
	[key: string]: boolean | string;
}

export const useProductInfinityQuery = (filter: FilterTypes) => {
	return useInfiniteQuery<InfinityQueryType<ProductType>>(
		productKeys.getList(filter),
		({ pageParam = 1 }) => {
			return ProductApi.getList(filter, pageParam);
		},
		{
			getNextPageParam: ({ currentPage }) => {
				if (currentPage * 10 > 50) return undefined;
				return currentPage + 1;
			},
		},
	);
};
