import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './page/basic/basic.component';
import { EditableComponent } from './page/editable/editable.component';
import { FilterComponent } from './page/filter/filter.component';
import { HomeComponent } from './page/home/home.component';
import { PaginatorComponent } from './page/paginator/paginator.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'basic',
    component: BasicComponent
  },
  {
    path: 'paginator',
    component: PaginatorComponent
  },
  {
    path: 'filter',
    component: FilterComponent
  },
  {
    path: 'editable',
    component: EditableComponent
  },
  {
    path: 'editable/edit/:id',
    component: UserEditorComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
