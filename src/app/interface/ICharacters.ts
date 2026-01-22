export interface ICharacter {
  info: ApiInfo;
  results: Character[];
}
export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: LocationRef;
  location: LocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
  rating?:number
}
export interface LocationRef {
  name: string;
  url: string;
}
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';
