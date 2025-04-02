import { routes } from './../../../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityControllerService } from '../../../Swagger/configurations';
import { Activity } from '../../../Swagger/models/activity';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../Shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-activity',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-activity.component.html',
  styleUrl: './create-activity.component.scss',
})
export class CreateActivityComponent {
  activityForm: FormGroup;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activityService: ActivityControllerService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.activityForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      maxParticipants: [0, Validators.required],
      duration: [0, Validators.required],
      category: ['', Validators.required],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  category = [
    { name: 'Aerien', value: Activity.CategoryEnum.AERIEN },
    { name: 'AQUATIQUE', value: Activity.CategoryEnum.AQUATIQUE },
    { name: 'NATURE', value: Activity.CategoryEnum.NATURE },
    { name: 'NEIGE', value: Activity.CategoryEnum.NEIGE },
    { name: 'PILOTAGE', value: Activity.CategoryEnum.PILOTAGE },
    { name: 'URBAIN', value: Activity.CategoryEnum.URBAIN },
  ];

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.selectedFiles[index] = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews[index] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.activityForm.valid) {
      console.log(this.activityForm.value);
      const newActivity: Activity = {
        name: this.activityForm.get('name')?.value,
        price: this.activityForm.get('price')?.value,
        maxParticipants: this.activityForm.get('maxParticipants')?.value,
        duration: this.activityForm.get('duration')?.value,
        category: this.activityForm.get('category')?.value,
        adress: this.activityForm.get('adress')?.value,
        city: this.activityForm.get('city')?.value,
        zipCode: this.activityForm.get('zipCode')?.value,
        description: this.activityForm.get('description')?.value,
      };
      this.activityService.creatActivity(newActivity).subscribe({
        next: (respons) => {
          console.log('Activité créée avec succès:', respons);
          const activityId = respons.id;
          if (this.selectedFiles.length > 0) {
            this.uploadPictures(activityId, this.selectedFiles);
          } else {
            console.log("Aucun fichier sélectionné, pas d'upload.");
          }
        },
        error: (err) => {
          console.error("Erreur lors de la création de l'activité:", err);
          this.alertService.showErrorAlert("Une erreur est survenue lors de l'ajout.");
        },
      });
    } else {
      this.alertService.showWarningAlert('❌ Formulaire invalide ! Vérifie les champs.');
    }
  }

  uploadPictures(activityId: number, files: File[]) {
    const formData: FormData = new FormData();

    // Convertir chaque fichier en Blob et l'ajouter au FormData
    files.forEach((file) => {
      const fileBlob = new Blob([file], { type: file.type }); // Crée un Blob à partir du fichier
      formData.append('files', fileBlob, file.name);
    });

    // Appel à l'API backend
    this.activityService.uploadActivityPictures(formData, activityId).subscribe({
      next: (response) => {
        console.log('Photos uploadées avec succès:', response);
        this.alertService.showSuccessAlert('Activité créée avec succès.');
        this.router.navigate(['/reservation', activityId]);
      },
      error: (err) => {
        console.error("Erreur lors de l'upload des photos:", err);
      },
    });
  }
}
