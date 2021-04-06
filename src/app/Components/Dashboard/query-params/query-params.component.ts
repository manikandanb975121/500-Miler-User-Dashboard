import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-query-params',
  templateUrl: './query-params.component.html',
  styleUrls: ['./query-params.component.scss']
})
export class QueryParamsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
      console.log(params); // { order: "popular" }
      console.log(params.code);
      if (params.code) {
        const data = { code: params.code };
        console.log(data);
        this.authService.login(data);
      }
    }
  );
  }

}
