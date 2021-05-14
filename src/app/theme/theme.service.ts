import { EventEmitter, Inject, Injectable, OnInit } from '@angular/core';
import { ACTIVE_THEME, Theme, THEMES } from './symbols';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {
  themeChange = new EventEmitter<Theme>();

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string,

  ) {
    this.getUserTheme();
  }

  ngOnInit() {
  }

  getTheme(name: string) {
    const theme = this.findTheme(name);
    return theme;
  }

  getActiveTheme() {
    return this.getTheme(this.theme);
  }

  getProperty(propName: string) {
    return this.getActiveTheme().properties[propName];
  }

  setTheme(name: string) {
    this.theme = name;
    this.themeChange.emit(this.getActiveTheme());
    this.setUserTheme(name);
  }

  registerTheme(theme: Theme) {
    this.themes.push(theme);
  }

  updateTheme(name: string, properties: { [key: string]: string }) {
    const theme = this.getTheme(name);
    theme.properties = {
      ...theme.properties,
      ...properties
    };

    if (name === this.theme) {
      this.themeChange.emit(theme);
    }
  }

  private findTheme(name: string): Theme {
    const theme = this.themes.find(t => t.name === name);
    if (!theme) {
      throw new Error(`Theme not found: '${name}'`);
    }
    return theme;
  }

  private setUserTheme(name: string) {
    const theme = this.findTheme(name);
    const themePayload: string = JSON.stringify(theme);
    localStorage.setItem("theme", themePayload);
  }

  public getUserTheme() {
    const savedTheme: Theme | null = JSON.parse(localStorage.getItem("theme"));
    if (savedTheme) {
      this.theme = savedTheme.name;
    } else {
      this.setUserTheme(this.theme);
    }
  }

}
