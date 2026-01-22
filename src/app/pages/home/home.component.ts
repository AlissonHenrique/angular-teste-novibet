
import { Component, inject, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable,map } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';
import { Character } from '../../interface/ICharacters';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

dataService = inject(DataService);
fb = inject(FormBuilder);
dialog= inject(MatDialog);
form!: FormGroup;

list$!:Observable<Character[]>;

selectedItem!: Character
@ViewChild('modal') modal!: ModalComponent;
detail!:Character


constructor(){
  this.form = this.fb.group({
    search: ['']
  });

  this.list$ = this.dataService.getList().pipe(
    map((res:any)=>res.results.map((it:any)=>({
      ...it,
      rating: 0
    }))),

  );
}

onSubmit(){
  console.log(this.form.value);
}

openDialog(item: any) {
  this.dialog.open(ModalComponent, {
    width: '600px',
     data:  {
        item,
        showSelect:true
      }
  });

}


}
