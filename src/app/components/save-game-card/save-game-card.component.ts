import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BoardEditorFormComponent } from '../board-editor-form';

@Component({
  selector: 'app-save-game-card',
  templateUrl: './save-game-card.component.html',
  styleUrls: ['./save-game-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BoardEditorFormComponent,
  ],
})
export class SaveGameCardComponent {
  @Output()
  public submit: EventEmitter<void> = new EventEmitter();

  @Input()
  public form!: FormGroup<{ name: FormControl<string | null> }>;

  @Input()
  public error?: string;

  @Input()
  public submitDisabled = false;
}
