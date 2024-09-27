
import {  toast } from 'react-toastify';
import Swal from 'sweetalert2';

const toastConfig ={
  autoClose: 1000,
  style: { zIndex: 999, background: "#333" },
  bodyStyle: { zIndex: 999, color: "#fff" }
}
export const showSuccessMessage = (message) => {

  console.log("message message", message);
  toast.success(message, toastConfig);
  // Toast.update("success", { autoClose: 1000, style: { zIndex: 999 }, bodyStyle: { zIndex: 999 } });
};

export const showErrorMessage = (message) => {
  toast.error(message,toastConfig);
};

export const swalConfirmationFunc = (func, row, message) => {
  Swal.fire({
    title: "Are you sure?",
    text: message ? message : "You want to Delete!",
    icon: "question",
    showCancelButton: true,
    iconColor: "#1976D2",
    confirmButtonColor: "#1976D2",
    cancelButtonColor: "#d33",
    confirmButtonText: message ? "Confirm" : "Yes, Delete!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      func(row);
    }
  });
};