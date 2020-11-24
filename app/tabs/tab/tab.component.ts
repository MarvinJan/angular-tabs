import { Component,  OnInit, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: "tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"]
})
export class TabComponent implements OnInit {
  @ViewChild("title", { static: false }) title: TemplateRef<any>;
  @ViewChild("content", { static: false }) content: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
