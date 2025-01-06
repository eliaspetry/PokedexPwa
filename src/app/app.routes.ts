import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { DetailsGuard } from './guards/details-guard.guard';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'details/:id',
		component: DetailsComponent,
		canActivate: [DetailsGuard],
	},
];
