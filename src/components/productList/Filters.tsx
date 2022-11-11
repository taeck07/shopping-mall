import React, { useEffect, useState } from 'react';
import { ToggleGroup } from 'components/common/ToggleGroup';
import styled from 'styled-components';
import { SearchBar } from './SearchBar';
import { ToggleType } from '../common/ToggleGroup';
import RemoveIcon from 'assets/remove_filter.png';

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
	getSearchCategory: (key: string) => string[];
	getFilteredProductList: (filter: string[]) => void;
}

const Filters = ({
	filterItem,
	getSearchCategory,
	getFilteredProductList,
}: PropTypes) => {
	const [toggleValues, setToggleValues] = useState([]);
	const [filteredList, setFilteredList] = useState<ToggleType[]>([]);
	const onChange = (value: string[]) => {
		setFilteredList(
			value.map(
				(key) => filterItem.find((item) => item.key === key) as ToggleType,
			),
		);
		setToggleValues(toggleValues);
	};

	const handleFilterRemove = (key: string) => {
		setFilteredList(filteredList.filter((item) => item.key !== key));
		setToggleValues(toggleValues.filter((item) => item !== key));
	};

	useEffect(() => {
		getFilteredProductList(filteredList.map(({ key }) => key));
	}, [filteredList]);

	return (
		<FilterContainer>
			<FilterWrap>
				<SearchBar getSearchWord={getSearchCategory} />
				<ToggleGroup
					value={toggleValues}
					items={filterItem}
					onChange={onChange}
				/>
			</FilterWrap>
			<FilteredList>
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

export default Filters;
