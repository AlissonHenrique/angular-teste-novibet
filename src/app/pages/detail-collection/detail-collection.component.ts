import { DataService } from './../../services/data.service';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Character } from '../../interface/ICharacters';
import { ICollection } from '../../interface/ICollection';

@Component({
  selector: 'app-detail-collection',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './detail-collection.component.html',
  styleUrl: './detail-collection.component.scss'
})
export class DetailCollectionComponent implements OnInit{

  @ViewChild('modal') modal!: ModalComponent;
  dialog= inject(MatDialog);
  dataService= inject(DataService)
  activatedRoute = inject(ActivatedRoute)
  itemsCollection!:any
  paramsId!:string | null
  ngOnInit(): void {
    const items = this.dataService.getLocalStorage()
    this.itemsCollection =  items

    this.getParams()

    const collection = this.dataService.getLocalStorage();
    const findId = collection.find(item => item.id == this.paramsId)
    this.itemsCollection = findId?.items
  }

getParams(){
  this.activatedRoute.paramMap.subscribe(params => {
    this.paramsId =  params.get('id');
  });
}


  openDialog(item: any) {
    this.dialog.open(ModalComponent, {
      width: '420px',
      data:  {
        item,
        showSelect:false
      }
    });
}
onDelete(item:Character){
  const collections = this.dataService.getLocalStorage();


  if (!collections) return;

  const updatedCollections = collections.map((collection: ICollection) => {
    if (collection.id === this.paramsId) {
      return {
        ...collection,
        items: collection.items.filter(
          (it: Character) => it.id !== item.id
        )
      };
    }
    return collection;
  });

  const findId = updatedCollections.find(item => item.id == this.paramsId)
  this.itemsCollection = findId?.items

  this.dataService.setLocalStorage(updatedCollections);



}
}
