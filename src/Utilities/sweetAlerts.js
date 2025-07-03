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

const deleteWarningAlert = (title, message) => {
    return Swal.fire({
        title: title || "Are you sure?",
        text:  message ||  "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, go back!"
    })
}

export { successAlert, errorAlert, deleteWarningAlert  };
