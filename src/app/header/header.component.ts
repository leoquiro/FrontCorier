import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { OutsideClickDirective } from '../directives/outside-click.directive';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, OutsideClickDirective], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('dropdownAnimation', [
      state('void', style({ maxHeight: '0', overflow: 'hidden' })),
      state('*', style({ maxHeight: '300px', overflow: 'hidden' })),
      transition('void => *', [
        animate('500ms ease-in-out')
      ]),
      transition('* => void', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class HeaderComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}