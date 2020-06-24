import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {ThemePalette} from "@angular/material/core";
import {UtilsService} from "../../services/utils/utils.service";

/**
 * 局部单例
 */
let coverService: CoverService;

@Injectable({
  providedIn: 'root'
})
export class CoverService {
  templateRef: TemplateRef<any>;
  privateStyleEl: HTMLStyleElement;
  loading: CoverLoading;
  isOpened = new BehaviorSubject(false);
  isDisappear: boolean;

  constructor(private utils: UtilsService) {
    coverService = this;

    if (!this.privateStyleEl) {
      this.privateStyleEl = this.utils.doc.createElement('style');
      this.utils.doc.head.appendChild(this.privateStyleEl);
    }
  }

  setTemplateRef(tmpl: TemplateRef<any>) {
    this.templateRef = tmpl;
    if (tmpl) {
      this.privateStyleEl.innerHTML = `.cdk-overlay-container { display: none; }`;
    }
  }

  destroyTemplateRef() {
    this.templateRef = null;
    this.privateStyleEl.innerHTML = ``;
  }

  open(callback?: Function) {
    this.isOpened.next(true);
    return this.utils.delay(300, callback).then(resp => {
      this.isDisappear = true;
      this.destroyTemplateRef();
      return resp;
    });
  }

  close(callback?: Function) {
    this.isDisappear = false;
    this.isOpened.next(false);
    return this.utils.delay(500, callback);
  }
}

export interface CoverLoadingStep {
  name: string;

  handler(index?: number, loading?: CoverLoading): Promise<boolean>;
}

export class CoverLoading {
  mode: ProgressBarMode = "query";
  color: ThemePalette = "accent";
  value: number;
  bufferValue: number;
  text: string;

  constructor(public steps: CoverLoadingStep[]) {
  }

  private async runStep(index = 0): Promise<boolean> {
    const step = this.steps[index];
    if (!step) return true;
    this.text = step.name;
    const resp = await step.handler(index, this);
    return resp ? this.runStep(index + 1) : false;
  }

  async run(autoOpen = true) {
    coverService.close();
    coverService.loading = this;
    const resp = await this.runStep();
    if (autoOpen && resp) {
      await coverService.open();
    }
    coverService.loading = null;
  }

  autoCalcValue(currentStepIndex: number) {
    this.value = currentStepIndex / this.steps.length * 100;
  }
}
