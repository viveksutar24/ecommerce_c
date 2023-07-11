import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | product
  productMessage: undefined | string
  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get("id")
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data
    })
  }

  submit(data: product) {
    console.warn(data);
    if (this.productData) {
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result: any) => {
      if (result) {
        this.productMessage = "Product has Updated !!!"
      }
    })

    this.router.navigate(['seller-home'])

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

}
