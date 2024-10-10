import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage {
  activities = [
    { name: 'Correr', duration: '30 minutos' },
    { name: 'Ciclismo', duration: '1 hora' }
  ];

  constructor(private alertController: AlertController) {}

  // Método para agregar una nueva actividad con validaciones y conversiones
  async addActivity() {
    const alert = await this.alertController.create({
      header: 'Nueva Actividad',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la actividad',
          attributes: {
            'aria-label': 'Nombre de la actividad',
          },
          id: 'activity-name'
        },
        {
          name: 'duration',
          type: 'text',
          placeholder: 'Duración (ej: 90m o 1h 30m)',
          attributes: {
            'aria-label': 'Duración de la actividad',
          },
          id: 'activity-duration'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (this.isValidInput(data.name, data.duration)) {
              const formattedDuration = this.formatDuration(data.duration);
              this.activities.push({ name: data.name, duration: formattedDuration });
              return true;
            } else {
              this.showValidationMessage('Por favor, ingresa un nombre y una duración válida (ej: 90m o 1h 30m).');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para editar una actividad existente
  async editActivity(index: number) {
    const activity = this.activities[index];
    const alert = await this.alertController.create({
      header: 'Editar Actividad',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: activity.name,
          placeholder: 'Nombre de la actividad',
          attributes: {
            'aria-label': 'Nombre de la actividad',
          },
          id: 'edit-activity-name'
        },
        {
          name: 'duration',
          type: 'text',
          value: activity.duration,
          placeholder: 'Duración (ej: 90m o 1h 30m)',
          attributes: {
            'aria-label': 'Duración de la actividad',
          },
          id: 'edit-activity-duration'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'edit-cancel-button'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (this.isValidInput(data.name, data.duration)) {
              const formattedDuration = this.formatDuration(data.duration);
              this.activities[index] = { name: data.name, duration: formattedDuration };
              return true;
            } else {
              this.showValidationMessage('Por favor, ingresa un nombre y una duración válida (ej: 90m o 1h 30m).');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para eliminar una actividad
  async deleteActivity(index: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Actividad',
      message: '¿Estás seguro de que deseas eliminar esta actividad?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'delete-cancel-button'
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.activities.splice(index, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  // Validar nombre y duración
  isValidInput(name: string, duration: string): boolean {
    const durationPattern = /^(\d+h)?\s*(\d+m)?$/; // Patrón para validar formatos como "1h 30m" o "90m"
    return name.trim().length > 0 && durationPattern.test(duration.trim());
  }

  // Convertir duración como "90m" a "1h 30m"
  formatDuration(duration: string): string {
    duration = duration.trim();

    // Si la duración está en el formato "90m"
    if (/^\d+m$/.test(duration)) {
      const totalMinutes = parseInt(duration.replace('m', ''), 10);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
    }

    // Si la duración ya está en el formato "1h 30m"
    if (/^(\d+h)?\s*(\d+m)?$/.test(duration)) {
      return duration;
    }

    // Si no coincide con ningún formato, retornar el valor tal cual (puede ser un error)
    return duration;
  }

  // Mostrar un mensaje de validación en caso de error
  async showValidationMessage(message: string) {
    const alert = await this.alertController.create({
      header: 'Validación',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Obtener el icono adecuado según la actividad
  getActivityIcon(activityName: string): string {
    switch (activityName.toLowerCase()) {
      case 'correr':
        return 'walk-outline';
      case 'ciclismo':
        return 'bicycle-outline';
      case 'natación':
        return 'water-outline';
      case 'yoga':
        return 'body-outline';
      default:
        return 'fitness-outline';
    }
  }
}
