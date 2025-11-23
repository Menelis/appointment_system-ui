import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  /**
   * Show confirmation dialog before actioning the item.
   * @param title title for the dialog
   * @param text Text for the dialog
   * @param cancelButtonText Cancel button text
   * @param confirmButtonText confirmation button text
   */
  confirmationDialog = (
                        title: string,
                        text: string,
                        cancelButtonText?: string,
                        confirmButtonText?:string) => {
    return Swal.fire({
      title: title,
      text: text,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: cancelButtonText || 'No',
      confirmButtonText: confirmButtonText || 'Yes'
    });
  }
  /**
   * Dialog for successful action.
   * @param title Dialog title
   * @param text Text message for dialog
   */
  showSuccessMessage = (title: string, text: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "success"
    });
  }
  /**
   * Dialog for failure action.
   * @param title Dialog title
   * @param text Dialog message
   */
  showFailureMessage = (title: string, text: string) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "error"
    });
  }
}
