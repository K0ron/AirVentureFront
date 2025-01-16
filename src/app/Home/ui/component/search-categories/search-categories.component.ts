import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-categories.component.html',
  styleUrl: './search-categories.component.scss',
})
export class SearchCategoriesComponent {
  @Output() categorySelected = new EventEmitter<string | null>();

  icons = [
    {
      default: 'assets/Aerien.svg',
      hover: 'assets/AerienHover.svg',
      alt: 'icon aérien',
      category: 'AERIEN',
      isHovered: false,
    },
    {
      default: 'assets/Neige.svg',
      hover: 'assets/NeigeHover.svg',
      alt: 'icon neige',
      category: 'NEIGE',
      isHovered: false,
    },
    {
      default: 'assets/Aquatique.svg',
      hover: 'assets/AquatiqueHover.svg',
      alt: 'icon aquatique',
      category: 'AQUATIQUE',
      isHovered: false,
    },
    {
      default: 'assets/Nature.svg',
      hover: 'assets/NatureHover.svg',
      alt: 'icon nature',
      category: 'NATURE',
      isHovered: false,
    },
    {
      default: 'assets/Pilotage.svg',
      hover: 'assets/PilotageHover.svg',
      alt: 'icon pilotage',
      category: 'PILOTAGE',
      isHovered: false,
    },
    {
      default: 'assets/Urbain.svg',
      hover: 'assets/UrbainHover.svg',
      alt: 'icon urbain',
      category: 'URBAIN',
      isHovered: false,
    },
  ];

  selectedCategory: string | null = null;

  selectCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.categorySelected.emit(this.selectedCategory);
  }
}
