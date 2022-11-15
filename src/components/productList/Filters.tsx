import React, { useCallback, useEffect, useState } from 'react';
import ToggleGroup from 'components/common/ToggleGroup';
import styled from 'styled-components';
import SearchBar, { SearchCaterogyType } from './SearchBar';
import { ToggleType } from '../common/ToggleGroup';
import RemoveIcon from 'assets/remove_filter.png';
import { ProductType } from '../../types/product';

const FilterContainer = styled.div`
	width: 100%;
	position: relative;
`;

const FilterWrap = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	gap: 5px;
	width: auto;
	align-items: center;
`;

const FilteredList = styled.div`
	width: auto;
	display: flex;
	overflow-x: auto;
	gap: 5px;
	padding-bottom: 10px;
`;

const FilterItem = styled.div`
	padding: 4px 10px;
	background: #0078ff;
	border-radius: 4px;
	color: #fff;
	display: flex;
	align-items: center;
	gap: 7px;
	> img {
		width: 7px;
	}
`;

const FilterButton = styled.div`
	background-color: transparent;
	border: 0;
`;

interface PropTypes {
	filterItem: ToggleType[];
	value?: string[];
	getSearchCategory: (key: string) => SearchCaterogyType[];
	getFilteredProductList: (filter: string[], search?: string) => void;
	getSearchProductList: (search: string, category?: keyof ProductType) => void;
}

const Filters = ({
	filterItem,
	getSearchCategory,
	getFilteredProductList,
	getSearchProductList,
}: PropTypes) => {
	const [toggleValues, setToggleValues] = useState([]);
	const [filteredList, setFilteredList] = useState<ToggleType[]>([]);
	const [searchWord, setSearchWord] = useState<string>('');

	const onChange = useCallback(
		(value: string[]) => {
			setFilteredList(
				value.map(
					(key) => filterItem.find((item) => item.key === key) as ToggleType,
				),
			);
			setToggleValues(toggleValues);
		},
		[toggleValues],
	);

	const handleFilterRemove = useCallback(
		(key: string) => {
			setFilteredList(filteredList.filter((item) => item.key !== key));
			setToggleValues(toggleValues.filter((item) => item !== key));
			if (key === 'search') {
				setSearchWord('');
			}
		},
		[filteredList, toggleValues],
	);

	useEffect(() => {
		getFilteredProductList(
			filteredList.filter(({ key }) => key !== 'search').map(({ key }) => key),
			searchWord,
		);
	}, [filteredList]);

	const _getSearchProductList = useCallback(
		(word: string, category?: keyof ProductType) => {
			setSearchWord(word);
			getSearchProductList(word, category);
		},
		[],
	);

	const handleSearchRemove = () => {
		setSearchWord('');
		getSearchProductList('');
	};

	return (
		<FilterContainer>
			<FilterWrap>
				<SearchBar
					getSearchWord={getSearchCategory}
					getSearchProductList={_getSearchProductList}
				/>
				<ToggleGroup
					value={toggleValues}
					items={filterItem}
					onChange={onChange}
				/>
			</FilterWrap>
			<FilteredList>
				{searchWord && (
					<FilterItem>
						<span>{searchWord}</span>
						<FilterButton onClick={() => handleSearchRemove()}>
							<img src={RemoveIcon} />
						</FilterButton>
					</FilterItem>
				)}
				{filteredList.map((item) => (
					<FilterItem key={item.key}>
						<span>{item.label}</span>
						<FilterButton onClick={() => handleFilterRemove(item.key)}>
							<img src={RemoveIcon} />
						</FilterButton>
					</FilterItem>
				))}
			</FilteredList>
		</FilterContainer>
	);
};

export default React.memo(Filters);
