import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { map, switchMap, toArray } from "rxjs/operators";
import { IBadWords } from "src/app/core/interfaces/badwordInterface";
import { BadWords } from "src/app/core/models/bad-words.model";
import { BadWordsService } from "src/app/core/services/bad-words.service";

@Component({
  selector: "app-badwords",
  templateUrl: "./badwords.component.html",
  styleUrls: ["./badwords.component.scss"],
})
export class BadWordsComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "word",
    "createdAt",
    "updatedAt",
    "actions",
  ];
  dataSource = new MatTableDataSource<BadWords>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  badword?: BadWords;
  badwordId!: number;

  constructor(
    private badWordsService: BadWordsService,
    private _liveAnnouncer: LiveAnnouncer,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.readBadWords();
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  readBadWords() {
    this.badWordsService.getAllBadWords().subscribe((badwords: IBadWords[]) => {
      badwords.map((badword: IBadWords) => new BadWords(badword));
      this.dataSource = new MatTableDataSource(badwords);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  deleteBadWord(badwordId: number) {
    this.badWordsService.deleteBadWords(badwordId).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.readBadWords();
      },
      (err) => {
        this.modalService.dismissAll();
        this.readBadWords();
      }
    );
  }

  // openModal(content: any, badwordId: string) {
  //   this.badwordId = badwordId;
  //   this.modalService.open(content, {
  //     ariaLabelledBy: "modal-basic-title",
  //     size: "lg",
  //   });
  // }
}
