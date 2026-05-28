import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChercheurService } from '../../../../core/services/chercheur.service';
import { DomaineService } from '../../../../core/services/domaine.service';
import { Chercheur } from '../../../../core/models/chercheur.model';
import { Domaine } from '../../../../core/models/domaine.model';

@Component({
  selector: 'app-chercheur-form',
  templateUrl: './chercheur-form.component.html'
})
export class ChercheurFormComponent implements OnInit {
  form: FormGroup;
  domaines: Domaine[] = [];
  isEdit: boolean;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private chercheurService: ChercheurService,
    private domaineService: DomaineService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChercheurFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Chercheur | null
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      nom: [data?.nom || '', Validators.required],
      prenom: [data?.prenom || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      affiliation: [data?.affiliation || '', Validators.required],
      domaine: [data?.domaine || null]
    });
  }

  ngOnInit() {
    this.domaineService.getAll().subscribe(d => this.domaines = d);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const chercheur: Chercheur = this.form.value;

    const request = this.isEdit
      ? this.chercheurService.update(this.data!.id!, chercheur)
      : this.chercheurService.create(chercheur);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEdit ? 'Chercheur modifié !' : 'Chercheur ajouté !',
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
