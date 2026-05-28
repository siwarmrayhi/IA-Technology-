import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomaineService } from '../../../../core/services/domaine.service';
import { Domaine } from '../../../../core/models/domaine.model';

@Component({
  selector: 'app-domaine-form',
  templateUrl: './domaine-form.component.html'
})
export class DomaineFormComponent {
  form: FormGroup;
  isEdit: boolean;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private domaineService: DomaineService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DomaineFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Domaine | null
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      nom: [data?.nom || '', Validators.required],
      description: [data?.description || '']
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const domaine: Domaine = this.form.value;

    const request = this.isEdit
      ? this.domaineService.update(this.data!.id!, domaine)
      : this.domaineService.create(domaine);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEdit ? 'Domaine modifié !' : 'Domaine ajouté !',
          'OK', { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Erreur lors de l\'opération', 'OK', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
