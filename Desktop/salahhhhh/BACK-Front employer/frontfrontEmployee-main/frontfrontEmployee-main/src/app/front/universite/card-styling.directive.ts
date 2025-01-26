import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardStyling]'
})
export class CardStylingDirective {
  private scale: number = 1.07; // Vous pouvez ajuster la valeur de l'échelle selon vos besoins

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.zoomIn();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.zoomOut();
  }

  private zoomIn() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.scale})`);
  }

  private zoomOut() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}