// Defines User type object
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    uid?: string; //Optional property. Can also | for logical or
  }

  export interface Province {
    name: string;
  }

export interface UserTree {
  title: string;
  height: number;
  girth: number;
  description?: string;
  latitude?: number;
  longitude?: number;
  userId?: string ;
  province: Province;
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