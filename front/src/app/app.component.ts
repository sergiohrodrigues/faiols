import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrl: './app.component.css',
  template: `
    <div class="p-4">
      <h2>Upload de múltiplos PDFs</h2>

      <input 
        type="file" 
        (change)="onFileSelected($event)" 
        accept="application/pdf"
        multiple
      />

      <button (click)="uploadFiles()" [disabled]="!selectedFiles.length">
        Enviar
      </button>
      <button (click)="limparLista()" [disabled]="!selectedFiles.length">
        Limpar
      </button>

      <ul>
        <li *ngFor="let file of selectedFiles">{{ file.name }}</li>
      </ul>

      <div *ngIf="uploadProgress !== null">
        Progresso: {{ uploadProgress }}%
      </div>
    </div>
  `
})
export class AppComponent {
  selectedFiles: File[] = [];
  uploadProgress: number | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedFiles = Array.from(input.files).filter(file => file.type === 'application/pdf');
  }

  uploadFiles() {
    if (!this.selectedFiles.length) return;

    const formData = new FormData();
    this.selectedFiles.forEach((file, index) => {
      formData.append('files', file, file.name);
    });

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    // console.log(formData.entries())
    console.log(formData)

    this.http.post('https://sua-api.com/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload concluído:', event.body);
          this.uploadProgress = null;
          this.selectedFiles = [];
        }
      },
      error: err => {
        console.error('Erro no upload:', err);
        this.uploadProgress = null;
      }
    });
  }

  limparLista(){
    this.selectedFiles = [];
  }
}
