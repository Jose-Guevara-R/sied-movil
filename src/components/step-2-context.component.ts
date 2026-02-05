import { Component, inject } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <!-- Header -->
      <div class="flex justify-between items-start">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 text-[#13ec13] font-semibold text-sm tracking-wider uppercase">
            <span class="w-2 h-2 rounded-full bg-[#13ec13]"></span>
            Fase 1: Diagnóstico
          </div>
          <h1 class="text-4xl font-bold text-white tracking-tight">Contextualización del Estudiante</h1>
          <p class="text-slate-400 max-w-2xl">
            Seleccione los indicadores que mejor describan la realidad de sus estudiantes para calibrar la IA.
          </p>
        </div>
        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#13ec13]/10 rounded-full border border-[#13ec13]/20">
            <span class="material-symbols-outlined text-[#13ec13] text-[18px]">auto_awesome</span>
            <span class="text-xs font-medium text-[#13ec13]">Cloud Sync Active</span>
        </div>
      </div>

      <!-- Grid Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Socio-economic -->
        <div class="bg-[#162916] rounded-2xl p-5 border border-white/5 shadow-lg">
          <div class="flex items-center gap-3 mb-4">
            <span class="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <span class="material-symbols-outlined">public</span>
            </span>
            <h3 class="font-semibold text-white">Socio-económico</h3>
          </div>
          <div class="flex flex-col gap-3">
             <div 
                (click)="toggle('Internet')"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border"
                [ngClass]="isSelected('Internet') ? 'bg-[#13ec13] text-black font-medium border-[#13ec13]' : 'bg-black/20 text-slate-300 border-transparent hover:bg-white/5'"
             >
               <div class="flex items-center gap-2"><span class="material-symbols-outlined">wifi</span> Acceso a Internet</div>
               <span *ngIf="isSelected('Internet')" class="material-symbols-outlined">check</span>
             </div>
             
             <div 
                (click)="toggle('Rural')"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border"
                [ngClass]="isSelected('Rural') ? 'bg-[#13ec13] text-black font-medium border-[#13ec13]' : 'bg-black/20 text-slate-300 border-transparent hover:bg-white/5'"
             >
               <div class="flex items-center gap-2"><span class="material-symbols-outlined">landscape</span> Zona Rural</div>
               <span *ngIf="isSelected('Rural')" class="material-symbols-outlined">check</span>
             </div>

             <div 
                (click)="toggle('Urbano')"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border"
                [ngClass]="isSelected('Urbano') ? 'bg-[#13ec13] text-black font-medium border-[#13ec13]' : 'bg-black/20 text-slate-300 border-transparent hover:bg-white/5'"
             >
               <div class="flex items-center gap-2"><span class="material-symbols-outlined">apartment</span> Zona Urbana</div>
               <span *ngIf="isSelected('Urbano')" class="material-symbols-outlined">check</span>
             </div>
          </div>
        </div>

        <!-- Hábito Lector -->
        <div class="bg-[#162916] rounded-2xl p-5 border border-white/5 shadow-lg">
          <div class="flex items-center gap-3 mb-4">
            <span class="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <span class="material-symbols-outlined">menu_book</span>
            </span>
            <h3 class="font-semibold text-white">Hábito Lector</h3>
          </div>
          <div class="flex flex-col gap-3">
             <div 
                (click)="toggle('Lee por Placer')"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border"
                [ngClass]="isSelected('Lee por Placer') ? 'bg-[#13ec13] text-black font-medium border-[#13ec13]' : 'bg-black/20 text-slate-300 border-transparent hover:bg-white/5'"
             >
               <div class="flex items-center gap-2"><span class="material-symbols-outlined">auto_stories</span> Lee por placer</div>
               <span *ngIf="isSelected('Lee por Placer')" class="material-symbols-outlined">check</span>
             </div>

             <div 
                (click)="toggle('Solo escolar')"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border"
                [ngClass]="isSelected('Solo escolar') ? 'bg-[#13ec13] text-black font-medium border-[#13ec13]' : 'bg-black/20 text-slate-300 border-transparent hover:bg-white/5'"
             >
               <div class="flex items-center gap-2"><span class="material-symbols-outlined">school</span> Solo escolar</div>
               <span *ngIf="isSelected('Solo escolar')" class="material-symbols-outlined">check</span>
             </div>
          </div>
        </div>

        <!-- Económico -->
        <div class="bg-[#162916] rounded-2xl p-5 border border-white/5 shadow-lg">
          <div class="flex items-center gap-3 mb-4">
            <span class="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <span class="material-symbols-outlined">attach_money</span>
            </span>
            <h3 class="font-semibold text-white">Factor Económico</h3>
          </div>
          <div class="flex flex-col gap-3">
             <div 
                (click)="toggle('Ingresos Bajos')"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border"
                [ngClass]="isSelected('Ingresos Bajos') ? 'bg-[#13ec13] text-black font-medium border-[#13ec13]' : 'bg-black/20 text-slate-300 border-transparent hover:bg-white/5'"
             >
               <div class="flex items-center gap-2"><span class="material-symbols-outlined">trending_down</span> Ingresos Bajos</div>
               <span *ngIf="isSelected('Ingresos Bajos')" class="material-symbols-outlined">check</span>
             </div>

             <div 
                (click)="toggle('Ingresos Medios')"
                class="flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer border"
                [ngClass]="isSelected('Ingresos Medios') ? 'bg-[#13ec13] text-black font-medium border-[#13ec13]' : 'bg-black/20 text-slate-300 border-transparent hover:bg-white/5'"
             >
               <div class="flex items-center gap-2"><span class="material-symbols-outlined">trending_flat</span> Ingresos Medios</div>
               <span *ngIf="isSelected('Ingresos Medios')" class="material-symbols-outlined">check</span>
             </div>
          </div>
        </div>
      </div>

      <!-- Problemáticas Input -->
      <div class="flex flex-col gap-4 mt-8">
        <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[#13ec13] text-3xl">psychology_alt</span>
            <div>
                <h3 class="text-lg font-bold text-white">Problemáticas del Entorno</h3>
                <p class="text-xs text-[#13ec13] font-medium tracking-wide">INPUT VITAL PARA IA</p>
            </div>
        </div>
        
        <div class="relative group">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-[#13ec13] to-green-800 rounded-2xl opacity-20 blur group-focus-within:opacity-50 transition duration-500"></div>
            <div class="relative bg-[#0c120c] rounded-2xl p-1">
                <textarea 
                    class="w-full bg-[#111811] text-white rounded-xl p-6 border-0 focus:ring-0 resize-none placeholder-slate-600 text-base min-h-[120px] focus:outline-none" 
                    placeholder="Describa situaciones problemáticas del contexto local..."
                    [ngModel]="state.evaluacion().contexto.problematicas"
                    (ngModelChange)="updateProblematicas($event)"
                ></textarea>
                <div class="absolute bottom-4 right-4 flex gap-2">
                    <button class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition-colors">
                        <span class="material-symbols-outlined text-[16px]">mic</span> Dictar
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div class="flex justify-between items-center pt-8 border-t border-white/5">
        <button (click)="state.prevStep()" class="text-slate-400 hover:text-white font-medium flex items-center gap-2">
          <span class="material-symbols-outlined">arrow_back</span> Atrás
        </button>
        <button (click)="state.nextStep()" class="px-8 py-3 rounded-full bg-[#13ec13] text-black font-bold hover:bg-green-400 hover:shadow-[0_0_20px_rgba(19,236,19,0.4)] transition-all flex items-center gap-2">
           Siguiente Paso <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  `
})
export class Step2ContextComponent {
  state = inject(StateService);

  isSelected(item: string): boolean {
    return this.state.evaluacion().contexto.socioeconomico.includes(item);
  }

  toggle(item: string) {
    this.state.toggleSocioeconomico(item);
  }

  updateProblematicas(val: string) {
    this.state.updateContexto({ problematicas: val });
  }
}