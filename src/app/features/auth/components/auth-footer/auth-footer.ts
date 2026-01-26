import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth-footer',
  imports: [TranslateModule, SelectModule, FormsModule, CommonModule],
  templateUrl: './auth-footer.html',
  styleUrl: './auth-footer.css',
})
export class AuthFooter {
  private readonly _translate = inject(TranslateService);

  public readonly currentYear = new Date().getFullYear();

  public readonly languages = [
    { label: 'English', value: 'en', icon: '🇺🇸' },
    { label: 'العربية', value: 'ar', icon: '🇸🇦' },
  ];

  public selectedLanguage = signal(this.languages[0]);

  public onLanguageChange(event: any) {
    const lang = event.value.value;
    this._translate.use(lang);

    // Update document direction for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }
}
