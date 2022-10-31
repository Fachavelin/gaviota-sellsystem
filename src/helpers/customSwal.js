import Swal from 'sweetalert2';

export const customSwal = () => {
  return Swal.mixin({
    customClass: {
      confirmButton:
        'bg-blue-500  hover:bg-blue-400  text-white px-2 py-1 text-lg font-semibold rounded-md cursor-pointer mr-2',
      cancelButton:
        'bg-red-500  hover:bg-red-400  text-white px-2 py-1 text-lg font-semibold rounded-md cursor-pointer',
    },
    buttonsStyling: false,
  });
};
