import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

class SaveGameErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-board-editor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './board-editor-form.component.html',
  styleUrls: ['./board-editor-form.component.scss'],
})
export class BoardEditorFormComponent {
  @Output()
  public submit: EventEmitter<void> = new EventEmitter();

  @Input()
  public form!: FormGroup<{ name: FormControl<string | null> }>;

  @Input()
  public error?: string;

  @Input()
  public submitDisabled = false;

  public matcher = new SaveGameErrorStateMatcher();
}
