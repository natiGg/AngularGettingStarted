import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { StartComponent } from '../shared/star.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
   
    RouterModule.forChild([
      {path:'products',component:ProductComponent},
      {path:'products/:id',canActivate:[ProductDetailGuard],component:ProductDetailComponent},
   
    ]),
    SharedModule
  ]
})
export class ProductModule { }
