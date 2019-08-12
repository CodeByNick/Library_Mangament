import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
 
  isDisabled:boolean = false;

  data=[10,5,3,2];
  import_logo = ["import_contacts","school","library_books","filter_none"]

  back=[
    {'background':'#00ACD7'},
    {'background':'#009450'},
    {'background':'#DA8C10'},
    {'background':'#C64333'}
  ]

  tiles = [
    {cols: 4, rows: 1, color: 'lightblue'},
  ];

  BarChart=[];
  PieChart=[];

  ngOnInit(){
    this.BarChart = new Chart('ctx1', {
      type: 'bar',
      data: {
          labels: ["Books", "Students", "Borrowed", "Pending"],
          datasets: [{
              label: ['Books','Students',"Borrowed","Pending"],
              data: [6, 5, 3, 2],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(255, 144, 43, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 144, 43, 0.2)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
      });


      this.PieChart = new Chart('ctx2',{
        type: 'pie',
        data: {
          labels : ["Books", "Students", "Borrowed", "Pending"],
          datasets: [{
            label: 'Books',
            data: [12, 19, 3, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 144, 43, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 144, 43, 1)'
            ],
            
            borderWidth: 1
          }]
        }
      //   options: {
      //     scales: {
      //         yAxes: [{
      //             ticks: {
      //                 beginAtZero:true
      //             }
      //         }]
      //     }
      // }
    })
  }


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Books', cols: 1, rows: 1 },
          { title: 'Students', cols: 1, rows: 1 },
          { title: 'Borrowed Books', cols: 1, rows: 1 },
          { title: 'Pending Books', cols: 1, rows: 1 }
        ];
      }

      return [

        { logo: this.import_logo[0], total: this.data[0], back:this.back[0], title: 'Books', cols: 1, rows: 1 },
        { logo: this.import_logo[1], total: this.data[1], title: 'Students', cols: 1, rows: 1 },
        { logo: this.import_logo[2], total: this.data[2], title: 'Borrowed', cols: 1, rows: 1 },
        { logo: this.import_logo[3], total: this.data[3], title: 'Pending', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
