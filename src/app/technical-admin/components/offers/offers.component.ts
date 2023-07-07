import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, of, switchMap, toArray } from 'rxjs';
import { IOffer } from 'src/app/core/interfaces/response';
import { Offer } from 'src/app/core/models/offer';
import { OfferService } from 'src/app/core/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'reference', 'type', 'category', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<Offer>
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  offer?: Offer
  offerId!: string;
  constructor(
    private offerService: OfferService,
    private _liveAnnouncer: LiveAnnouncer,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.readOffers()
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) this.dataSource.paginator = this.paginator;
  }

  readOffers () {
    this.offerService.readAllOffers().pipe(
      switchMap((offers: IOffer[]) => offers), 
      map((offer: Offer) => new Offer(offer)),
      toArray()
    ).subscribe((offers: Offer[]) => {
      this.dataSource = new MatTableDataSource(offers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteOffer(offer: string) {
    this.offerService.deleteOffer(offer).subscribe((response) => {
      this.modalService.dismissAll()
      this.readOffers()
    }, err => {
      this.modalService.dismissAll()
      this.readOffers()
    })
  }

  openModal(content: any, offerId: string) {
    this.offerId = offerId
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }
}