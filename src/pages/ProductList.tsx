import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	FilterTypes,
	useProductInfinityQuery,
} from '../hooks/query/useProductInfinityQuery';
import Products from 'components/productList/Products';
import { ProductType } from 'types/product';
import Layout from '../components/common/Layout';
import Filters from 'components/productList/Filters';
import { SearchCaterogyType } from '../components/productList/SearchBar';

const filterItems = [
	{ key: 'isSale', label: '세일상품' },
	{ key: 'isExclusive', label: '단독상품' },
	{ key: 'isSoldOut', label: '품절포함' },
];

export const ProductList = () => {
	const [filters, setFilters] = useState<FilterTypes>({});
	const { data, isFetching, fetchNextPage, hasNextPage, isError } =
		useProductInfinityQuery(filters);
	const [productList, setProductList] = useState<ProductType[]>([]);
	const searchWord = useRef<{ word: string; category?: keyof ProductType }>({
		word: '',
		category: undefined,
	});

	const getDataToProductList = useCallback((list: typeof data) => {
		return (
			list?.pages.reduce(
				(prev: ProductType[], curr) =>
					prev.concat(curr.result.map((data) => data)),
				[],
			) || []
		);
	}, []);

	useEffect(() => {
		const allProducts = getDataToProductList(data);
		const list = searchWord.current.word
			? filterProductList(allProducts)
			: allProducts;
		setProductList(list);
	}, [data]);

	const _setFilters = useCallback((filter: string[]) => {
		const filterObj: FilterTypes = {};
		filter.forEach((key) => {
			filterObj[key] = true;
		});
		setFilters(filterObj);
	}, []);

	const filterProductList = useCallback((productList: ProductType[]) => {
		const { word, category } = searchWord.current;
		return productList.filter((item) => {
			const regexp = new RegExp(word, 'gi');
			if (category) {
				if (regexp.test(item[category] as string)) {
					return true;
				}
				return false;
			}
			if (regexp.test(item.goodsName) || regexp.test(item.brandName)) {
				return true;
			}
			return false;
		});
	}, []);

	const getSearchProductList = useCallback(
		(word: string, category?: keyof ProductType) => {
			searchWord.current = { word, category: category };
			setProductList(filterProductList(getDataToProductList(data)));
		},
		[data, getDataToProductList, filterProductList],
	);

	const searchCategory = useCallback(
		(key: string) => {
			const list: SearchCaterogyType[] = getDataToProductList(data)
				.reduce<SearchCaterogyType[]>((pre, curr) => {
					const regexp = new RegExp(key, 'gi');
					if (regexp.test(curr.brandName)) {
						return [...pre, { label: curr.brandName, category: 'brandName' }];
					}
					if (regexp.test(curr.goodsName)) {
						const words = curr.goodsName.split(' ') || [];
						const word = words.filter((word) => regexp.test(word)) || [];
						return [
							...pre,
							...word.map((w) => ({ label: w, category: 'goodsName' })),
						];
					}
					return pre;
				}, [])
				.map(({ label, category }) => ({
					label: label.replace('[', '').replace(']', ''),
					category,
				}));
			return list;
		},
		[data],
	);

	return (
		<Layout
			headerChildren={
				<Filters
					filterItem={filterItems}
					getSearchCategory={searchCategory}
					getFilteredProductList={_setFilters}
					getSearchProductList={getSearchProductList}
				/>
			}
		>
			<Products
				productList={productList}
				isLoading={isFetching}
				fetch={fetchNextPage}
				hasNext={!!hasNextPage}
				isError={isError}
				length={productList.length}
			></Products>
		</Layout>
	);
};
