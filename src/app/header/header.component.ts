import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName: string = "";

  constructor(private router: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      console.warn(val.url)
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.warn("In Seller Area");
          this.menuType = "seller"
          if (localStorage.getItem('seller')) {
            let sellerStrore = localStorage.getItem('seller')
            let sellerData = sellerStrore && JSON.parse(sellerStrore);
            this.sellerName = sellerData.name
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';

        } else {
          console.warn("Outside Seller");
          this.menuType = 'default'
        }
      }
    });
  }

  logout() {
    localStorage.removeItem("seller");
    this.router.navigate(['/'])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((result) => {
        console.warn(result);
        if (result.length > 3) {
          result.length = 3
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined
  }

  submitSearch(val: string) {
    console.warn(val);
    this.router.navigate([`search/${val}`])
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id])
  }

}


