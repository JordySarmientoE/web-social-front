import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './shared/home-page/home-page.component';
import { MaterialModule } from '../material/material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UsersComponent } from './components/users/users.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MyDataComponent } from './components/my-data/my-data.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagenUsuarioPipe } from '../pipes/imagen-usuario.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    TimelineComponent,
    UsersComponent,
    PerfilComponent,
    MyDataComponent,
    ImagenUsuarioPipe
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