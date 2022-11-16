import React, {
	ReactNode,
	UIEvent,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { throttle } from 'utils';

const ScrollContainer = styled.div`
	height: 100%;
	overflow: hidden;
`;

const ScrollTarget = styled.div`
	height: 100%;
	overflow-y: auto;
`;

const LoadingKeyframes = keyframes`
from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
`;

const StatusWrap = styled.div`
	width: 100%;
	height: auto;
	min-height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	&.empty {
		height: 100%;
		color: #aaaaaa;
	}
	&.loading {
		img {
			animation: ${LoadingKeyframes} 800ms infinite linear;
		}
	}
`;

export interface InfinityScrollPropTypes {
	children?: ReactNode;
	fetch?: () => any;
	hasNext: boolean;
	isLoading: boolean;
	isError: boolean;
	length: number;
}

export const InfinityScroll = ({
	children,
	fetch = () => {},
	isLoading,
	isError,
	length,
}: InfinityScrollPropTypes) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const handleScroll = throttle((e: UIEvent) => {
		const { scrollTop, clientHeight, scrollHeight } =
			e.target as HTMLDivElement;
		if (scrollTop + clientHeight + 50 >= scrollHeight) {
			fetch();
		}
	});

	const getStatus = useCallback(() => {
		if (isError) {
			return (
				<StatusWrap className="error">
					에러가 발생하였습니다.
					<br />
					다시 시도해주세요.
				</StatusWrap>
			);
		}
		if (isLoading) {
			return (
				<StatusWrap className="loading">
					<img src={require('assets/loading_spinner.png')} />
				</StatusWrap>
			);
		}
		if (!length) {
			return (
				<StatusWrap className="empty">
					<img src={require('assets/empty_icon.png')} />
					<span>검색 결과 없음</span>
				</StatusWrap>
			);
		}
	}, [isError, isLoading, length]);

	useEffect(() => {
		targetRef?.current?.addEventListener('scroll', handleScroll);
		return () => {
			targetRef?.current?.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<ScrollContainer>
			<ScrollTarget ref={targetRef}>
				{children}
				{getStatus()}
			</ScrollTarget>
		</ScrollContainer>
	);
};
