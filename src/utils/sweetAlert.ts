import Swal from 'sweetalert2';

interface Content {
  title?: string;
  text: string;
}

const sweetAlert = {
  success(title: string = 'Successfully', duration: number = 3500, footer: string = 'Done!') {
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title,
      showConfirmButton: false,
      timer: duration,
      footer,
    });
  },

  error(message: string = 'Server not responding!') {
    return Swal.fire({
      customClass: 'swal2-error',
      iconHtml: '<p class="swal2-icon-sad"></p>',
      title: 'Error...',
      text: `(*) ${message}`,
      // footer: '<a href="">Why do I have this issue?</a>',
    });
  },
  loading() {
    return Swal.fire({
      title: 'Loading...',
      footer: 'Wait a minute!',
      didOpen: () => {
        Swal.showLoading();
      },
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  },
  confirm(content?: Content) {
    return Swal.fire({
      title: content?.title || 'Are you sure?',
      text: content?.text || "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  },

  close() {
    return Swal.close();
  },
};

export default sweetAlert;
