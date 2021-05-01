import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // First thing to do is inject the router into our component
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string): void {
    console.log(`value=${value}`);

    // this rotes the data to our "search" route, which will
    // then be handled by the ProductListComponent
    // We're reusing the logic and view for listing products
    // no sense in trying to reinvent the wheel lol
    this.router.navigateByUrl(`/search/${value}`);
  }

}
