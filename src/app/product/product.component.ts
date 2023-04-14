import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './productint';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit,OnDestroy{
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
   errorMessage: string=''
   sub!:Subscription
  private _listFilter: string=''
  private _productService;
  get listFilter():string {
      return this._listFilter;
    }
  set listFilter(value:string){
    this._listFilter=value;
    console.log(this._listFilter)
    this.filteredProducts = this.performFilter(value)
  }

  filteredProducts:IProduct[]=[]
  
  products: IProduct[]=[]
  constructor(private productservice:ProductService){
      this._productService=productservice
  }

  toggleImage() {
    this.showImage=!this.showImage;
  }
  ngOnInit(): void {
    this.sub=this.productservice.getProducts().subscribe({
      next:products=>{
        this.products=products
        this.filteredProducts=this.products
      },
      error:err=>this.errorMessage=err
    })
      console.log(this._listFilter)
  }


  performFilter (filterBy:string):IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:IProduct)=>product.productName.toLocaleLowerCase().includes(filterBy))
  }
  onRatingClicked (message:string):void{
    this.pageTitle='product list:'+message
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }
}
  
