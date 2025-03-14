import { Component, Input } from '@angular/core';
import { User } from '../../../../Swagger/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserControllerService } from '../../../../Swagger/configurations';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../../Shared/services/alert.service';
import { CookieService } from '../../../../Authentication/domain/services/cookie.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  providers: [UserControllerService],
})
export class UserInfoComponent {
  @Input() currentUser!: User;
  updateUserForm!: FormGroup;
  updatePasswordForm!: FormGroup;
  newPassword: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserControllerService,
    private alertService: AlertService,
    private cookieService: CookieService
  ) {
    this.updateUserForm = this.formBuilder.group({
      firstName: [this.currentUser?.firstName, Validators.required],
      lastName: [this.currentUser?.lastName, Validators.required],
      city: [this.currentUser?.city],
    });

    this.updatePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      currentPassword: ['', Validators.required],
    });
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error('Invalid Date');
      return '';
    }
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Europe/Paris',
    };
    return new Intl.DateTimeFormat('fr-FR', options).format(dateObj);
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      const formValues = this.updateUserForm.value;

      // Créer un objet pour l'update en envoyant seulement les champs modifiés
      const userUpdateDto: any = {};

      // Ajouter chaque champ uniquement s'il a été modifié
      if (formValues.firstName && formValues.firstName !== this.currentUser?.firstName) {
        userUpdateDto.firstName = formValues.firstName;
      }
      if (formValues.lastName && formValues.lastName !== this.currentUser?.lastName) {
        userUpdateDto.lastName = formValues.lastName;
      }
      if (formValues.city && formValues.city !== this.currentUser?.city) {
        userUpdateDto.city = formValues.city;
      }

      // Si userUpdateDto contient des données, effectuer l'update
      if (Object.keys(userUpdateDto).length > 0) {
        if (this.currentUser?.id) {
          this.userService.update(userUpdateDto, this.currentUser.id).subscribe({
            next: (response) => {
              this.alertService.showSuccessAlert('Modifications réussies');
            },
            error: (error) => {
              this.alertService.showErrorAlert('Echec des modifications');
            },
          });
        }
      }
    } else {
      this.alertService.showWarningAlert('Echec des modifications');
    }
  }

  updatePassword() {
    const currentPassword = this.updatePasswordForm.value.currentPassword;
    const newPassword = this.updatePasswordForm.value.newPassword;
    if (currentPassword && newPassword) {
      if (this.currentUser?.id) {
        this.userService
          .updatePassword({ password: currentPassword, newPassword }, this.currentUser.id)
          .subscribe({
            next: () => {
              this.alertService.showSuccessAlert('Mot de passe mis a jour avec succès');
              this.updatePasswordForm.reset();
            },
            error: (error) => {
              this.alertService.showErrorAlert('Mot de passe non mis a jour');
              console.error('Error updating password', error);
            },
          });
      }
    } else {
      this.alertService.showWarningAlert('Veuillez entrer un nouveau mot de passe');
    }
  }
}
