import React from 'react';
import styled from 'styled-components';
import { ProductType } from 'types/product';

const ProductsContainer = styled.div``;

interface PropTypes {
	productList: ProductType[];
	isLoading: boolean;
}

export const Products = ({ productList, isLoading }: PropTypes) => {
	return (
		<ProductsContainer>
			{productList.map(({ goodsName }) => (
				<>{goodsName}</>
			))}
		</ProductsContainer>
	);
};
