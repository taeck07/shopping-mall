import React, { useState, useCallback } from 'react';

interface FormType {
	[key: string]: any;
}

const useInputs = (initialForm: FormType): any[] => {
	const [form, setForm] = useState(initialForm);
	// change
	const onChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		setForm((form) => ({ ...form, [name]: value }));
	}, []);
	const reset = useCallback(() => setForm(initialForm), [initialForm]);
	return [form, onChange, reset];
};

export default useInputs;
