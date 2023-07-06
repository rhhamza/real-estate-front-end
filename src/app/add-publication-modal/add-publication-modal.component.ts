import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// other imports

@Component({
  selector: "app-add-publication-modal",
  templateUrl: "./add-publication-modal.component.html",
  styleUrls: ["./add-publication-modal.component.scss"],
})
export class AddPublicationModalComponent implements OnInit {
  publicationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.publicationForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
    });
  }

  createPublication(): void {
    if (this.publicationForm.valid) {
      // Get the form values and create the publication
      const title = this.publicationForm.value.title;
      const content = this.publicationForm.value.content;

      // Call the service method to create the publication
      // Replace the code below with your actual service method call
      // this.publicationService.createPublication({ title, content }).subscribe((result) => {
      //   // Handle the result
      // });

      // Reset the form after submission
      this.publicationForm.reset();
    }
  }
}
