import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../core/services/publication.service";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NotifierService } from "angular-notifier";
import { UserService } from "../core/services/user.service";
import { Publication } from "../core/models/publication.model";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"],
})
export class BlogsComponent implements OnInit {
  blogListData: any[] = [];
  publicationForm!: FormGroup;
  userId = localStorage.getItem("userId");
  constructor(
    private publicationService: PublicationService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private notifier: NotifierService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchPublications();
    this.createPublicationForm();
  }
  openModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
    });
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }
  createPublicationForm(): void {
    this.publicationForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      // Add more fields if needed
    });
  }

  fetchPublications(): void {
    this.publicationService.getAllFullPublications().subscribe(
      (publications: any[]) => {
        this.blogListData = this.formatPublicationDates(publications);
        console.log("pub", this.blogListData);
      },
      (error: any) => {
        console.log("Error fetching publications:", error);
      }
    );
  }

  formatPublicationDates(publications: any[]): any[] {
    return publications.map((publication) => {
      const formattedCreatedAt = this.datePipe.transform(
        publication.createdAt,
        "dd MMMM yyyy"
      );
      const formattedUpdatedAt = this.datePipe.transform(
        publication.updatedAt,
        "dd MMMM yyyy"
      );

      return {
        ...publication,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
      };
    });
  }

  createPublication(): void {
    if (this.publicationForm.invalid) {
      return;
    }

    const publication = {
      title: this.publicationForm.value.title,
      content: this.publicationForm.value.content,
    };

    if (this.userId) {
      this.publicationService
        .createPublication(publication, this.userId)
        .subscribe(
          (newPublication) => {
            console.log("New publication:", newPublication);
            this.notifier.notify("success", "Blog Suuccessfully Added");
            this.publicationForm.reset();
            this.fetchPublications();
            this.modalService.dismissAll();
          },
          (error) => {
            console.error("Error creating publication:", error);
          }
        );
    }
  }

  deletePublication(pubId: number) {
    this.publicationService.deletePublication(pubId).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.fetchPublications();
      },
      (err) => {
        this.modalService.dismissAll();
        this.fetchPublications();
      }
    );
  }

  updatePublication() {
    let userId = localStorage.getItem('userId');
    if (userId) {
      let publication = {
        title: this.publicationForm.value.title,
        content: this.publicationForm.value.content,
        user :{
          id: userId
        }
      };
  
      this.publicationService
        .updatePublication(this.data.id, publication)
        .subscribe(
          () => {
            this.notifier.notify("success", "Blog Suuccessfully updated");
            this.publicationForm.reset();
            this.fetchPublications();
            this.modalService.dismissAll();
          },
          (error) => {
            console.error("Error updating publication:", error);
          }
        );
    }
   
  }

  data: any;
  openUpdateModal(data: any, content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
    });

    this.createPublicationForm();

    this.data = data;
    this.publicationForm.patchValue({
      title: this.data.title,
      content: this.data.content,
    });
  }
}
