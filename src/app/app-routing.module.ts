import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/game').then((m) => m.GameModule),
  },
  {
    path: 'saved-games',
    loadChildren: () =>
      import('./pages/saved-games').then((m) => m.SavedGamesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
