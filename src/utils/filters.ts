export const priceFormat = (price: number) => {
	return price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
};
