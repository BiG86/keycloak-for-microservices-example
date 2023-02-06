import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-common-button-primary',
  templateUrl: './common-button-primary.component.html',
  styleUrls: ['./common-button-primary.component.css']
})
export class CommonButtonPrimaryComponent implements OnInit {

  @Input() btnText: string = 'common.save';

  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  public actionClick(event: any) {
    this.buttonClick.emit()
  }
}
