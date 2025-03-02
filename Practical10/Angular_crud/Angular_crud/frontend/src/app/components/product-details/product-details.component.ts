import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentProduct: Product | null = {
    title: '',
    price: 0,
    published: false
  };
  
  message = '';
  error = '';

  constructor(
    private productService: ProductService,
    private refreshService: RefreshService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.error = '';
      this.getProduct(this.route.snapshot.params["id"]);
    }
  }

  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.error = e.error?.message || 'Error accessing the product';
          this.currentProduct = null;
        }
      });
  }

  updatePublished(status: boolean): void {
    if (!this.currentProduct) return;

    const data = {
      title: this.currentProduct.title,
      price: this.currentProduct.price,
      published: status
    };

    this.productService.update(this.currentProduct.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (this.currentProduct) {
            this.currentProduct.published = status;
          }
          this.message = res.message || 'The status was updated successfully!';
        },
        error: (e) => {
          console.error(e);
          this.error = e.error?.message || 'Error updating the product status';
        }
      });
  }

  updateProduct(): void {
    if (!this.currentProduct) return;
    
    this.message = '';
    this.error = '';

    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message || 'This product was updated successfully!';
        },
        error: (e) => {
          console.error(e);
          this.error = e.error?.message || 'Error updating the product';
        }
      });
  }

  deleteProduct(): void {
    if (!this.currentProduct) return;

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.currentProduct.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.message = 'Product was deleted successfully!';
            setTimeout(() => {
              this.refreshService.triggerRefresh();
              this.router.navigate(['/products']);
            }, 1000);
          },
          error: (e) => {
            console.error(e);
            this.error = e.error?.message || 'Error deleting the product';
          }
        });
    }
  }
} 