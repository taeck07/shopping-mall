import { useInfiniteQuery } from 'react-query';
import { productKeys } from 'keys/queryKey';
import { ProductApi } from '../../services/api/productApi';
import { ProductType } from 'types/product';
import { InfinityQueryType } from 'types/common';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'recoil/toastState';

export interface FilterTypes {
	[key: string]: boolean | string;
}

export const useProductInfinityQuery = (filter: FilterTypes) => {
	const setToast = useSetRecoilState(toastState);
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
			onError: () => {
				setToast({
					msg: '자동차 목록을 가져오는데 실패하였습니다.',
					type: 'error',
					show: true,
				});
			},
			retry: 3,
		},
	);
};
