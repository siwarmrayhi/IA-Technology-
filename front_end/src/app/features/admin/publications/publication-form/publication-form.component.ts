import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicationService } from '../../../../core/services/publication.service';
import { ChercheurService } from '../../../../core/services/chercheur.service';
import { Publication } from '../../../../core/models/publication.model';
import { Chercheur } from '../../../../core/models/chercheur.model';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html'
})
export class PublicationFormComponent implements OnInit {
  form: FormGroup;
  chercheurs: Chercheur[] = [];
  isEdit: boolean;
  loading = false;
  uploading = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private pubService: PublicationService,
    private chercheurService: ChercheurService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PublicationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Publication | null
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      titre: [data?.titre || '', Validators.required],
      description: [data?.description || ''],
      doi: [data?.doi || ''],
      fichier: [data?.fichier || ''],
      datePublication: [data?.datePublication || new Date(), Validators.required],
      chercheurs: [data?.chercheurs || [], Validators.required]
    });
  }

  ngOnInit() {
    this.chercheurService.getAll().subscribe(c => this.chercheurs = c);
  }

  compareChercheurs(c1: Chercheur, c2: Chercheur): boolean {
    return c1 && c2 && c1.id === c2.id;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      this.snackBar.open('Seuls les fichiers PDF sont acceptés', 'OK', { duration: 3000 });
      return;
    }
    this.selectedFile = file;
    this.uploading = true;

    this.pubService.uploadFile(file).subscribe({
      next: (filename) => {
        this.form.patchValue({ fichier: filename });
        this.uploading = false;
        this.snackBar.open('Fichier uploadé avec succès', 'OK', { duration: 2000 });
      },
      error: () => {
        this.uploading = false;
        this.snackBar.open('Erreur lors de l\'upload', 'OK', { duration: 3000 });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const pub: Publication = this.form.value;

    const request = this.isEdit
      ? this.pubService.update(this.data!.id!, pub)
      : this.pubService.create(pub);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEdit ? 'Publication modifiée !' : 'Publication ajoutée !',
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
