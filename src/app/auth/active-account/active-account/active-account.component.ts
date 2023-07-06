import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {
  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
   
  }
  ngOnInit(): void { 
    this.route.queryParams.subscribe(params => {
    this.userId = Number(params['userId']);
  });
  }

  activateUser() {
    if (this.userId !== undefined) {
      this.userService.activeUser(this.userId).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

}
