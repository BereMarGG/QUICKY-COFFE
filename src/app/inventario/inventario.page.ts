import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

// Define el tipo para cada item del inventario
interface Item {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  status: string;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage {
  items: Item[] = [
    { id: 1, nombre: 'Producto 1', cantidad: 10, precio: 50, status: 'activo' },
    { id: 2, nombre: 'Producto 2', cantidad: 5, precio: 30, status: 'inactivo' },
  ];

  constructor(private alertController: AlertController) {}

  async addItem() {
    const alert = await this.alertController.create({
      header: 'Agregar Item',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre' },
        { name: 'cantidad', type: 'number', placeholder: 'Cantidad' },
        { name: 'precio', type: 'number', placeholder: 'Precio' },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const newItem: Item = {
              id: this.items.length + 1,
              nombre: data.nombre,
              cantidad: data.cantidad,
              precio: data.precio,
              status: 'activo',
            };
            this.items.push(newItem);
          },
        },
      ],
    });

    await alert.present();
  }

  // Modificar changeStatus para que use el evento de ion-toggle
  changeStatus(event: any, item: Item) {
    item.status = event.detail.checked ? 'activo' : 'inactivo';
  }

  async editItem(item: Item) {
    const alert = await this.alertController.create({
      header: 'Editar Item',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre', value: item.nombre },
        { name: 'cantidad', type: 'number', placeholder: 'Cantidad', value: item.cantidad },
        { name: 'precio', type: 'number', placeholder: 'Precio', value: item.precio },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            item.nombre = data.nombre;
            item.cantidad = data.cantidad;
            item.precio = data.precio;
          },
        },
      ],
    });

    await alert.present();
  }

  deleteItem(item: Item) {
    this.items = this.items.filter(i => i.id !== item.id);
  }
}
