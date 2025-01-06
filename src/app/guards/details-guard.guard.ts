import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class DetailsGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(): boolean {
		const currentNavigation = this.router.getCurrentNavigation();

		if (
			currentNavigation &&
			currentNavigation.extras.state &&
			currentNavigation.extras.state['pokemon']
		) {
			return true;
		}

		this.router.navigateByUrl('/');
		return false;
	}
}
