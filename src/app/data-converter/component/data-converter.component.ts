import { Component, OnInit } from '@angular/core';
import { Club } from '../../club.type';
import { ConverterService } from '../service/converter.service';
import { TeamData } from '../types/TeamData.type';

@Component({
  selector: 'app-data-converter',
  templateUrl: './data-converter.component.html',
  styleUrls: ['./data-converter.component.scss']
})
export class DataConverterComponent implements OnInit {

  constructor(private readonly converterService: ConverterService) { }

  ngOnInit() {

    const utf = require('utf8');
    // das in Datei auslagern
    // const newT = JSON.parse('\x7B\x22117\x22\x3A\x7B');
    const newT = JSON.parse('\x7B\x22117\x22\x3A\x7B\x22id\x22\x3A\x22117\x22,\x22title\x22\x3A\x22Bayern\x20Munich\x22,\x22history\x22\x3A\x5B\x7B\x22h_a\x22\);
    console.log(newT);

    const test = [new Club(), new Club()];

    // this.convertObjectEntriesToTeamData(Object.entries(newT));
    const teamData: TeamData[] = Object.entries(newT);
    const teamArray: Club[] = [];

    for (const team of teamData) {
      const thisTeam = new Club();
      const history = team[1].history;
      thisTeam.name = team[1].title;
      for (const game of history) {
        thisTeam.xG = thisTeam.xG + game.xG;
        thisTeam.xGA = thisTeam.xGA + game.xGA;
      }
      teamArray.push(thisTeam);
    }
    this.converterService.setTeamArray(teamArray);
  }

  private convertObjectEntriesToTeamData(entries: [string, unknown]) {
    for (const x of entries) {
      console.log(x);
    }
  }



}
