import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, concatMap, switchMap, forkJoin } from 'rxjs';
import { Pokemon, PokemonModel } from '../models/pokemon.model';

export interface PokemonListResponse {
	count: number;
	previous?: string;
	next?: string;
	results: Pokemon[];
}

export interface PokemonDetailsResponse {
	sprites: {
		front_default: string;
	};
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
}

export interface PokemonSpeciesResponse {
	flavor_text_entries: {
		flavor_text: string;
		language: {
			name: string;
		};
	}[];
}

@Injectable({
	providedIn: 'root',
})
export class PokeApiService {
	baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = 'https://pokeapi.co/api/v2';
	}

	getPokemonList(
		limit: number = 20,
		offset: number = 0
	): Observable<PokemonModel> {
		return this.http
			.get<PokemonListResponse>(
				`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
			)
			.pipe(
				switchMap(({ results }) =>
					results.map(({ name, url }) => new Pokemon(name, url))
				),
				// We'll be using concatMap() instead of mergeMap() operator here to "bomb" the external API server less than we are doing already, essentially trading the concurrency for some easy order preservation
				concatMap((pokemon: PokemonModel) =>
					forkJoin([
						this.getPokemonDetails(pokemon.id).pipe(
							map(({ sprites, stats }) => ({
								sprite: sprites.front_default,
								stats: stats.map(({ stat, base_stat }) => ({
									name: stat.name,
									value: base_stat,
								})),
							}))
						),
						this.getPokemonSpecies(pokemon.id).pipe(
							map(({ flavor_text_entries }) => ({
								description:
									flavor_text_entries.find(
										(entry) => entry.language.name === 'es'
									)?.flavor_text ||
									`No se han podido encontrar detalles en castellano para ${
										pokemon.name.length > 1
											? pokemon.name[0].toUpperCase() +
											  pokemon.name.slice(1)
											: pokemon.name.toUpperCase()
									}.`,
							}))
						),
					]).pipe(
						map(([{ sprite, stats }, { description }]) => ({
							...pokemon,
							description: description,
							sprite: sprite,
							stats: stats,
						}))
					)
				)
			);
	}

	getPokemonDetails(id: number): Observable<PokemonDetailsResponse> {
		return this.http.get<PokemonDetailsResponse>(
			`${this.baseUrl}/pokemon/${id}/`
		);
	}

	getPokemonSpecies(id: number): Observable<PokemonSpeciesResponse> {
		return this.http.get<PokemonSpeciesResponse>(
			`${this.baseUrl}/pokemon-species/${id}/`
		);
	}
}
