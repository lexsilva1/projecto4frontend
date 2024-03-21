import { create} from "zustand";
import infoToast from '../Components/Toasts/Info'
import errorToast from '../Components/Toasts/Error'
import successToast from '../Components/Toasts/Success'
import warningToast from '../Components/Toasts/Warning'

const useTaskStore = create(set => ({
    editedTask: null,
    setEditedTask: (task) => set({ editedTask: task }),

   editedTaskId: null,
    setEditedTaskId: (id) => set({ editedTaskId: id }),

    taskCreator : null,
    setTaskCreator: (creator) => set({ taskCreator: creator }),
    fetchTaskCreator: async (id) => {
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/creator/${id}`, {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        const data = await response.json();
        set({taskCreator: data} );
        return data;
    },
   
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
           successToast(await response.text());
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
            successToast(await response.text());
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
            console.log(response)
            successToast(await response.text());
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
    onFilterByCategory: async (category) => {
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/byCategory/${category}`, {
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
    onFilterByUser: async (username) => {
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/byUser/${username}`, {
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
    fetchTaskById: async (id) => {
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/${id}`, {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        const data = await response.json();
        return ( data);
    },
    onUpdateTask: async (task) => {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/task/update", {
            method: "PUT",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
            body: JSON.stringify(task),
        });
        if(response.status === 200){
            successToast(await response.text());
        }
    },
    onDeleteAllUsersTasks: async (username) => {
        const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/deleteAll/${username}`, {
            method: "DELETE",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        if(response.status === 200){
            successToast(await response.text());
        }
    }






}));

export default useTaskStore;
