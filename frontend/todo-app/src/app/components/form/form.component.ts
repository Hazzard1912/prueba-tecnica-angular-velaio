import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { TaskActions } from '../../store/tasks/task.actions';
import { Store } from '@ngrx/store';
import { State } from '../../store/tasks/task.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  taskForm: FormGroup;
  isEditing: boolean = false;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ tasks: State }>,
    private router: Router,
    private route: ActivatedRoute) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      deadline: ['', Validators.required],
      persons: this.fb.array([], [this.minLengthArray(1), this.noDuplicateNames]),
      is_completed: [false]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.isEditing = true;
        this.taskId = taskId;
        this.store.select(state => state.tasks.tasks.find(task => task._id === taskId)).subscribe(task => {
          if (task) {
            this.taskForm.patchValue(task);
            this.setPersons(task.persons);
          }
        });
      } else {
        this.addPerson();
      }
    });
    this.markFormGroupTouched(this.taskForm);
  }


  createPersonGroup(person?: Person): FormGroup {
    return this.fb.group({
      full_name: [person?.full_name || '', [Validators.required, Validators.minLength(5)]],
      age: [person?.age || '', [Validators.required, Validators.min(18)]],
      skills: this.fb.array(person?.skills?.map(skill => this.createSkillControl(skill)) || [], this.minLengthArray(1))
    });
  }

  createSkillControl(skill: string = ''): AbstractControl {
    return this.fb.control(skill, Validators.required);
  }

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson(): void {
    this.persons.push(this.createPersonGroup());
  }

  removePerson(index: number) {
    this.persons.removeAt(index);
  }

  noDuplicateNames(control: AbstractControl): { [key: string]: boolean } | null {
    const persons = control.value;
    const names = persons.map((person: any) => person.full_name);
    const hasDuplicates = names.some((name: string, index: number) => names.indexOf(name) !== index);
    return hasDuplicates ? { 'duplicateNames': true } : null;
  }

  getSkills(person: AbstractControl): FormArray {
    return person.get('skills') as FormArray;
  }

  addSkill(personIndex: number): void {
    const skills = this.getSkills(this.persons.at(personIndex));
    skills.push(this.createSkillControl());
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.persons.at(personIndex).get('skills') as FormArray;
    skills.removeAt(skillIndex);
  }

  setPersons(persons: Person[]): void {
    persons.forEach(person => {
      this.persons.push(this.createPersonGroup(person));
    });
  }

  minLengthArray(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { minLengthArray: { valid: false, min } };
      }
      return null;
    };
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      if (this.isEditing) {
        this.store.dispatch(TaskActions.updateTask({
          task: {
            ...this.taskForm.value,
            _id: this.taskId
          }
        }));
      } else {
        this.store.dispatch(TaskActions.addTask({ task: this.taskForm.value }));
      }
      this.router.navigate(['/tasks']);
    }
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}