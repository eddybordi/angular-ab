import { Directive, Input, TemplateRef, ViewContainerRef, Inject } from '@angular/core';
import { ABTestService } from './abtest.service';

@Directive({
  selector: '[abTest]',
  providers: [ABTestService]
})
export class AngularAB {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private abTestService: ABTestService
  ) {}

  @Input() set abTest(elm: string) {
    let show = this.abTestService.checkTest(elm);

    if(show) this.viewContainer.createEmbeddedView(this.templateRef);
    else this.viewContainer.clear();
  }

}