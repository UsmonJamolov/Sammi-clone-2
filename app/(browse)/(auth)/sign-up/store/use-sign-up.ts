import { create } from 'zustand';

type Step = 'complete-profile' | 'verify-email' | 'password-field' | 'done';

type Store = {
	step: Step;
	setStep: (step: Step) => void;
	user: UserType | null;
	setUser: (user: UserType | null) => void;
};

export const useSignUp = create<Store>()(set => ({
	step: 'complete-profile',
	setStep: step => set({ step }),
	user: null,
	setUser: user => set({ user }),
}));
