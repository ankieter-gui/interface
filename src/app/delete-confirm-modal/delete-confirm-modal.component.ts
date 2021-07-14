import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.css']
})
export class DeleteConfirmModalComponent implements OnInit {
@Input()
name:string;
  constructor() { }

  ngOnInit(): void {
  }

}
