import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productList = [
    {
      id: "1",
      name: "Hotel Paradise",
      location: "Cancún, México",
      price: 150,
      rating: 4.5,
      imageUrl: "https://www.paradisuscancun.com/images/slides/slide-99.jpg"
    },
    {
      id: "2",
      name: "The Grand Hotel",
      location: "Paris, Francia",
      price: 250,
      rating: 4.7,
      imageUrl: "https://www.theluxevoyager.com/wp-content/uploads/2018/05/Intercontinental-paris-le-grand-hotel.jpg"
    },
    {
      id: "3",
      name: "Beachside Resort",
      location: "Miami, USA",
      price: 180,
      rating: 4.3,
      imageUrl: "https://s3-media0.fl.yelpcdn.com/bphoto/IWhs2hyjkHY6cKCIafr-fw/348s.jpg"
    },
    {
      id: "4",
      name: "Mountain Retreat",
      location: "Aspen, USA",
      price: 300,
      rating: 4.8,
      imageUrl: "https://cdn.homedit.com/wp-content/uploads/2013/12/aspen-bavarian-style-luxury-mountain.jpg"
    }
  ];

  filters = {
    name: '',
    location: '',
    minPrice: null,
    maxPrice: null,
    minRating: null
  };

  filteredList = [...this.productList]; // Inicialmente muestra todos los hoteles

  applyFilters() {
    this.filteredList = this.productList.filter(item => {
      return (
        (!this.filters.name || item.name.toLowerCase().includes(this.filters.name.toLowerCase())) &&
        (!this.filters.location || item.location.toLowerCase().includes(this.filters.location.toLowerCase())) &&
        (!this.filters.minPrice || item.price >= this.filters.minPrice) &&
        (!this.filters.maxPrice || item.price <= this.filters.maxPrice) &&
        (!this.filters.minRating || item.rating >= this.filters.minRating)
      );
    });
  }
}

