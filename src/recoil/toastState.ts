import { atom } from 'recoil';
import { ToastTypes } from '../types/toastTypes';
import { KEY_TOAST } from '../keys/recoilKeys';

export const toastState = atom<ToastTypes>({
	key: KEY_TOAST,
	default: {
		msg: '',
		show: false,
		type: '',
	},
});
