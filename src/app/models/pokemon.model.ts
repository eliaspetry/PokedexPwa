export interface Stat {
	name: string;
	value: number;
}

export interface PokemonModel {
	id: number;
	name: string;
	description: string;
	url: string;
	sprite: string;
	stats: Stat[];
}

export class Pokemon implements PokemonModel {
	id: number;
	name: string;
	description: string;
	url: string;
	sprite: string;
	stats: Stat[];

	constructor(name: string, url: string) {
		const results = url.match(/\/v2\/pokemon\/(?<id>\d+)\//);
		this.id = parseInt(results?.groups?.['id'] || '0');
		this.name = name;
		this.description = '';
		this.url = url;
		this.sprite = './images/whos-that-pokemon.png'; // Placeholder image until actual sprite is loaded
		this.stats = [];
	}
}
