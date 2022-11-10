import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
	padding: 7px 15px;
	border: 1px solid #eeeeee;
	border-radius: 18px;
	align-items: center;
`;

interface ToggleStyleTypes {
	search?: string;
	toggle?: boolean;
}

const SearchToggleButton = styled.div<ToggleStyleTypes>`
	display: flex;
	align-items: center;
	gap: 3px;
	background-color: ${(props) => (props.toggle ? '#0078FF' : '#fff')};
	> h3 {
		font-weight: normal;
		display: inline-block;
		font-color: ${(props) => (props.toggle ? '#fff' : '#000')};
	}
`;

const InputArea = styled.div<ToggleStyleTypes>``;

export const SearchBar = () => {
	const [toggle] = useState(false);

	return (
		<SearchContainer>
			<SearchToggleButton search={''}>
				<h3>검색</h3>
				<img src={require('assets/search.png')} />
			</SearchToggleButton>
			<InputArea toggle={toggle}></InputArea>
		</SearchContainer>
	);
};
