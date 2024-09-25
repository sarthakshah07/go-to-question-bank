import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const showSuccessMessage = (message) => {
  toast.success(message, {
    autoClose: 1000,
    style: { zIndex: 999 },
    bodyStyle: { zIndex: 999 }
  });
};

export const showErrorMessage = (message) => {
  toast.error(message, {
    autoClose: 1000
  });
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