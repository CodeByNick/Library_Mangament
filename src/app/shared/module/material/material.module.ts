import { MatFormFieldModule} from '@angular/material';
import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,MatDividerModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatSelectModule, MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule,MatDividerModule,MatDialogModule,MatTableModule,MatMenuModule,MatIconModule,MatProgressSpinnerModule,MatToolbarModule,MatIconModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatTooltipModule],
  exports: [MatToolbarModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule,MatDividerModule,MatDialogModule,MatTableModule,MatMenuModule,MatIconModule,MatProgressSpinnerModule,MatToolbarModule,MatIconModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatTooltipModule]
})
export class MaterialModule { }
