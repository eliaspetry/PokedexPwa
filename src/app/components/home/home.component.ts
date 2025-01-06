import { Component } from '@angular/core';
import { PokeApiService } from '../../services/pokeapi.service';
import { Observable } from 'rxjs';
import { PokemonModel } from '../../models/pokemon.model';
import { CardComponent } from '../card/card.component';
import { GridComponent } from '../grid/grid.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
	selector: 'app-home',
	imports: [
		CardComponent,
		GridComponent,
		MatButtonToggleModule,
		MatIconModule,
		CommonModule,
		MatProgressSpinnerModule,
	],
	providers: [PokeApiService],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	animations: [
		trigger('cardAnimation', [
			transition(':enter', [
				style({ opacity: '0' }),
				animate('500ms ease-in-out', style({ opacity: '1' })),
			]),
		]),
	],
})
export class HomeComponent {
	pokemonList$: Observable<PokemonModel>;
	dataSource: PokemonModel[];
	isCardViewSelected: boolean;
	isLoading: boolean;

	constructor(private pokeApiService: PokeApiService) {
		this.pokemonList$ = this.pokeApiService.getPokemonList();
		this.dataSource = [];
		this.isCardViewSelected = false;
		this.isLoading = true;
	}

	ngOnInit() {
		const data: PokemonModel[] = [];

		this.pokemonList$
			.subscribe((pokemon) => data.push(pokemon))
			.add(() => {
				this.dataSource = data;
				this.isLoading = false;
			});
	}

	/**
	 * Toggles the card view. If false, shows the grid view instead
	 */
	toggleCardView(show: boolean) {
		this.isCardViewSelected = show;
	}
}
