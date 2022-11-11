import React, { useCallback, useEffect, useState } from 'react';
import {
	FilterTypes,
	useProductInfinityQuery,
} from '../hooks/query/useProductInfinityQuery';
import { Products } from 'components/productList/Products';
import { ProductType } from 'types/product';
import { Layout } from '../components/common/Layout';
import Filters from 'components/productList/Filters';

const filterItems = [
	{ key: 'isSale', label: '세일상품' },
	{ key: 'isExclusive', label: '단독상품' },
	{ key: 'isSoldOut', label: '품절포함' },
];

export const ProductList = () => {
	const [filters, setFilters] = useState<FilterTypes>({});
	const { data, isLoading, fetchNextPage, hasNextPage } =
		useProductInfinityQuery(filters);
	const [productList, setProductList] = useState<ProductType[]>([]);

	useEffect(() => {
		const list =
			data?.pages.reduce(
				(prev: ProductType[], curr) =>
					prev.concat(curr.result.map((data) => data)),
				[],
			) || [];
		setProductList(list);
	}, [data]);

	const _setFilters = (filter: string[]) => {
		console.log('setfilter');
		const filterObj: FilterTypes = {};
		filter.forEach((key) => {
			filterObj[key] = true;
		});
		setFilters(filterObj);
	};

	const searchCategory = useCallback(
		(key: string) => {
			const list = productList
				.reduce<string[]>((pre, curr) => {
					const regexp = new RegExp(key, 'gi');
					if (regexp.test(curr.brandName)) {
						return [...pre, curr.brandName];
					}
					if (regexp.test(curr.goodsName)) {
						const words = curr.goodsName.split(' ') || [];
						const word = words.filter((word) => regexp.test(word)) || [];
						return [...pre, ...word];
					}
					return pre;
				}, [])
				.map((word) => word.replace('[', '').replace(']', ''));
			return Array.from(new Set(list));
		},
		[productList],
	);

	return (
		<Layout
			headerChildren={
				<Filters
					filterItem={filterItems}
					getSearchCategory={searchCategory}
					getFilteredProductList={_setFilters}
				/>
			}
		>
			<Products
				productList={productList}
				isLoading={isLoading}
				fetch={fetchNextPage}
				hasNext={!!hasNextPage}
			></Products>
		</Layout>
	);
};
