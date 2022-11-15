import { FilterTypes } from '../hooks/query/useProductInfinityQuery';
const KEY_PRODUCT_LIST = 'productList';

export const productKeys = {
	getList: (filter: FilterTypes) => [KEY_PRODUCT_LIST, filter],
};
