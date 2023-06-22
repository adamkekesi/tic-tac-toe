import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedGamesPage } from './saved-games.page';

const routes: Routes = [
  {
    path: '',
    component: SavedGamesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedGamesRoutingModule {}
