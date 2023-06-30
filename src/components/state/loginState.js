import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const loginState = atom({
    key: 'loginState',
    default: {
        userId: '',
        isLogin: false,
        userName: '',
        euserEmail: '',
    },
    effects_UNSTABLE: [persistAtom]
})