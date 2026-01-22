import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path:'home',
  loadComponent:()=>import('./pages/home/home.component').then(m=>m.HomeComponent)
},
{
  path:'collections',
  loadComponent:()=>import('./pages/collection/collection.component').then(m=>m.CollectionComponent)
},
{
  path:'create-collection',
  loadComponent:()=>import('./pages/create-collection/create-collection.component').then(m=>m.CreateCollectionComponent)
},
{
  path:'detail-collection/:id',
  loadComponent:()=>import('./pages/detail-collection/detail-collection.component').then(m=>m.DetailCollectionComponent)
}




];
