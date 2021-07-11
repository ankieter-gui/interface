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
  renderPreview=false;
  reportId;
  ngOnInit(): void {
   this.sharing.activateLink(this.route.snapshot.paramMap.get('hash')).subscribe((d:any)=>{
   if (!d.message){
     if (d.object == "report"){
       if (d.permission == "w") this.router.navigate(['/reports/editor/', d.id])
       if (d.permission == "r") {
         this.renderPreview=true
         this.reportId=d.id;
       }//this.router.navigate(['/reports/', d.id])
     }
     else if (d.object == "survey"){
       this.router.navigate(['/'])
     }

   }else{
     this.router.navigate(['/'])
   }
   });
  }

}
