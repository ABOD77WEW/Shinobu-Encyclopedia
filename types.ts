// types.ts

export enum EntitySymbol {
    // Characters
    NarutoUzumaki, SasukeUchiha, SakuraHaruno, KakashiHatake, ItachiUchiha, Gaara, Jiraiya, MinatoNamikaze, Tsunade, Orochimaru, HashiramaSenju, TobiramaSenju, HiruzenSarutobi, ShikamaruNara, ChojiAkimichi, InoYamanaka, NejiHyuga, RockLee, MightGuy, MadaraUchiha, PainNagato,
    KibaInuzuka, ShinoAburame, AsumaSarutobi, KurenaiYuhi,
    MightDuy, Konan, Deidara,
    // Arcs
    PrologueLandOfWaves, ChuninExams, SasukeRecoveryMission, KazekageRescueMission, PainAssault, FiveKageSummit, FourthShinobiWar,
}


export enum ChakraNature {
    Fire = "نار",
    Water = "ماء",
    Earth = "أرض",
    Wind = "ريح",
    Lightning = "برق",
}

export interface Character {
  id: string;
  name: string;
  village: string;
  rank: string;
  symbol: EntitySymbol;
  bio: string;
  quote: string;
  natureType: ChakraNature[];
  jutsu: string[];
  affiliation: string[];
  powerScore: number;
  sRankInfo?: string; // For Pro users
}

export interface Arc {
  id:string;
  title: string;
  symbol: EntitySymbol;
  episodes: { from: number; to: number };
  summary: string;
  keyEvents: string[];
  notableCharacters: string[]; // array of character ids
}

export enum AbilityType {
  Ninjutsu = "نينجتسو",
  Genjutsu = "جينجتسو",
  Taijutsu = "تايجتسو",
  KekkeiGenkai = "كيكي غينكاي",
  KekkeiTota = "كيكي توتا",
  Fuinjutsu = "فوينجتسو",
}

export interface Ability {
  id: string;
  name: string;
  type: AbilityType;
  description: string;
  rank?: string;
  handSeals?: string;
  users: string[]; // array of character ids
  sRankInfo?: string; // For Pro users
}

export interface Organization {
    id: string;
    name: string;
    symbol: React.FC<{className?: string}>;
    leader: string;
    headquarters: string;
    members: string[]; // array of character ids
    goal: string;
}

export interface EyeTechnique {
    id: string;
    name: string;
    symbol: React.FC<{className?: string}>;
    classification: string;
    description: string;
    abilities: string[];
    users: string[]; // array of character ids
}

export interface Scroll {
    id: string;
    title: string;
    category: string;
    content: string;
}

export type FavoriteItem = Character | Arc | Ability | Organization | EyeTechnique | Scroll;

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}