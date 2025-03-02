import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    title: '',
    price: 0,
    published: false
  };
  submitted = false;
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  saveProduct(): void {
    const data = {
      title: this.product.title,
      price: this.product.price,
      published: false
    };

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 2000);
        },
        error: (e) => {
          console.error(e);
          this.error = e.error?.message || 'An error occurred while creating the product.';
        }
      });
  }

  newProduct(): void {
    this.submitted = false;
    this.error = '';
    this.product = {
      title: '',
      price: 0,
      published: false
    };
  }
} 