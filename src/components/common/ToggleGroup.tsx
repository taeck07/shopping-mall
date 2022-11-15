import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ToggleWrap = styled.ul`
	display: flex;
	flex-wrap: no-wrap;
	gap: 5px;
	width: auto;
	padding: 0;
`;

const ToggleItemWrap = styled.li`
	list-style: none;
	padding: 0;
	> input[type='checkbox'] {
		display: none;
	}
`;

interface ToggleButtonType {
	toggle: boolean;
}

const ToggleButton = styled.div<ToggleButtonType>`
	display: inline-block;
	padding: 7px 15px;
	border: 1px solid #eeeeee;
	border-radius: 18px;
	color: ${(props) => (props.toggle ? '#0078FF' : '#000')};
	> h3 {
		font-weight: normal;
	}
`;

export interface ToggleType {
	key: string;
	label: string;
}

interface PropTypes {
	items: ToggleType[];
	value: string[];
	onChange: (arg: string[]) => void;
}

interface StateType {
	[key: string]: boolean;
}

export const ToggleGroup = ({ items, value, onChange }: PropTypes) => {
	const [state, setState] = useState<StateType>({});

	const handleClick = (key: string) => {
		const _state = { ...state, [key]: !state[key] };
		setState(_state);
		onChange(Object.keys(_state).filter((key) => _state[key]));
	};

	useEffect(() => {
		const _state: StateType = {};
		items.forEach(({ key }) => {
			_state[key] = !!value?.some((val) => val === key);
		});
		setState(_state);
	}, [items, value]);

	return (
		<ToggleWrap>
			{items.map((item, index) => (
				<ToggleItemWrap key={`toggle-item-${index}`}>
					<input
						type="checkbox"
						id={`toggle-id-${index}`}
						value={Number(state[item.key] || '')}
						onChange={() => handleClick(item.key)}
					/>
					<label htmlFor={`toggle-id-${index}`}>
						<ToggleButton toggle={!!state[item.key]}>
							<h3>{item.label}</h3>
						</ToggleButton>
					</label>
				</ToggleItemWrap>
			))}
		</ToggleWrap>
	);
};
