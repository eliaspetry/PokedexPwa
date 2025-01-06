import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Pokemon, PokemonModel } from '../../models/pokemon.model';
import { MatCardModule } from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-card',
	imports: [MatCardModule, TitleCasePipe],
	templateUrl: './card.component.html',
	styleUrl: './card.component.css',
})
export class CardComponent {
	@Input() pokemon: PokemonModel;

	constructor(private router: Router) {
		this.pokemon = new Pokemon('', '');
	}

	navigateToDetailsPage(pokemon: PokemonModel) {
		this.router.navigateByUrl(`/details/${pokemon.id}`, {
			state: { pokemon: pokemon },
		});
	}
}
