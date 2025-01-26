import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoomFoyer]'
})
export class ZoomFoyerDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.zoomIn();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.zoomOut();
  }

  private zoomIn() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.2)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s');
  }

  private zoomOut() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s');
  }
}
