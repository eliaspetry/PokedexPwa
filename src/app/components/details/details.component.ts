import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PokemonModel, Pokemon, Stat } from '../../models/pokemon.model';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
	selector: 'app-details',
	imports: [
		TitleCasePipe,
		MatCardModule,
		MatButtonModule,
		MatProgressBarModule,
		CommonModule,
		RouterLink,
	],
	templateUrl: './details.component.html',
	styleUrl: './details.component.css',
})
export class DetailsComponent {
	state$: Observable<any>;
	pokemon: PokemonModel;
	showStats: boolean;
	statsButtonText: string;
	callsToAction: {
		show: string;
		hide: string;
	};

	constructor(private activatedRoute: ActivatedRoute) {
		this.state$ = this.activatedRoute.paramMap.pipe(
			map(() => window.history.state)
		);

		this.pokemon = new Pokemon('', '');

		this.callsToAction = {
			show: 'Mostrar stats',
			hide: 'Ocultar stats',
		};

		this.showStats = false;
		this.statsButtonText = this.callsToAction.show;
	}

	ngOnInit() {
		this.state$.subscribe((state) => {
			if (!state.pokemon) return;

			this.pokemon = state.pokemon;
			this.pokemon.stats = state.pokemon.stats.map((stat: Stat) => ({
				...stat,
				value: Math.floor((100 * stat.value) / 255), // Base Pokemon stats range from 0 to 255, so we need to do a cross-multiplication since Material progressbar admits values from 0 to 100 instead
			}));
		});
	}

	toggleStats() {
		if (this.showStats) {
			this.statsButtonText = this.callsToAction.show;
		} else {
			this.statsButtonText = this.callsToAction.hide;
		}

		this.showStats = !this.showStats;
	}
}
