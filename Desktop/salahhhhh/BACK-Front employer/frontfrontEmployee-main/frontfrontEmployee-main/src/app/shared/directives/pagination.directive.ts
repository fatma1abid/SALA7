import { Directive, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective implements OnChanges {
  @Input() items: any[] = [];
  @Input() itemsPerPage: number = 1;

  @Output() paginatedItems = new EventEmitter<any[]>();
  @Output() currentPage = new EventEmitter<number>();

  private totalPages: number = 0;
  private currentPageNumber: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['itemsPerPage']) {
      console.log(this.items);
      this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      console.log(this.totalPages);
      this.currentPageNumber = 1;
      this.paginate();
    }
  }

  setPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPageNumber = pageNumber;
      this.paginate();
      this.currentPage.emit(this.currentPageNumber);
    }
  }

  private paginate(): void {
    const startIndex = (this.currentPageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageItems = this.items.slice(startIndex, endIndex);
    console.log(pageItems);
    this.paginatedItems.emit(pageItems);
  }
}



