import React, { useEffect, useState } from 'react';
import { useProductInfinityQuery } from '../hooks/query/useProductInfinityQuery';
import { Products } from 'components/Products';
import { ProductType } from 'types/product';

export const ProductList = () => {
	const { data, isLoading } = useProductInfinityQuery();
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
	return <Products productList={productList} isLoading={isLoading}></Products>;
};
