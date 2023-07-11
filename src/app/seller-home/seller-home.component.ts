import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[]
  productMessage: undefined | string
  deleteIcon = faTrash
  editIcon = faEdit

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.load()
  }


  load() {
    this.product.productList().subscribe((result: any) => {
      console.warn(result);
      this.productList = result;
    })
  }

  deleteProduct(id: number) {
    console.warn(id)
    this.product.deleteProduct(id).subscribe((result: any) => {
      if (result) {
        this.productMessage = "Product is Deleted !!"
        this.load();
      }
      setTimeout(() => {
        this.productMessage = undefined
      }, 3000);
      // console.warn(result);
    })
  }

}
