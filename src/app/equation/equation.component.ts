import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { delay, filter, scan } from 'rxjs';
import { AdditionValidators } from '../addition-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {

  secondesPerSolution = 0;

  mathForm: FormGroup = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, 
  [AdditionValidators.addition('a', 'b', 'answer')]
  );

  constructor() { }

  ngOnInit(): void {
    // const startTime = new Date();
    // let numberSolved: number = 0;
    this.mathForm.statusChanges.pipe(
      filter((value) => value === 'VALID'),
      delay(300),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved +1,
          startTime: acc.startTime
        }
      }, {numberSolved: 0, startTime: new Date()})
    ).subscribe(({numberSolved, startTime}) => { 
      this.secondesPerSolution = (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      });
    });
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 10);
  }

}
