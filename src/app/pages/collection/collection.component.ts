import { DataService } from './../../services/data.service';
import { Component, inject, OnInit } from '@angular/core';

import { NgFor, NgIf } from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {
router = inject(Router)
dataService = inject(DataService)
collections!:any[]

ngOnInit(): void {

  const getCollection = this.dataService.getLocalStorage()
  if(getCollection){
    this.collections = getCollection
  }

}
onDetail(item:any){
  this.router.navigate(['/detail-collection', item.id]);
}



onDelete(value:any){
  const deleteItem = this.collections.filter( item => item.id !== value.id)
  this.collections = deleteItem
  this.dataService.setLocalStorage(deleteItem)
}
}
