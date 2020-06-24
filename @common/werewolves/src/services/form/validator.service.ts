import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";

export interface ValidationErrorMessage {
  min?: (field: string, validateValue: number) => string;
  max?: (field: string, validateValue: number) => string;
  required?: (field: string) => string;
  requiredTrue?: (field: string) => string;
  email?: () => string;
  minLength?: (field: string, validateValue: number) => string;
  maxLength?: (field: string, validateValue: number) => string;
  pattern?: (field: string) => string;

  validate?(validateKey: string, attr: ValidationAttr, field?: string): string;
}

export interface ValidationAttr {
  defaultValue?: any;
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;

  custom?(control: AbstractControl): string;

  customUpdateOnChange?: string[];

  message?: ValidationErrorMessage;
}

export interface ValidationAttrs {
  [key: string]: ValidationAttr;
}

const ngValidateKeyAlias = {
  minlength: 'minLength',
  maxlength: 'maxLength',
};

export const DefaultValidationErrorMessage: ValidationErrorMessage = {
  min: (field: string, validateValue: number) => `${field || ''}不可小于${validateValue}`,
  max: (field: string, validateValue: number) => `${field || ''}不可大于${validateValue}`,
  required: (field: string) => `${field || ''}不可为空`,
  requiredTrue: (field: string) => `${field || ''}为必(选/填)项`,
  email: () => `电子邮件格式不正确`,
  minLength: (field: string, validateValue: number) => `${field || ''}长度不可小于${validateValue}`,
  maxLength: (field: string, validateValue: number) => `${field || ''}长度不可大于${validateValue}`,
  pattern: (field: string) => `${field || ''}格式不正确`,
  validate(validateKey: string, attr: ValidationAttr, field?: string) {
    const validate = this[validateKey] || this[ngValidateKeyAlias[validateKey]];
    const validateValue = attr[validateKey] || attr[ngValidateKeyAlias[validateKey]];
    return validate(field, validateValue);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor() {
  }

  validate(obj, attrs: ValidationAttrs, targets?: string[]) {
  }
}
