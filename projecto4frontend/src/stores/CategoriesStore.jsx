import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware'

const initialState = {
    categoriesisOpen: false,
    selectedCategory: '',
    categories: [],
}

const useCategoriesStore = create((set) => ({
    categoriesisOpen: false,
    selectedCategory: '',

    setCategoriesOpen: () => set((state) => ({ categoriesisOpen: !state.categoriesisOpen })),
    setSelectedCategory: (category) => set({selectedCategory: category}),

    resetCategoriesState  : () => set(initialState),
categories: [], // the initial state
  
actions:
    {
        fetchCategories: async () => {
            const response = await fetch("http://localhost:8080/projecto4backend/rest/tasks/Categories", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    token: sessionStorage.getItem("token"),
                }
            });
            if(response.status === 200){
                const data= await response.json();
                set({categories: data});
                //console.log(data);
            }
        },
        

        
        setCategories: (categories) => set({categories: categories}),
        name:'catstore', // the name to use for the persisted data
        storage: createJSONStorage(() => sessionStorage)
    },

}));

export default useCategoriesStore;