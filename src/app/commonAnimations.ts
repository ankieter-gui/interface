import {animate, state, style, transition, trigger} from '@angular/animations';

export let fadeInOut = trigger('fadeInOut', [
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('void => *', [

    style({ opacity: 0, transform: 'translateY(15%)' }),

    animate('200ms')

  ]),
  transition('* => void', [
   //  animate(200, style({ opacity:0,transform: 'translateY(15%)' }))
  ])
])
