import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'


const initialState = {
    selected: false,
    selectedUser: '',
    isProfilesOpen: false,
    isDeleteSelected: false,
    loggedUser: '',
    users: [],
}

const useStore = create((set) => ({
    selected: false,
    selectedUser: '',
    isProfilesOpen: false,
    isDeleteSelected: false,
    loggedUser: '',

    setSelected:  () => set((state) => ({ selected: !state.selected })),
    setSelectedUser: (user) => set({selectedUser: user}),
    setIsProfilesOpen: () => set((state) => ({isProfilesOpen: !state.isProfilesOpen})),
    setIsDeleteSelected: () => set((state) => ({isDeleteSelected: !state.isDeleteSelected})),
    setLoggedUser: (user) => set({loggedUser: user}),
    resetState  : () => set(initialState),
    
    persist: {
        users: [], // the initial state
    },
    actions:
    {
        fetchDeletedUsers: async () => {
            const response = await fetch("http://localhost:8080/projecto4backend/rest/users/allDeleted", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    token: sessionStorage.getItem("token"),
                }
            });
            if(response.status === 200){
                const data= await response.json();
                set({users: data});
                //console.log(data);
            }
        },
        fetchAllUsers: async () => {
            const response = await fetch("http://localhost:8080/projecto4backend/rest/users/all", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    token: sessionStorage.getItem("token"),
                }
            });
            if(response.status === 200){
                const data= await response.json();
                set({users: data});
                //console.log(data);
            }
        },
        
        fetchUsers: async () => {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/users/allActive", {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            }
        });
        if(response.status === 200){
        const data= await response.json();
        set({users: data});
        //console.log(data);
    }
    },
    setUsers: (users) => set({users: users}),

        setUsers: (users) => set({users: users}),
        name:'mystore', // the name to use for the persisted data
        storage: createJSONStorage(() => sessionStorage)
        },
    }));



  
export default useStore;
