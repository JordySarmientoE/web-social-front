import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UsersComponent } from './components/users/users.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MyDataComponent } from './components/my-data/my-data.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'timeline',
        component: TimelineComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/:page',
        component: UsersComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'my-data',
        component: MyDataComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
