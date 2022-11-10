import React, { useState } from 'react';
import { ToggleGroup } from 'components/common/ToggleGroup';
import styled from 'styled-components';
import { SearchBar } from './SearchBar';
import { ToggleType } from '../common/ToggleGroup';

const FilterWrap = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	gap: 5px;
	width: auto;
	align-items: center;
`;

interface PropTypes {
	filterItem: ToggleType[];
	value?: object;
}

export const Filters = ({ filterItem }: PropTypes) => {
	const [value] = useState({});

	return (
		<FilterWrap>
			<SearchBar />
			<ToggleGroup value={value} items={filterItem} />
		</FilterWrap>
	);
};
