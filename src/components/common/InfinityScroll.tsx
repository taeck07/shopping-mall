import React, { ReactNode, UIEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { throttle } from 'utils';

const ScrollContainer = styled.div`
	height: 100%;
	overflow: hidden;
`;

const ScrollTarget = styled.div`
	height: 100%;
	overflow-y: auto;
`;

export interface InfinityScrollPropTypes {
	children?: ReactNode;
	fetch?: () => any;
	hasNext: boolean;
	isLoading: boolean;
}

export const InfinityScroll = ({
	children,
	fetch = () => {},
	hasNext,
	isLoading,
}: InfinityScrollPropTypes) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const handleScroll = throttle((e: UIEvent) => {
		const { scrollTop, clientHeight, scrollHeight } =
			e.target as HTMLDivElement;
		if (scrollTop + clientHeight + 50 >= scrollHeight) {
			fetch();
		}
	});

	useEffect(() => {
		targetRef?.current?.addEventListener('scroll', handleScroll);
		return () => {
			targetRef?.current?.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<ScrollContainer>
			<ScrollTarget ref={targetRef}>{children}</ScrollTarget>
		</ScrollContainer>
	);
};
