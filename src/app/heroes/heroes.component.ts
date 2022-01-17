import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
//import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, /*private messageService : MessageService */) { }
  heroes: Hero[] = [];
  
  getHeroes() : void
  {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
  //selectedHero: Hero | undefined;
  /*onSelect(hero: Hero): void
  {
    this.selectedHero = hero;
    const m: string = "HeroComponent: Selected "+this.selectedHero.name+" hero.";
    this.messageService.add(m);
  }*/ //Removed as selection redirects to details page.
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  ngOnInit(): void {
    this.getHeroes();
  }

}
