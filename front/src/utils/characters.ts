import { HeroCharacter } from '../types/auth';

export interface CharacterInfo {
  name: string;
  universe: 'Marvel' | 'DC';
  color: string;
  description: string;
  icon: string;
}

export const CHARACTER_INFO: Record<HeroCharacter, CharacterInfo> = {
  [HeroCharacter.MARVEL_SPIDERMAN]: {
    name: 'Homem-Aranha',
    universe: 'Marvel',
    color: 'from-red-500 to-blue-600',
    description: 'Agilidade e responsabilidade',
    icon: '🕷️'
  },
  [HeroCharacter.MARVEL_IRONMAN]: {
    name: 'Homem de Ferro',
    universe: 'Marvel',
    color: 'from-red-600 to-yellow-500',
    description: 'Tecnologia e inovação',
    icon: '🤖'
  },
  [HeroCharacter.MARVEL_CAPTAIN_AMERICA]: {
    name: 'Capitão América',
    universe: 'Marvel',
    color: 'from-blue-600 to-red-500',
    description: 'Liderança e justiça',
    icon: '🛡️'
  },
  [HeroCharacter.MARVEL_THOR]: {
    name: 'Thor',
    universe: 'Marvel',
    color: 'from-blue-500 to-gray-600',
    description: 'Poder e honra',
    icon: '⚡'
  },
  [HeroCharacter.MARVEL_HULK]: {
    name: 'Hulk',
    universe: 'Marvel',
    color: 'from-green-500 to-green-700',
    description: 'Força e determinação',
    icon: '💚'
  },
  [HeroCharacter.MARVEL_BLACK_WIDOW]: {
    name: 'Viúva Negra',
    universe: 'Marvel',
    color: 'from-black to-red-600',
    description: 'Estratégia e precisão',
    icon: '🕸️'
  },
  [HeroCharacter.DC_BATMAN]: {
    name: 'Batman',
    universe: 'DC',
    color: 'from-gray-800 to-black',
    description: 'Inteligência e justiça',
    icon: '🦇'
  },
  [HeroCharacter.DC_SUPERMAN]: {
    name: 'Superman',
    universe: 'DC',
    color: 'from-blue-600 to-red-500',
    description: 'Esperança e proteção',
    icon: '💪'
  },
  [HeroCharacter.DC_WONDER_WOMAN]: {
    name: 'Mulher Maravilha',
    universe: 'DC',
    color: 'from-red-500 to-yellow-400',
    description: 'Sabedoria e coragem',
    icon: '⚔️'
  },
  [HeroCharacter.DC_FLASH]: {
    name: 'Flash',
    universe: 'DC',
    color: 'from-red-500 to-yellow-400',
    description: 'Velocidade e heroísmo',
    icon: '⚡'
  },
  [HeroCharacter.DC_GREEN_LANTERN]: {
    name: 'Lanterna Verde',
    universe: 'DC',
    color: 'from-green-500 to-green-700',
    description: 'Vontade e criatividade',
    icon: '💚'
  },
  [HeroCharacter.DC_AQUAMAN]: {
    name: 'Aquaman',
    universe: 'DC',
    color: 'from-blue-500 to-green-500',
    description: 'Liderança dos oceanos',
    icon: '🔱'
  },
};

export function getCharacterInfo(character?: HeroCharacter): CharacterInfo | null {
  if (!character) return null;
  return CHARACTER_INFO[character];
}

export function getCharactersByUniverse(universe: 'Marvel' | 'DC'): Array<{ character: HeroCharacter; info: CharacterInfo }> {
  return Object.entries(CHARACTER_INFO)
    .filter(([_, info]) => info.universe === universe)
    .map(([character, info]) => ({ character: character as HeroCharacter, info }));
}
