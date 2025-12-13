import { create } from 'zustand';

type Step = 'enter-email' | 'verify-email' | 'password-field' | 'done';

type Store = {
	step: Step;
	setStep: (step: Step) => void;
	email: string | null;
	setEmail: (email: string | null) => void;
};

export const useResetPassword = create<Store>()(set => ({
	step: 'enter-email',
	setStep: step => set({ step }),
	email: null,
	setEmail: email => set({ email }),
}));
