import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface AllBooksItem {
  name: string;
  return_date:string;
  expire_date: string,
  issue_date:string;
  author: string;
  id: number;
  action:[string];
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AllBooksItem[] = [
  {id: 1, name: 'Wings of Fire', author:'Wings', issue_date:'1', expire_date: '1', return_date:'1',action:['reply']},
  {id: 2, name: 'Good Boy Bad Boy', author:'Good', issue_date:'2', expire_date: '2',return_date:'2',action:['reply']},
  {id: 3, name: 'Gravity', author:'Gravity', issue_date:'3', expire_date: '3',return_date:'3',action:['reply']},
  {id: 4, name: 'Rich Man Poor Man', author:'Rich', issue_date:'4', expire_date: '4',return_date:'4',action:['reply']},
  {id: 5, name: 'Monoglean', author:'Monoglean', issue_date:'5', expire_date: '5',return_date:'5',action:['reply']},
  {id: 6, name: 'Game of Thornes', author:'Game', issue_date:'6', expire_date: '6',return_date:'6',action:['reply']},
  {id: 7, name: 'Napolean', author:'Napolean', issue_date:'7', expire_date: '7',return_date:'7',action:['reply']},
  {id: 8, name: 'Age of Empire', author:'Age', issue_date:'8', expire_date: '8',return_date:'8',action:['reply']},
  {id: 9, name: 'Surya', author:'Surya', issue_date:'9', expire_date: '9',return_date:'9',action:['reply']},
  {id: 10, name: 'Yoga', author:'Yoga', issue_date:'10', expire_date: '10',return_date:'10',action:['reply']}
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
        case 'action': return compare(null, null, isAsc);
        case 'expire_date': return compare(a.name, b.name, isAsc);
        case 'issue_date': return compare(a.name, b.name, isAsc);
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
