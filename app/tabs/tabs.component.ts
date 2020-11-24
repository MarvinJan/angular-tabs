import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList
} from "@angular/core";
import { Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";
import { TabComponent } from "./tab/tab.component";

@Component({
  selector: "tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {
  @Input("activeTab") activeTabIndex: number;
  @Output("activeTabChange") activeTabIndexChange: EventEmitter<
    number
  > = new EventEmitter();

  @ContentChildren(TabComponent) tabsQuery: QueryList<TabComponent>;
  tabs$: Observable<TabComponent[]>;

  constructor() {}

  ngOnChanges() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.activeTabIndex = 0;

    this.tabs$ = this.tabsQuery.changes.pipe(
      startWith(this.tabsQuery),
      map(tabsQuery => tabsQuery.toArray()),
      tap(tabsArray => {
        if (this.activeTabIndex >= tabsArray.length) this.activeTabIndex = 0;
      })
    );
  }
}
