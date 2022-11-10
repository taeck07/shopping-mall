import React from 'react';
import styled from 'styled-components';
import { ProductType } from 'types/product';
import LazyImageLoading from '../common/LazyImageLoading';

const ProductsContainer = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
`;

const ProductContent = styled.div`
	height: 366px;
	>img {
		width: 100%;
		height; auto;
	}
`;

const ProductDescription = styled.div`
	padding: 20px 10px;
`;

const BrandLink = styled.a`
	color: #000 !important;
	text-decoration: none;
`;

const GoodsName = styled.h3`
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-all;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

const PriceWrap = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	> span:first-of-type {
		font-size: 1.273rem;
	}
	> span:last-of-type {
		font-size: 1.454rem;
		color: #ff0000;
	}
`;

const OriginPrice = styled.span`
	color: #aaaaaa;
	text-decoration: line-through;
`;

interface PropTypes {
	productList: ProductType[];
	isLoading: boolean;
}

export const Products = ({ productList, isLoading }: PropTypes) => {
	return (
		<ProductsContainer>
			{productList.map(
				({
					goodsName,
					goodsNo,
					imageUrl,
					brandName,
					linkUrl,
					price,
					saleRate,
					normalPrice,
				}) => (
					<ProductContent key={goodsNo}>
						<LazyImageLoading src={imageUrl} height="266px" />
						<ProductDescription>
							<BrandLink href={linkUrl}>{brandName}</BrandLink>
							<GoodsName>{goodsName}</GoodsName>
							<PriceWrap>
								<span>{price}</span>
								<span>{saleRate}%</span>
							</PriceWrap>
							<OriginPrice>{normalPrice}</OriginPrice>
						</ProductDescription>
					</ProductContent>
				),
			)}
		</ProductsContainer>
	);
};
