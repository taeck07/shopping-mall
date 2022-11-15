import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Body = styled.div`
	width: 375px;
	height: 100vh;
	margin: 0 auto;
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: 100%;
`;
const Header = styled.header`
	width: 100%;
`;

const LogoWrap = styled.div`
	display: flex;
	justify-content: center;
	padding: 17px;
	> img {
		width: 95px;
	}
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
`;

interface PropTypes {
	children: ReactNode;
	headerChildren?: ReactNode;
}

export const Layout = ({ headerChildren, children }: PropTypes) => {
	return (
		<Body>
			<Header>
				<>
					<LogoWrap>
						<img src={require('assets/logo_musinsa.png')} />
					</LogoWrap>
					{headerChildren}
				</>
			</Header>
			<Content>{children}</Content>
		</Body>
	);
};
