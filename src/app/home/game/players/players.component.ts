import { Component, OnInit, OnDestroy } from "@angular/core";
import { GameService } from "../../../shared/services/game.service";
import { Observable, Subject } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import { ReducerManagerDispatcher } from "@ngrx/store";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit, OnDestroy {
  public matchId$: Observable<string>;
  public isMatchExists: boolean;
  public matchId: string;

  private destroy$ = new Subject();
  constructor(
    private gameService: GameService,
    // private dispatcher: ReducerManagerDispatcher
  ) {}

  ngOnInit() {
    // this.dispatcher
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     filter(action => action.type === "[Match] Start Match")
    //   )
    //   .subscribe(test => {
    //     console.log(123);
    //     console.log(test);
    //   });
    this.gameService
      .getMatchId()
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => (this.matchId = id));
  }

  onGameStart() {
    this.gameService.createMatch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
