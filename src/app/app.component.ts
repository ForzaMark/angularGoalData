import { Component, SecurityContext, OnInit } from '@angular/core';
import { Club } from './club.type';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { ConverterService } from './data-converter/service/converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'AngularCrawler';
  spieltag = 10;

  constructor(private http: HttpClient,
              private readonly converterService: ConverterService) {}

  ngOnInit() {
    const teamArray = this.converterService.getTeamArray();

    this.decide(this.converterService.convertNameToNumber('FC Cologne'), this.converterService.convertNameToNumber('Hoffenheim'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Paderborn'), this.converterService.convertNameToNumber('Augsburg'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Hertha Berlin'), this.converterService.convertNameToNumber('RasenBallsport Leipzig'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Mainz 05'), this.converterService.convertNameToNumber('Union Berlin'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Schalke 04'), this.converterService.convertNameToNumber('Fortuna Duesseldorf'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Bayern Munich'), this.converterService.convertNameToNumber('Borussia Dortmund'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Borussia M.Gladbach'), this.converterService.convertNameToNumber('Werder Bremen'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Wolfsburg'), this.converterService.convertNameToNumber('Bayer Leverkusen'), teamArray);
    this.decide(this.converterService.convertNameToNumber('Freiburg'), this.converterService.convertNameToNumber('Eintracht Frankfurt'), teamArray);
  }

  private decide(homeTeam: number, awayTeam: number, teamArray: Club[]) {
    const homeTeamScore0 = this.poissonDistribution(teamArray[homeTeam].xG / this.spieltag, 0);
    const homeTeamScore1 = this.poissonDistribution(teamArray[homeTeam].xG/ this.spieltag, 1);
    const homeTeamScore2 = this.poissonDistribution(teamArray[homeTeam].xG/ this.spieltag, 2);
    const homeTeamScore3 = this.poissonDistribution(teamArray[homeTeam].xG / this.spieltag, 3);
    const homeTeamConceed0 = this.poissonDistribution(teamArray[homeTeam].xGA / this.spieltag, 0);
    const homeTeamConceed1 = this.poissonDistribution(teamArray[homeTeam].xGA / this.spieltag, 1);
    const homeTeamConceed2 = this.poissonDistribution(teamArray[homeTeam].xGA / this.spieltag, 2);
    const homeTeamConceed3 = this.poissonDistribution(teamArray[homeTeam].xGA / this.spieltag, 3);

    const awayTeamScore0 = this.poissonDistribution(teamArray[awayTeam].xG / this.spieltag, 0);
    const awayTeamScore1 = this.poissonDistribution(teamArray[awayTeam].xG / this.spieltag, 1);
    const awayTeamScore2 = this.poissonDistribution(teamArray[awayTeam].xG / this.spieltag, 2);
    const awayTeamScore3 = this.poissonDistribution(teamArray[awayTeam].xG / this.spieltag, 3);
    const awayTeamConceed0 = this.poissonDistribution(teamArray[awayTeam].xGA / this.spieltag, 0);
    const awayTeamConceed1 = this.poissonDistribution(teamArray[awayTeam].xGA / this.spieltag, 1);
    const awayTeamConceed2 = this.poissonDistribution(teamArray[awayTeam].xGA / this.spieltag, 2);
    const awayTeamConceed3 = this.poissonDistribution(teamArray[awayTeam].xGA / this.spieltag, 3);

    const sumScoredArray = [];
    const sumConceedArray = [];

    const sum3Goals = homeTeamScore3 + awayTeamConceed3;
    const sum2Goals = homeTeamScore2 + awayTeamConceed2;
    const sum1Goals = homeTeamScore1 + awayTeamConceed1;
    const sum0Goals = homeTeamScore0 + awayTeamConceed0;
    sumScoredArray.push(sum3Goals);
    sumScoredArray.push(sum2Goals);
    sumScoredArray.push(sum1Goals);
    sumScoredArray.push(sum0Goals);

    const sum0Conceed = homeTeamConceed0 + awayTeamScore0;
    const sum1Conceed = homeTeamConceed1 + awayTeamScore1;
    const sum2Conceed = homeTeamConceed2 + awayTeamScore2;
    const sum3Conceed = homeTeamConceed3 + awayTeamScore3;
    sumConceedArray.push(sum0Conceed);
    sumConceedArray.push(sum1Conceed);
    sumConceedArray.push(sum2Conceed);
    sumConceedArray.push(sum3Conceed);

    const goalsHomeBySum = this.figureOutBiggestSum(sumScoredArray);
    const goalsAwayBySum = this.figureOutBiggestSum(sumConceedArray);

    console.log(goalsHomeBySum + ' Home' + ' : ' + goalsAwayBySum + ' Away');


  }

  private figureOutBiggestSum(sumArray: Club[]): number {
    let returnValue = 0;
    let max = sumArray[0];
    for (let i = 0; i < sumArray.length; i++) {
      if (max < sumArray[i]) {
        max = sumArray[i];
        returnValue = i;
      }
    }
    return returnValue;
  }

  private figureOutShortestDifference(diffArray: Club[]): number {
    let returnValue = 0;
    let min = diffArray[0];
    for (let i = 0; i < diffArray.length; i++) {
      if (min > diffArray[i]) {
        min = diffArray[i];
        returnValue = i;
      }
    }
    return returnValue;
  }

  private poissonDistribution(expectationValue: number, amountOfEvent: number ) : number {
    return ((Math.pow(expectationValue, amountOfEvent)/this.factorial(amountOfEvent)) * Math.pow(Math.E, (expectationValue*-1)));
  }

  private factorial(n) {
    return (n >= 1) ? n * this.factorial(n - 1) : 1;
  }
}
