import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { IBadWords } from "src/app/core/interfaces/badwordInterface";
import { BadWords } from "src/app/core/models/bad-words.model";
import { BadWordsService } from "src/app/core/services/bad-words.service";

@Component({
  selector: "app-create-bad-word",
  templateUrl: "./create-bad-word.component.html",
  styleUrls: ["./create-bad-word.component.scss"],
})
export class CreateBadWordComponent implements OnInit {
  badWordForm!: FormGroup;
  submitted = false;
  badWord?: BadWords;
  constructor(
    private formBuilder: FormBuilder,
    private badwordService: BadWordsService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const badWordId = Number(this.route.snapshot.paramMap.get("badword"));
    this.badWordForm = this.formBuilder.group({
      word: ["", Validators.required],
    });

    if (badWordId) {
      this.readBadWordById(badWordId);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.badWordForm?.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.badWordForm.value);

    if (this.badWordForm?.invalid) {
      return;
    }

    let body = {
      ...this.badWordForm.value,
    };

    if (!this.badWord) {
      this.badwordService
        .createBadWords(body)
        .subscribe((response: IBadWords) => {
          this.submitted = false;
          this.badWordForm.reset();
          this.notifier.notify("success", "Bad Words succesfully Added");
          setTimeout(() => {
            this.router.navigate(["admin", "badWords"]);
          }, 3000);
        });
    } else {
      this.badwordService
        .updateBadWords(this.badWord.id, this.badWordForm.value)
        .subscribe((response: IBadWords) => {
          this.notifier.notify("success", "Bad Words succesfully Updated");
          setTimeout(() => {
            this.router.navigate(["admin", "badWords"]);
          }, 3000);
        });
    }
  }

  readBadWordById(id: number) {
    this.badwordService.getBadWordsById(id).subscribe((response: IBadWords) => {
      this.badWord = new BadWords(response);
      this.badWordForm.patchValue({
        word: this.badWord.word,
      });
    });
  }
}
