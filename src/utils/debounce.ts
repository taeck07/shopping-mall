export const debounce = (handler: (...args: any[]) => void, timeout = 300) => {
	let timer: number;
	return function (this: any, ...args: any[]) {
		clearTimeout(timer);
		timer = window.setTimeout(() => {
			handler.apply(this, args);
		}, timeout);
	};
};
