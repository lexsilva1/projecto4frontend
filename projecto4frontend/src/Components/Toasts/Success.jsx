import React from "react";
import { toast, Bounce} from "react-toastify";

const Success = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

export default Success;