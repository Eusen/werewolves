import {Injectable} from '@angular/core';
import {DefaultValidationErrorMessage, ValidationAttrs} from "./validator.service";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray, FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {UtilsService} from "../utils/utils.service";

export interface ImageExt {
  png?: boolean;
  jpg?: boolean;
  jpeg?: boolean;
}

export interface DocExt {
  doc?: boolean;
  docx?: boolean;
  pdf?: boolean;
}

export interface FileExt extends DocExt, ImageExt {
  xml?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(
    private utils: UtilsService,
  ) {
  }

  group(attrs: ValidationAttrs) {
    return new FormGroupProxy(attrs);
  }

  selectFile(isMultiple?: boolean, ext?: FileExt) {
    return new Promise<FileList>(resolve => {
      const file = this.utils.doc.createElement('input');
      file.type = 'file';
      file.accept = Object.keys(ext).reduce((acceptArray, key) => {
        if (ext[key]) acceptArray.push(`.${key}`);
        return acceptArray;
      }, []).join(',');
      file.multiple = isMultiple;
      file.addEventListener("change", () => resolve(file.files));
      file.click();
    });
  }

  selectImage(isMultiple?: boolean, ext: ImageExt = {png: true, jpeg: true, jpg: true}) {
    return this.selectFile(isMultiple, ext);
  }
}

// @ts-ignore
export class FormGroupProxy implements FormGroup {
  protected _group = new BehaviorSubject<FormGroup>(null);

  get group() {
    return this._group.getValue();
  }

  get asyncValidator() {
    return this.group.asyncValidator;
  }

  set asyncValidator(v) {
    this.group.asyncValidator = v;
  }

  get validator() {
    return this.group.validator;
  }

  set validator(v) {
    this.group.validator = v;
  }

  get controls() {
    return this.group.controls;
  }

  get errors() {
    return this.group.errors;
  }

  get pristine() {
    return this.group.pristine;
  }

  get status() {
    return this.group.status;
  }

  get statusChanges() {
    return this.group.statusChanges;
  }

  get touched() {
    return this.group.touched;
  }

  get value() {
    return this.group.value;
  }

  get valueChanges() {
    return this.group.valueChanges;
  }

  get dirty() {
    return this.group.dirty;
  }

  get disabled() {
    return this.group.disabled
  }

  get enabled() {
    return this.group.enabled;
  }

  get invalid() {
    return this.group.invalid;
  }

  get parent() {
    return this.group.parent;
  }

  get pending() {
    return this.group.pending;
  }

  get root() {
    return this.group.root;
  }

  get untouched() {
    return this.group.untouched;
  }

  get updateOn() {
    return this.group.updateOn;
  }

  get valid() {
    return this.group.valid;
  }

  constructor(protected attrs: ValidationAttrs) {
    const controls = Object.keys(attrs).reduce(((_controls, key) => {
      const attr = attrs[key];
      const ignoreAttrKeys = ['defaultValue', 'message', 'updateOnChange', 'customUpdateOnChange'];
      const validators = Object.keys(attr).reduce((_validators, validationAttrKey) => {
        if (ignoreAttrKeys.includes(validationAttrKey)) return _validators;
        const validationAttrValue = attr[validationAttrKey];

        if (validationAttrKey === "custom") {
          _validators.push(function (control: AbstractControl): ValidationErrors {
            const message = validationAttrValue(control);
            return message ? {custom: message} : null;
          })
          return _validators;
        }

        if (typeof validationAttrValue === "boolean") {
          _validators.push(Validators[validationAttrKey]);
        } else {
          _validators.push(Validators[validationAttrKey](validationAttrValue));
        }
        return _validators;
      }, []);

      const ctrl = _controls[key] = new FormControl(attr.defaultValue, validators);

      if (attr.customUpdateOnChange) {
        this._group.subscribe(group => {
          let oldValues = {};
          group && group.valueChanges.subscribe(value => {
            let isChanged = false;

            oldValues = attr.customUpdateOnChange.reduce((previousValue, _key) => {
              if (!isChanged) isChanged = previousValue[_key] !== value[_key];
              previousValue[_key] = value[_key];
              return previousValue;
            }, oldValues);

            if (isChanged) {
              ctrl.patchValue(ctrl.value, {emitEvent: true});
              group.get(key).markAsDirty();
              group.get(key).markAsTouched();
            }
          });
        })
      }
      return _controls;
    }), {});

    this._group.next(new FormGroup(controls));
  }

  addControl(name: string, control: AbstractControl) {
    return this.group.addControl(name, control);
  }

  private clearAsyncValidators() {
    return this.group.clearAsyncValidators();
  }

  private clearValidators() {
    return this.group.clearValidators();
  }

  contains(controlName: string) {
    return this.group.contains(controlName);
  }

  disable(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    return this.group.disable(opts);
  }

  enable(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    return this.group.enable(opts);
  }

  get(path: Array<string | number> | string) {
    return this.group.get(path);
  }

  private hasError(errorCode: string, path?: Array<string | number> | string) {
    return this.group.hasError(errorCode, path);
  }

  private getError(errorCode: string, path?: Array<string | number> | string) {
    return this.group.getError(errorCode, path);
  }

  hasErrors(fields?: string[]) {
    if (fields) {
      return fields.reduce((hasError, field) => {
        this.get(field).markAsDirty();
        this.get(field).markAsTouched();
        if (!hasError && this.get(field).invalid) hasError = true;
        return hasError;
      }, false);
    } else {
      this.markAsDirty();
      this.markAllAsTouched();
      return this.group.invalid;
    }
  }

  getErrorByControlName(controlName: string, fieldName?: string) {
    const ctrl: FormControl = this.group.get(controlName) as any;
    if (!ctrl || !(ctrl instanceof FormControl) || !ctrl.errors) return null;

    const errorKeys = Object.keys(ctrl.errors);
    if (errorKeys.length === 0) return null;

    const firstErrorKey = errorKeys[0];

    if (firstErrorKey === "custom") {
      return ctrl.errors[firstErrorKey];
    }

    const attr = this.attrs[controlName];
    const message = Object.assign({}, DefaultValidationErrorMessage, attr.message);

    return message.validate(firstErrorKey, attr, fieldName);
  }

  getRawValue() {
    return this.group.getRawValue();
  }

  markAllAsTouched() {
    return this.group.markAllAsTouched();
  }

  markAsDirty(opts?: { onlySelf?: boolean }) {
    return this.group.markAsDirty(opts);
  }

  markAsPending(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    return this.group.markAsPending(opts);
  }

  markAsPristine(opts?: { onlySelf?: boolean }) {
    return this.group.markAsPristine(opts);
  }

  markAsTouched(opts?: { onlySelf?: boolean }) {
    return this.group.markAsTouched(opts);
  }

  markAsUntouched(opts?: { onlySelf?: boolean }) {
    return this.group.markAsUntouched(opts);
  }

  patchValue(value: { [p: string]: any }, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    return this.group.patchValue(value, options);
  }

  registerControl(name: string, control: AbstractControl) {
    return this.group.registerControl(name, control);
  }

  removeControl(name: string) {
    return this.group.removeControl(name);
  }

  reset(value?: any, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    return this.group.reset(value, options);
  }

  private setAsyncValidators(newValidator: AsyncValidatorFn | AsyncValidatorFn[] | null): void {
    return this.group.setAsyncValidators(newValidator);
  }

  setControl(name: string, control: AbstractControl) {
    return this.group.setControl(name, control);
  }

  private setErrors(errors: ValidationErrors | null, opts?: { emitEvent?: boolean }) {
    return this.group.setErrors(errors, opts);
  }

  private setParent(parent: FormGroup | FormArray) {
    return this.group.setParent(parent);
  }

  private setValidators(newValidator: ValidatorFn | ValidatorFn[] | null) {
    return this.group.setValidators(newValidator);
  }

  setValue(value: { [p: string]: any }, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    return this.group.setValue(value, options);
  }

  updateValueAndValidity(opts?: { onlySelf?: boolean; emitEvent?: boolean }): void {
    return this.group.updateValueAndValidity(opts);
  }

  private _updateTreeValidity(opts?: { onlySelf?: boolean; emitEvent?: boolean }) {
    return this.group['_updateTreeValidity'](opts);
  }

  private _registerOnCollectionChange(callback) {
    return this.group['_registerOnCollectionChange'](callback);
  }

  private  _syncPendingControls() {
    return this.group['_syncPendingControls']();
  }
}
