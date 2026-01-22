import { validate } from './../../../../node_modules/webpack/types.d';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-create-collection',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule ,MatButtonModule],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.scss'
})
export class CreateCollectionComponent {

  form!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router)
  dataService = inject(DataService)
  constructor(){
    this.form = this.fb.group({
      title: ['',Validators.required],
      description:['',Validators.required]
    });
  }
  onSubmit(){
    const getCollection = localStorage.getItem('@collection');

      const newItem = {
        id:crypto.randomUUID(),
        title: this.form.value.title,
        description: this.form.value.description,
        items:[]
      };

      if (getCollection) {
        const collection = JSON.parse(getCollection);
        collection.push(newItem);
        this.dataService.setLocalStorage(collection)

      } else {
        const collection = [newItem];
        this.dataService.setLocalStorage(collection)
      }

      this.router.navigate(['/home']);
  }


}
