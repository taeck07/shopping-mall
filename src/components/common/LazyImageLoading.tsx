import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Image = styled.div<any>`
	height: ${(props) => props.height || '100%'};
	width: 100%;
	position: relative;
	overflow: hidden;
	> img {
		width: auto;
		height: inherit;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		object-fit: cover;
	}
`;

interface PropTypes {
	src: string;
	style?: React.CSSProperties;
	height?: string;
}

const NoImageUrl = 'https://image.msscdn.net/musinsaUI/homework/data/img.jpg';

const LazyImageLoading = ({ src, style, height }: PropTypes) => {
	const [imgUrl, setImgUrl] = useState(NoImageUrl);
	const imgRef = useRef<HTMLImageElement>(null);
	const observer = useRef<IntersectionObserver>();

	useEffect(() => {
		observer.current = new IntersectionObserver(intersectionOberserver);
		if (imgRef.current) observer.current.observe(imgRef.current);
	}, []);

	const intersectionOberserver = (
		entries: IntersectionObserverEntry[],
		io: IntersectionObserver,
	) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				io.unobserve(entry.target);
				setImgUrl(src);
			}
		});
	};

	const handleError = () => {
		setImgUrl(NoImageUrl);
	};

	return (
		<Image height={height}>
			<img
				ref={imgRef}
				src={imgUrl}
				style={style}
				onError={() => handleError()}
			/>
		</Image>
	);
};

export default LazyImageLoading;
