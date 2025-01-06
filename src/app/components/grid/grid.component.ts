import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonModel } from '../../models/pokemon.model';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-grid',
	imports: [MatTableModule, CommonModule, TitleCasePipe],
	templateUrl: './grid.component.html',
	styleUrl: './grid.component.css',
})
export class GridComponent {
	@Input() dataSource: PokemonModel[] = [];
	displayedColumns: string[] = ['id', 'name', 'description', 'sprite'];

	constructor(private router: Router) {}

	navigateToDetailsPage(pokemon: PokemonModel) {
		this.router.navigateByUrl(`/details/${pokemon.id}`, {
			state: { pokemon: pokemon },
		});
	}
}
