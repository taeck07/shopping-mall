export type ToastMsgType = 'warning' | 'error' | 'success' | '';

export interface ToastTypes {
	msg: string;
	type: ToastMsgType;
	show: boolean;
}
