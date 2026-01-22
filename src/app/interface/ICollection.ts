import { Character } from "./ICharacters"

export interface ICollection {
  id:string,
  title: string,
  description: string
  items:Character[]
}
