import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Productdetails, productInfo } from 'src/app/interfaces/productdetail';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { wishlistService } from 'src/app/Services/wish-list.service';
declare let swal : any
@Component({
  selector: 'app-product-detauls',
  templateUrl: './product-detauls.component.html',
  styleUrls: ['./product-detauls.component.css']
})
export class ProductDetaulsComponent {
  wishListData : number []=[]



  customOptions: OwlOptions = {
    loop: true,    
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: false 
  }





 details:productInfo |null = null
 
 constructor(private _ActivatedRoute:ActivatedRoute , private _productService:ProductService ,
  private _cartService : CartService , private _wishlistService:wishlistService
  ){
    this._wishlistService.getAllwishList().subscribe({
      next:(data)=>{
        console.log(data.data);
        let newArr = data.data.map( (item:any)=> item._id)
        this.wishListData = newArr
      }
    })


    
  _ActivatedRoute.params.subscribe( (data) =>{
    let id = data["id"]

    _productService.getDetails(id).subscribe ({
      next:(req:Productdetails) =>{ 
        this.details= req.data
      }
  } )



})


 }




 addCart(id:string){
  this._cartService.addProductCart(id).subscribe({
    next : (response) => {
      if(response.status == 'success'){
this._cartService.changeCount(response.numOfCartItems)
swal.fire({
  position: 'top-end',
  icon: 'success',
  title: response.message,
  background:'green',
  color:'white',
  showConfirmButton: false,
  timer: 1000
})

      }
      console.log(response);
      
    }
  })
}
addToWishList(id:string){
  this._wishlistService.addWishList(id).subscribe({

    next : (response) => {
      console.log(this.wishListData = response.data);
      this.wishListData = response.data
      if(response.status == 'success'){
        
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.message,
          background:'green',
          color:'white',
          showConfirmButton: false,
          timer: 1000
        })

}
    }
  })
  
  }

removeFromWishList(id:string){
  this._wishlistService.deleteWishList(id).subscribe({

    next : (response) => {
      console.log(this.wishListData = response.data);
      this.wishListData = response.data
    }
  })
  
  }

}
