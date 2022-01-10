import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMandatoryStringInputLength]'
})
export class MandatoryStringInputLengthDirective {
  @Input('appMandatoryStringInputLength') minLength: number | string = 3;//pipe wegen strenger typisierung

  @HostBinding('style.backgroundColor') inputBackground: string = 'white';

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const inputElementLength = inputElement.value.trim().length;

    if (inputElementLength < this.minLength && inputElementLength != 0) {
      this.inputBackground = 'red';
    } else {
      this.inputBackground = 'white';
    }
  }

}
