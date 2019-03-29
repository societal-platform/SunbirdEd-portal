import { ResourceService } from '../../services/index';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICard } from '../../interfaces';
import { IImpressionEventInput, IInteractEventObject } from '@sunbird/telemetry';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  /**
* content is used to render IContents value on the view
*/
  @Input() data: ICard;
  @Input() customClass: string;
  @Output() clickEvent = new EventEmitter<any>();

  constructor(public resourceService: ResourceService, public router: Router) {
    this.resourceService = resourceService;

  }


  public onAction(data, action) {
    this.clickEvent.emit({ 'action': action, 'data': data });
    // this.router.navigate(['/play/content', data.identifier]);
  }

}
