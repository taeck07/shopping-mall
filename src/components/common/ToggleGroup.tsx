import React from 'react';
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
	> label > div {
		display: inline-block;
		padding: 7px 15px;
		border: 1px solid #eeeeee;
		border-radius: 18px;
		> h3 {
			font-weight: normal;
		}
	}
`;

export interface ToggleType {
	key: string;
	label: string;
}

interface PropTypes {
	items: ToggleType[];
	value: object;
}

export const ToggleGroup = ({ items }: PropTypes) => {
	return (
		<ToggleWrap>
			{items.map((item, index) => (
				<ToggleItemWrap key={`toggle-item-${index}`}>
					<input type="checkbox" id={`toggle-id-${index}`} />
					<label>
						<div>
							<h3>{item.label}</h3>
						</div>
					</label>
				</ToggleItemWrap>
			))}
		</ToggleWrap>
	);
};
