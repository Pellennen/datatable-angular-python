import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef
} from "@angular/core";
import { Letter } from "../deadletters/letter.model";
import { LettersApiService } from "../deadletters/letters-api.service";
import {
  MdbTablePaginationComponent,
  MdbTableDirective,
  CollapseComponent
} from "angular-bootstrap-md";

@Component({
  selector: "app-deadlettertable",
  templateUrl: "./deadlettertable.component.html",
  styleUrls: ["./deadlettertable.component.scss"]
})
export class DeadlettertableComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true })
  mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  @ViewChild("row", { static: true }) row: ElementRef;

  DeadLetterSubs: any;
  DeadLetterList: any = [];
  headElements = ["Created_at", "Topic", "Customer"];
  DataPaginationAndSearch: Letter[];

  searchText: string = "";
  PreviousInList: String;
  selectedAll: boolean;
  selectedOne: boolean;
  CheckboxArray: any = [];

  constructor(
    private LetterApi: LettersApiService,
    private cdRef: ChangeDetectorRef
  ) {}

  @HostListener("input") oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  ngOnInit() {
    (this.DeadLetterSubs = this.LetterApi.getLetterTables().subscribe(
      (data: any) => {
        data.forEach((Letter: any) => {
          this.DeadLetterList.push({
            id: Letter.id,
            created_at: Letter.created_at.toString(),
            topic: Letter.topic,
            schema: Letter.schema,
            decoded_value: Letter.decoded_value,
            log: Letter.log,
            selected: false
          });
        });
        this.mdbTable.setDataSource(this.DeadLetterList);
      }
    )),
      (this.DeadLetterList = this.mdbTable.getDataSource());
    this.PreviousInList = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        collapse.toggle();
      });
    });
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.PreviousInList);
      this.DeadLetterList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.DeadLetterList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }

  CheckOne(selectedvalue: boolean, index: number, deadletterId: number) {
    this.selectedOne = true;

    if (selectedvalue === true) {
      this.CheckboxArray.push({ deadletterId, index, selectedvalue });
    }
    if (selectedvalue === false) {
      for (var i = this.CheckboxArray.length - 1; i >= 0; --i) {
        if (this.CheckboxArray[i].index == index) {
          this.CheckboxArray.splice(i, 1);
        }
      }
      this.selectedOne = false;
    }
  }

  CheckAll() {
    for (var index = 0; index < this.DeadLetterList.length; index++) {
      const selectedAllId = this.DeadLetterList[index].id;

      this.DeadLetterList[index].selected = this.selectedAll;
      if (this.selectedAll === true) {
        this.CheckboxArray.push({ index, selectedAllId });
      }
      if (this.selectedAll === false) {
        this.CheckboxArray.splice(index);
      }
    }
  }

  IamSureDelete() {
    if (this.selectedOne === true) {
      for (var i = 0; i < this.CheckboxArray.length; i++) {
        this.LetterApi.deleteLetter(
          this.CheckboxArray[i].deadletterId
        ).subscribe(() => {
          this.DeadLetterSubs = this.LetterApi.getLetterTables().subscribe(
            res => {
              this.DeadLetterList = res;
            }
          );
        });
        this.mdbTable.setDataSource(this.DeadLetterList);
      }
    }
    if (this.selectedAll === true) {
      for (var i = 0; i < this.CheckboxArray.length; i++) {
        this.LetterApi.deleteLetter(
          this.CheckboxArray[i].selectedAllId
        ).subscribe(() => {
          this.DeadLetterSubs = this.LetterApi.getLetterTables().subscribe(
            res => {
              this.DeadLetterList = res;
            }
          );
        });
      }
    }
    this.selectedOne = false;
    this.selectedAll = false;
    this.CheckboxArray = [];
    this.DeadLetterList = this.mdbTable.getDataSource();
  }

  ngOnDestroy() {
    this.DeadLetterSubs.unsubscribe();
  }
}
