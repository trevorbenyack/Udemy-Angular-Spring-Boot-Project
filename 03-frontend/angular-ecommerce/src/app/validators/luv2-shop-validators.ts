import {FormControl, ValidationErrors} from '@angular/forms';

export class Luv2ShopValidators {

  // whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors {

    // if validation check fails, then return validation error(s)
    // if validation check passes, return null

    // check if string only contains whitespace
    if ((control.value != null) && (control.value.trim().length === 0)) {
      // invalid, return error object
      // 'notOnlyWhitespace' is a validation error key
      // The HTML template will check for this error key
      // 'notOnlyWhitespace' can be named anything, but it is convention
      // for it to match the method name
      return { 'notOnlyWhitespace': true };
    } else {
      // valid, return null
      return null;
    }
  }
}
