import { Component, OnInit } from "@angular/core";
import { PublicationService } from "../core/services/publication.service";
import { DatePipe } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";



@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"],
})
export class BlogsComponent implements OnInit {
  blogListData: any[] = [];
  publicationForm!: FormGroup;

  constructor(
    private publicationService: PublicationService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchPublications();
    this.createPublicationForm();
  }

  createPublicationForm(): void {
    this.publicationForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      // Add more fields if needed
    });
  }

  fetchPublications(): void {
    this.publicationService.getAllPublications().subscribe(
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

    const userId = 1; // Replace with the actual user ID
    const publication = {
      title: this.publicationForm.value.title,
      content: this.publicationForm.value.content,
      // Assign other form field values to the corresponding publication properties
    };

    this.publicationService.createPublication(publication, userId).subscribe(
      (newPublication) => {
        console.log("New publication:", newPublication);
        // Reset the form after successful submission
        this.publicationForm.reset();
        this.fetchPublications();
      },
      (error) => {
        console.error("Error creating publication:", error);
      }
    );
  }
}
