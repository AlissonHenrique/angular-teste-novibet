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
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { map  } from 'rxjs';
interface IData{
  item:Character,
  showSelect:boolean
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor, NgIf,FormsModule,MatButtonModule,MatInputModule,MatSelectModule,MatFormFieldModule, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  selectedValue!:string
  dataService= inject(DataService)
  itemsCollection!:ICollection[]
  rating:number  = 0
  stars = Array(5)
  constructor(@Inject(MAT_DIALOG_DATA) public data: IData,private dialogRef: MatDialogRef<ModalComponent>) {

  }

ngOnInit(): void {
 this.itemsCollection = this.dataService.getLocalStorage()
 if (this.data.item.rating) this.rating = this.data.item.rating

}
  close() {
    this.dialogRef.close();
  }
  setRating(value: number) {
      this.rating = value;
      this.data.item.rating = value;


    }
  onAddCollection(){

    const collectionSelected = this.selectedValue

   const updatedCollections = this.itemsCollection.map((collection: any) => {
    if (collection.id === collectionSelected) {
      return {
        ...collection,
        items: [...collection.items, this.data.item]
      };
    }
    return collection;
  });

  this.dataService.setLocalStorage(updatedCollections)
  this.close()

  }

}
