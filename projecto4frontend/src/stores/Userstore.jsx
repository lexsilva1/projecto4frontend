import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

const useStore = create((set) => ({
    selected: false,
    

    setSelected:  () => set((state) => ({ selected: !state.selected })),
    
    
    persist: {
        users: [], // the initial state
    },
    actions:
    {
    fetchUsers: async () => {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/user/all", {
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
        }

}));
  
export default useStore;
