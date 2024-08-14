import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  productList: any[] = []; 
  filteredList: any[] = []; 

  filters = {
    name: '',
    location: '',
    minPrice: null,
    maxPrice: null,
    minRating: null
  };

  newHotel = {
    nombre: '',
    ciudad: '',
    precio: null,
    rating: null,
    imagenUrl: ''
  };

  editHotel = { 
    _id: '', // Usa '_id' para ser consistente con el backend
    nombre: '',
    ciudad: '',
    precio: null,
    rating: null,
    imagenUrl: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); // Cargar los productos 
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: any[]) => {
        this.productList = products;
        this.filteredList = products;
        console.log('Products loaded:', products); 
      },
      error: (err: any) => {
        console.error('Error al cargar productos:', err); // Manejo de errores
      }
    });
  }

  applyFilters(): void {
    this.filteredList = this.productList.filter(item => {
      return (
        (!this.filters.name || item.nombre.toLowerCase().includes(this.filters.name.toLowerCase())) &&
        (!this.filters.location || item.ciudad.toLowerCase().includes(this.filters.location.toLowerCase())) &&
        (!this.filters.minPrice || item.precio >= this.filters.minPrice) &&
        (!this.filters.maxPrice || item.precio <= this.filters.maxPrice) &&
        (!this.filters.minRating || item.rating >= this.filters.minRating)
      );
    });
  }

  createHotel(): void {
    this.productService.createHotel(this.newHotel).subscribe({
      next: (hotel) => {
        console.log('Hotel creado:', hotel);
        this.loadProducts(); // Recargar los productos para mostrar el nuevo hotel
        this.resetNewHotelForm();
      },
      error: (err) => {
        console.error('Error al crear el hotel:', err);
      }
    });
  }

  updateHotel(): void {
    if (this.editHotel._id) {
      this.productService.updateHotel(this.editHotel._id, this.editHotel).subscribe({
        next: (hotel) => {
          console.log('Hotel actualizado:', hotel);
          this.loadProducts(); // Recargar los productos para mostrar el hotel actualizado
          this.resetEditHotelForm();
        },
        error: (err) => {
          console.error('Error al actualizar el hotel:', err);
        }
      });
    }
  }

  deleteHotel(id: string): void {
    this.productService.deleteHotel(id).subscribe({
      next: () => {
        console.log('Hotel eliminado');
        this.loadProducts(); // Recargar los productos para eliminar el hotel de la vista
      },
      error: (err) => {
        console.error('Error al eliminar el hotel:', err);
      }
    });
  }

  selectHotelForEdit(hotel: any): void {
    this.editHotel = { ...hotel };
  }

  private resetNewHotelForm(): void {
    this.newHotel = {
      nombre: '',
      ciudad: '',
      precio: null,
      rating: null,
      imagenUrl: ''
    };
  }

  private resetEditHotelForm(): void {
    this.editHotel = {
      _id: '',
      nombre: '',
      ciudad: '',
      precio: null,
      rating: null,
      imagenUrl: ''
    };
  }
}


