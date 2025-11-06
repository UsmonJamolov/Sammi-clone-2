import {create} from 'zustand'

type Step = 'complete-profile' | 'verify-email' | 'password-field' | 'done'

type Store = {
    step: Step;
    setStep: (step: Step) => void
}

export const useSingUp = create<Store>(set => ({
    step: 'complete-profile',
    setStep: step => set({step})
}))