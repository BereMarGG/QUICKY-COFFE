import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {


  optiones : string[] = ['Frappe Moka FriOreo $95.00','Frappe Cappuchino Cajeta $86.00','Frappe Moka Blanco $95.00'];

  selectedOption : string = '';

  opcion_guarda : string[] = [];


  cantidades: number[] = [];

  constructor(private alertController: AlertController) {}

  saveOption(){

    console.log("Opcion seleccionada" , this.selectedOption);



    if(this.selectedOption){


      this.opcion_guarda.push(this.selectedOption);
      this.cantidades.push(1);

      this.selectedOption = '';



      console.log("Soy las opciones agregadas al carrito", this.opcion_guarda);

      
    }else{

      console.log("Entro en 2");


    }








  }
  deleteActivity(index: number) {
    console.log("Soy la opcion a borrar", index);

    // Elimina solo el elemento en el índice especificado
    this.opcion_guarda.splice(index, 1); // Eliminar un elemento en el índice `index`
    this.cantidades.splice(index, 1);    // También eliminar la cantidad correspondiente
  }

  async pagar_carrito() {
    console.log("Pagado con exito");

    const alert = await this.alertController.create({
      header: "Pago con exito",
      buttons: ['Aceptar'] // Puedes añadir un botón "Aceptar" para cerrar la alerta
    });

    await alert.present(); // Muestra la alerta

    // Limpiar el carrito después de que se ha mostrado la alerta
    this.opcion_guarda = [];
    this.cantidades = [];
  }






  ngOnInit() {
  }

}
