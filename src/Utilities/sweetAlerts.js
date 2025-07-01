import Swal from "sweetalert2";

const successAlert = (title, message) => {
    return Swal.fire({
        icon: "success",
        title: title || "Success",
        text: message || "Your action was completed successfully!",
    });
}


const errorAlert = (title, message) => {
    return Swal.fire({
        icon: "error",
        title: title || "Oops...",
        text: message || "Something went wrong!",
    });
}

export { successAlert, errorAlert };
