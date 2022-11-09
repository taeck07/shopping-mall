import { useInfiniteQuery } from 'react-query';
import { productKeys } from 'keys/queryKey';
import { ProductApi } from '../../services/api/productApi';
import { ProductType } from 'types/product';
import { InfinityQueryType } from 'types/common';

export const useProductInfinityQuery = () => {
	return useInfiniteQuery<InfinityQueryType<ProductType>>(
		productKeys.getList(),
		({ pageParam = 1 }) => {
			return ProductApi.getList(pageParam);
		},
		{
			getNextPageParam: ({ currentPage }) => {
				if (currentPage * 10 > 50) return undefined;
				return currentPage + 1;
			},
		},
	);
};
