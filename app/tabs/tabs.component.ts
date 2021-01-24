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
  @Input("activeTab") activeTabIndex: number = 0;
  @Output("activeTabChange") activeTabIndexChange: EventEmitter<
    number
  > = new EventEmitter();

  @ContentChildren(TabComponent) tabsQuery: QueryList<TabComponent>;
  tabs$: Observable<TabComponent[]>;

  constructor() {}

  ngOnChanges() {}

  ngOnInit() {
    this.activeTabIndex = 0;
    this.emitIndexChange();
  }

  ngAfterContentInit() {
    this.tabs$ = this.tabsQuery.changes.pipe(
      startWith(this.tabsQuery),
      map(tabsQuery => tabsQuery.toArray()),
      tap(tabsArray => {
        if (this.activeTabIndex >= tabsArray.length) {
          this.activeTabIndex = 0;
          this.emitIndexChange();
        }
      })
    );
  }

  emitIndexChange() {
    setTimeout(() => this.activeTabIndexChange.emit(this.activeTabIndex));
  }
}
