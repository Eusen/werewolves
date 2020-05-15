import {Injectable} from '@angular/core';

export enum PlayerIncarnationTypes {
  DefaultMale, // 默认男
  DefaultFemale, // 默认女
  CivilianMale, // 平民男
  CivilianFemale, // 平民女
}

export interface PlayerIncarnation {
  type: PlayerIncarnationTypes;
  name: string;
  coverLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerIncarnationService {
  incarnations: PlayerIncarnation[] = [
    {
      type: PlayerIncarnationTypes.CivilianMale,
      name: '平民·男',
      coverLink: '/assets/img/portrait/pm_m.png',
    },
    {
      type: PlayerIncarnationTypes.CivilianFemale,
      name: '平民·女',
      coverLink: '/assets/img/portrait/pm_f.png',
    },
  ];

  constructor() {
  }
}
