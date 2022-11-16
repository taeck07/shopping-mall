import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ToastTypes } from 'types/toastTypes';
import { toastState } from 'recoil/toastState';

const ToastContainer = styled.div<ToastTypes>`
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  min-width: 50px;
  max-width: 350px;
  width: auto;
  height: auto;
  padding: 15px 20px;
  border-radius: 8px;
  overflow: hidden;
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: ${(props) =>
		props.type === 'error'
			? '#D3180C70'
			: props.type === 'warning'
			? '#FFB32370'
			: 'rgb(46, 125, 50)'};
  > span {
    word-break: break-word;
    text-align: center;
    color: #fff;
`;

export const Toast = () => {
	const state = useRecoilValue(toastState);
	const reset = useResetRecoilState(toastState);
	const { msg, show, type } = state;
	const timeout = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		if (show) {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
			timeout.current = setTimeout(() => {
				reset();
			}, 3000);
		}
		return () => clearTimeout(timeout.current);
	}, [reset, show]);

	return (
		<ToastContainer show={show} type={type} msg={msg}>
			<span>{msg}</span>
		</ToastContainer>
	);
};
