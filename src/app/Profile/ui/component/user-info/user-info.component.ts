import { Component, Input } from '@angular/core';
import { User } from '../../../../Swagger/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserControllerService } from '../../../../Swagger/configurations';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private userService: UserControllerService) {
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
    console.log('Form submitted', this.updateUserForm.value);

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
              console.log('User updated successfully', response);
            },
            error: (error) => {
              console.log('Error updating user', error);
            },
          });
        } else {
          console.log('User ID is undefined');
        }
      } else {
        console.log('No changes to update');
      }
    }
  }

  updatePassword() {
    const currentPassword = this.updatePasswordForm.value.currentPassword;
    const newPassword = this.updatePasswordForm.value.newPassword;
    console.log('Password change request:', { currentPassword, newPassword });
    if (currentPassword && newPassword) {
      if (this.currentUser?.id) {
        this.userService
          .updatePassword({ password: currentPassword, newPassword }, this.currentUser.id)
          .subscribe({
            next: () => {
              alert('Mot de passe mis a jour avec succès');
              this.updatePasswordForm.reset();
            },
            error: (error) => {
              console.error('Error updating password', error);
            },
          });
      } else {
        console.log('User ID is undefined');
      }
    } else {
      alert('Veuillez entrer un nouveau mot de passe');
    }
  }
}
