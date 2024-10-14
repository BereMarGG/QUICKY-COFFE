import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  // Simulación de autenticación
  login() {
    // Obtener los datos almacenados en localStorage
    const storedEmail = localStorage.getItem('registeredEmail');
    const storedPassword = localStorage.getItem('registeredPassword');

    if (this.validateEmail(this.email) && this.password.length >= 6) {
      // Verificar si las credenciales coinciden con las almacenadas
      if (this.email === storedEmail && this.password === storedPassword) {
        // Redirigir a la página principal de productos o dashboard
        this.router.navigate(['/inicio']); // Cambia '/productos' por la ruta deseada
      } else {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    } else {
      this.errorMessage = 'Por favor, ingrese un email válido y una contraseña de al menos 6 caracteres.';
    }
  }

  // Función para validar el formato del email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
