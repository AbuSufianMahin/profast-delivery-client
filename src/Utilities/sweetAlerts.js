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

const confirmWarningAlert = (title, message) => {
    return Swal.fire({
        title: title || "Are you sure?",
        text: message || "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, go ahead!",
        cancelButtonText: "No, go back!"
    })
}


const successAlertWithTimer = (title, message, time) => {
    return Swal.fire({
        icon: "success",
        title: title || "Your work has been saved",
        text: message || "",
        showConfirmButton: false,
        timer: time || 3000
    });
}


export { successAlert, errorAlert, confirmWarningAlert, successAlertWithTimer  };
