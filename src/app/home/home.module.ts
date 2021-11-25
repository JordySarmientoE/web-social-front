import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './components/users/users.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagenUsuarioPipe } from '../pipes/imagen-usuario.pipe';
import { UserCardComponent } from './components/users/user-card/user-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    UsersComponent,
    PerfilComponent,
    MyDataComponent,
    ImagenUsuarioPipe,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
