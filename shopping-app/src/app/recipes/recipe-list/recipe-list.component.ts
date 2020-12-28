import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Beef Wellington', 'Follow Gordan Ramsay version', 'https://i0.wp.com/goepicurista.com/wp-content/uploads/2017/11/IMG_2357-e1510956466573.png'),
    new Recipe('Beef Wellington', 'Follow Gordan Ramsay version', 'https://i0.wp.com/goepicurista.com/wp-content/uploads/2017/11/IMG_2357-e1510956466573.png')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
