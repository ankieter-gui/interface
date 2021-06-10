import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharingService} from '../sharing.service';

@Component({
  selector: 'app-link-activator',
  templateUrl: './link-activator.component.html',
  styleUrls: ['./link-activator.component.css']
})
export class LinkActivatorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router, private sharing:SharingService) { }

  ngOnInit(): void {
   this.sharing.activateLink(this.route.snapshot.paramMap.get('hash')).subscribe(d=>
   console.log(d))
  }

}
