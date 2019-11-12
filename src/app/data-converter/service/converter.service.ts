import { Injectable } from '@angular/core';
import { Club } from 'src/app/club.type';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  private teamArray: Club[];

  constructor() { }

  public getTeamArray() {
    return this.teamArray;
  }

  public setTeamArray(teamArray: Club[]) {
    this.teamArray = teamArray;
  }

  public convertNameToNumber(num: string): number {
    switch (num) {
      case 'Bayern Munich':
        return 0;
      case 'Bayer Leverkusen':
        return 1;
      case 'Hoffenheim':
        return 2;
      case 'Augsburg':
        return 3;
      case 'Hertha Berlin':
        return 4;
      case 'Werder Bremen':
        return 5;
      case 'Schalke 04':
        return 6;
      case 'Mainz 05':
        return 7;
      case 'Borussia Dortmund':
        return 8;
      case 'Borussia M.Gladbach':
        return 9;
      case 'Wolfsburg':
        return 10;
      case 'Eintracht Frankfurt':
        return 11;
      case 'FC Cologne':
        return 12;
      case 'Freiburg':
        return 13;
      case 'RasenBallsport Leipzig':
        return 14;
      case 'Paderborn':
        return 15;
      case 'Fortuna Duesseldorf':
        return 16;
      case 'Union Berlin':
        return 17;
    }
  }
}
