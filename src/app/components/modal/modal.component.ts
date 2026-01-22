import { DataService } from './../../services/data.service';
import { Component, ElementRef, inject, Inject, Input,  OnInit,  ViewChild } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Character } from '../../interface/ICharacters';
import { FormsModule } from '@angular/forms';
import { ICollection } from '../../interface/ICollection';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {   NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor, NgIf,FormsModule,MatButtonModule,MatInputModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  selectedValue!:string
  dataService= inject(DataService)
  itemsCollection!:ICollection[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: Character,private dialogRef: MatDialogRef<ModalComponent>) {

  }

ngOnInit(): void {
 this.itemsCollection = this.dataService.getLocalStorage()
}

  close() {
    this.dialogRef.close();
  }

  onAddCollection(){

    const collectionSelected = this.selectedValue

   const updatedCollections = this.itemsCollection.map((collection: any) => {
    if (collection.id === collectionSelected) {
      return {
        ...collection,
        items: [...collection.items, this.data]
      };
    }
    return collection;
  });

  this.dataService.setLocalStorage(updatedCollections)
  this.close()

  }

}
