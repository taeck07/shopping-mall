import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'utils';
import useInputs from '../../hooks/common/useInputs';

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

const InputArea = styled.div<ToggleStyleTypes>`
	position: absolute;
	left: 0;
	height: calc(100vh - 105px);
	z-index: 100;
	width: 100%;
	margin-top: 15px;
	box-sizing: border-box;
	background-color: #fff;
	display: ${(props) => (props.toggle ? 'block' : 'none')};
`;

const InputWrap = styled.div`
    padding: 20px 15px;
    width: 100%;
    overflow; hidden;
    box-sizing: border-box;
    background: #F9F9F9;
    >div {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 5px;
        background-color: #fff;
        border: 1px solid #CCCCCC;
        >input {
            flex-grow: 1;
            font-size: 1.454rem;
            border: 0;
            color: #AAAAAA;
            &:focus {
                outline: none !important;
            }import { debounce } from '../../utils/debounce';

        }
        >img {
            width: 22px;
            height: fit-content;
        }
    }

`;

const ListWrap = styled.div``;

interface PropTypes {
	getSearchWord: (search: string) => string[];
}

export const SearchBar = ({ getSearchWord }: PropTypes) => {
	const [toggle, setToggle] = useState(false);
	const [{ search }, onChange] = useInputs({ search: '' });
	const [searchCategoryList, setSearchCategoryList] = useState<string[]>([]);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	const handleSearch = useCallback(
		debounce((search) => {
			const list = getSearchWord(search);
			setSearchCategoryList(list);
		}, 1000),
		[getSearchWord],
	);

	useEffect(() => {
		if (!search) return;
		handleSearch(search);
	}, [search]);

	const handleKeypPress = (e: React.KeyboardEvent<HTMLInputElement>) => {};

	const handleSearchItems = () => {};

	return (
		<SearchContainer>
			<SearchToggleButton search={''} onClick={() => handleToggle()}>
				<h3>검색</h3>
				<img src={require('assets/search.png')} />
			</SearchToggleButton>
			<InputArea toggle={toggle}>
				<InputWrap>
					<div>
						<img src={require('assets/search.png')} />
						<input
							type="text"
							value={search}
							onChange={onChange}
							name="search"
							onKeyPress={handleKeypPress}
						/>
					</div>
				</InputWrap>
				<ListWrap>
					{searchCategoryList.map((word, index) => (
						<div key={index} onClick={() => handleSearchItems()}>
							{word}
						</div>
					))}
				</ListWrap>
			</InputArea>
		</SearchContainer>
	);
};
