import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface AllBooksItem {
  name: string;
  price: number;
  publisher:string;
  author: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AllBooksItem[] = [
  {id: 1, name: 'Wings of Fire', author:'Wings', publisher:'publisher1', price: 0.1},
  {id: 2, name: 'Good Boy Bad Boy', author:'Good', publisher:'publisher2', price: 0.2},
  {id: 3, name: 'Gravity', author:'Gravity', publisher:'publisher3', price: 0.3},
  {id: 4, name: 'Rich Man Poor Man', author:'Rich', publisher:'publisher4', price: 0.4},
  {id: 5, name: 'Monoglean', author:'Monoglean', publisher:'publisher5', price: 0.5},
  {id: 6, name: 'Game of Thornes', author:'Game', publisher:'publisher6', price: 0.6},
  {id: 7, name: 'Napolean', author:'Napolean', publisher:'publisher7', price: 0.7},
  {id: 8, name: 'Age of Empire', author:'Age', publisher:'publisher8', price: 0.8},
  {id: 9, name: 'Surya', author:'Surya', publisher:'publisher9', price: 0.9},
  {id: 10, name: 'Yoga', author:'Yoga', publisher:'publisher10', price: 0.10}
];

/**
 * Data source for the AllBooks view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AllBooksDataSource extends DataSource<AllBooksItem> {
  data: AllBooksItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AllBooksItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AllBooksItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AllBooksItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'price': return compare(a.name, b.name, isAsc);
        case 'publisher': return compare(a.name, b.name, isAsc);
        case 'author': return compare(a.name, b.name, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
