import { Component } from '@angular/core';
import {CachedDataDownloadSynchronizerService} from './cached-data-download-synchronizer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public cached:CachedDataDownloadSynchronizerService, public route:ActivatedRoute) {
  }

}
