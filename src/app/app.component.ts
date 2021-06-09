import { Component } from '@angular/core';
import {CachedDataDownloadSynchronizerService} from './cached-data-download-synchronizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private cached:CachedDataDownloadSynchronizerService) {
  }
}
