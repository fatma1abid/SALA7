import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorbackground]'
})
export class ColorbackgroundDirective {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // Ajoutez votre logique ici
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

}
