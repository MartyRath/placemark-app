// Defines User type object
export interface User {
    username: string;
    email: string;
    password: string;
    uid?: string; //Optional property. Can also | for logical or
  }

  export interface Province {
    name: string;
  }

export interface UserTree {
  species: string;
  height: number;
  girth: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  userId?: string ;
  province: string;
}

export interface ChampionTree {
  species: string;
  height: number;
  girth: number;
  province: Province;
  location?: string;
  latitude?: number;
  longitude?: number;
}
