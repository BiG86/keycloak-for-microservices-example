import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-common-button-discard',
  templateUrl: './common-button-discard.component.html',
  styleUrls: ['./common-button-discard.component.css']
})
export class CommonButtonDiscardComponent implements OnInit {

  @Input() btnText: string = 'common.cancel';

  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public actionClick(event: any) {
    this.buttonClick.emit()
  }
}
