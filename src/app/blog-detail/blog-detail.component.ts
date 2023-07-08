import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PublicationService } from "../core/services/publication.service";
import { UserEntity } from "../core/models/user-entity.model";
import { PublicationReactionService } from "../core/services/publication-reaction.service";
import { PublicationReaction } from "../core/models/publication-reaction.model";
import { DatePipe } from "@angular/common";
import { PublicationComment } from "../core/models/publication-comment.model";
import { PublicationCommentService } from "../core/services/publication-comment.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.scss"],
})
export class BlogDetailComponent implements OnInit {
  publication: any;
  commentList: any;
  likeUsers: UserEntity[] = [];
  dislikeUsers: UserEntity[] = [];
  heartUsers: UserEntity[] = [];
  likeCount?: number;
  dislikeCount?: number;
  heartCount?: number;
  commentCount?: number;
  userReaction: PublicationReaction | undefined | [];
  commentContent?: any;
  selectedReactionType?: string;
  userId = Number(localStorage.getItem("userId"));
  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private reactionService: PublicationReactionService,
    private datePipe: DatePipe,
    private commentService: PublicationCommentService,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const publicationId = Number(params.get("blog"));
      this.getPublication(publicationId);
      this.getCommentList(publicationId);
      this.fetchUsersByReactionType("Like", publicationId);
      this.fetchUsersByReactionType("Dislike", publicationId);
      this.fetchUsersByReactionType("Heart", publicationId);
      this.fetchReactionCountByType("Like", publicationId);
      this.fetchReactionCountByType("Dislike", publicationId);
      this.fetchReactionCountByType("Heart", publicationId);
      this.checkUserReaction(publicationId!);
    });
  }
  openModal(content: any, reactionType: string) {
    this.selectedReactionType = reactionType;
    this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
      size: "lg",
    });
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }
  getReactionUsers(reactionType: string): UserEntity[] {
    if (reactionType === "Like") {
      return this.likeUsers;
    } else if (reactionType === "Dislike") {
      return this.dislikeUsers;
    } else if (reactionType === "Heart") {
      return this.heartUsers;
    } else {
      return [];
    }
  }
  getPublication(publicationId: number): void {
    this.publicationService.getPublicationById(publicationId).subscribe(
      (publication) => {
        this.publication = publication;
        console.log("pub-details", this.publication);
      },
      (error) => {
        // Handle the error case
      }
    );
  }

  getCommentList(publicationId: number): void {
    this.publicationService
      .getAllPublicationCommentsWithUser(publicationId)
      .subscribe(
        (comments) => {
          this.commentList = this.formatCommentsDates(comments);
          this.commentCount = comments.length;
          console.log("comment-list", this.commentList);
        },
        (error) => {
          // Handle the error case
        }
      );
  }

  fetchUsersByReactionType(reactionType: string, publicationId: number): void {
    this.publicationService
      .getUsersByReactionType(publicationId, reactionType)
      .subscribe((users: UserEntity[]) => {
        switch (reactionType) {
          case "Like":
            this.likeUsers = users;
            break;
          case "Dislike":
            this.dislikeUsers = users;
            break;
          case "Heart":
            this.heartUsers = users;
            break;
        }
        console.log("user", users);
      });
  }

  fetchReactionCountByType(reactionType: string, publicationId: number): void {
    this.publicationService
      .getReactionCountByType(publicationId, reactionType)
      .subscribe((count: number) => {
        switch (reactionType) {
          case "Like":
            this.likeCount = count;
            break;
          case "Dislike":
            this.dislikeCount = count;
            break;
          case "Heart":
            this.heartCount = count;
            break;
        }
      });
  }

  checkUserReaction(publicationId: number): void {
    if (this.userId) {
      this.reactionService
        .getReactionByUserAndPublication(this.userId, publicationId)
        .subscribe(
          (reaction: PublicationReaction) => {
            this.userReaction = reaction;
          },
          (error: any) => {
            if (error.status === 404) {
              this.userReaction = [];
            } else {
              // Handle other errors if needed
            }
          }
        );
    }
  }

  react(reactionType: any, publicationId: number): void {
    const userId = this.userId;
    const reaction = {
      id: 0,
      reaction: reactionType,
      idUser: userId,
      idPublication: publicationId,
    };
    if (Array.isArray(this.userReaction)) {
      this.reactionService
        .createReaction(
          reaction.reaction.toString(),
          reaction.idUser,
          reaction.idPublication
        )
        .subscribe((newReaction: any) => {
          this.userReaction = newReaction;
          this.updateReactionCounts(reactionType, 1);
          this.fetchUsersByReactionType(reactionType, publicationId);
        });
    } else {
      if (this.userReaction && this.userReaction.reaction === reactionType) {
        this.reactionService
          .deleteReaction(this.userReaction.id)
          .subscribe(() => {
            this.userReaction = [];
            this.updateReactionCounts(reactionType, -1);
            this.fetchUsersByReactionType(reactionType, publicationId);
          });
      } else {
        // this.reactionService
        //   .updateReaction(this.userReaction!.id, reactionType)
        //   .subscribe(() => {
        //     this.userReaction = reaction;
        //     this.updateReactionCounts(this.userReaction!.reaction, -1);
        //     this.updateReactionCounts(reactionType, 1);
        //   });
        if (Array.isArray(this.userReaction)) {
          this.reactionService
            .createReaction(
              reaction.reaction.toString(),
              reaction.idUser,
              reaction.idPublication
            )
            .subscribe((newReaction: any) => {
              this.userReaction = newReaction;
              this.updateReactionCounts(reactionType, 1);
              this.fetchUsersByReactionType(reactionType, publicationId);
            });
        } else {
          if (
            this.userReaction &&
            this.userReaction.reaction === reactionType
          ) {
            this.reactionService
              .deleteReaction(this.userReaction.id)
              .subscribe(() => {
                this.userReaction = [];
                this.updateReactionCounts(reactionType, -1);
                this.fetchUsersByReactionType(reactionType, publicationId);
              });
          }
        }
      }
    }
  }

  updateReactionCounts(reactionType: any, countChange: number): void {
    switch (reactionType) {
      case "Like":
        this.likeCount = (this.likeCount || 0) + countChange;
        break;
      case "Dislike":
        this.dislikeCount = (this.dislikeCount || 0) + countChange;
        break;
      case "Heart":
        this.heartCount = (this.heartCount || 0) + countChange;
        break;
    }
  }

  formatCommentsDates(comments: any[]): any[] {
    return comments.map((comment) => {
      const formattedCreatedAt = this.datePipe.transform(
        comment.createdAt,
        "dd MMMM yyyy, HH:mm"
      );
      const formattedUpdatedAt = this.datePipe.transform(
        comment.updatedAt,
        "dd MMMM yyyy, HH:mm"
      );

      return {
        ...comment,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
      };
    });
  }

  createComment(commentContent: string, publicationId: number): void {
    const comment: PublicationComment = {
      content: commentContent,
    };

    this.commentService
      .createComment(comment, this.userId, publicationId)
      .subscribe(
        (newComment: PublicationComment) => {
          console.log("New comment:", newComment);

          this.getCommentList(publicationId);
          // Reset the commentContent after submitting the comment
          this.resetCommentContent();
        },
        (error) => {
          console.error("Error creating comment:", error);
        }
      );
  }

  resetCommentContent(): void {
    this.commentContent = "";
  }

  deleteComment(commentId: number, publicationId: number) {
    this.commentService.deleteComment(commentId).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.getCommentList(publicationId);
      },
      (err) => {
        this.modalService.dismissAll();
        this.getCommentList(publicationId);
      }
    );
  }
}
