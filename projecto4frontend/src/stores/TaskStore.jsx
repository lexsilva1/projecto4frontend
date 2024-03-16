import { create} from "zustand";

const useTaskStore = create(set => ({
    tasks: [],

    setTasks: (tasks) => set({ tasks: tasks }),
    fetchTasks: async () => {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/task/all", {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        const data = await response.json();
        set({ tasks: data });
    },
    fetchActiveTasks: async () => {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/task/allActive", {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        const data = await response.json();
        set({ tasks: data });
        
        
    },
    fetchDeletedTasks: async () => {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/task/allDeleted", {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        const data = await response.json();
        set({ tasks: data });
    },
    onDeleteTask: async (id) => {
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/block/${id}`, {
            method: "PATCH",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        if(response.status === 200){
        }
    },
    onRestoreTask: async (id) => {
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/restore/${id}`, {
            method: "PATCH",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        if(response.status === 200){
            
        }
    },
    onAddTask: async (task) => {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/task/add", {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
            body: JSON.stringify(task),
        });
        if(response.status === 200){
        }
    },
    onUpdateStatus: async (id, status) => {
        const taskStatus = {
            id: id,
            status: status
        };
        
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/changeStatus/${id}`, {
            method: "PATCH",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
            body: JSON.stringify(taskStatus),
        });
        if(response.status === 200){
        }
    },




}));

export default useTaskStore;