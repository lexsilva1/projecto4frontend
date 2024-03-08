import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export const userStore = create(persist(
    (set) => ({
        username: '',  // default value
        updateName: (username) => set({username})
    }),
    {
        name: 'myStore',  // unique name
        storage: createJSONStorage(() => sessionStorage)  // use sessionStorage for persistence
    }
));
