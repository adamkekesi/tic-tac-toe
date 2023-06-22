import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createBoardEditorForm() {
  return new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
}
