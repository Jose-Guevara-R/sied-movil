import { Component, inject, signal } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-step-5',
   standalone: true,
   imports: [CommonModule],
   template: `
    <div class="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <!-- Top -->
      <div class="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
           <p class="text-[#10b77f] font-medium mb-1">Paso 5 de 8</p>
           <h1 class="text-4xl font-bold text-white">Definición de Producciones</h1>
           <p class="text-gray-400 mt-2">Nuestra IA analiza tu situación para sugerir evidencias concretas.</p>
        </div>
        <button class="px-4 py-2 rounded-lg border border-[#283933] text-gray-300 hover:bg-[#283933] text-sm flex items-center gap-2">
           <span class="material-symbols-outlined text-[18px]">add</span> Añadir Manualmente
        </button>
      </div>

      <!-- AI Banner -->
      <div class="relative overflow-hidden rounded-2xl bg-[#1c2624] p-8 border border-[#283933] text-center shadow-2xl">
         <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#10b77f]/10 blur-3xl"></div>
         <div class="relative z-10 flex flex-col items-center">
            <div class="mb-4 rounded-full bg-[#283933]/50 p-3 ring-1 ring-white/10">
               <span class="material-symbols-outlined text-3xl text-[#10b77f]" [class.animate-pulse]="isLoading()">
                 {{ isLoading() ? 'sync' : 'auto_awesome' }}
               </span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Asistente de Inteligencia Artificial</h3>
            <p class="text-gray-400 max-w-lg mb-6">
              {{ isLoading() ? 'Analizando situación curricular...' : 'Basado en tus competencias y situación, la IA sugiere productos tangibles.' }}
            </p>
            <button 
              (click)="generateSuggestions()" 
              [disabled]="isLoading()"
              class="flex items-center gap-3 rounded-xl bg-[#10b77f] px-8 py-3 text-white font-bold hover:bg-[#0e9f6e] shadow-[0_0_20px_rgba(16,183,127,0.3)] transition-all disabled:opacity-50"
            >
               <span class="material-symbols-outlined">{{ isLoading() ? 'hourglass_empty' : 'psychology' }}</span>
               {{ isLoading() ? 'Generando...' : 'Sugerir con IA' }}
            </button>
         </div>
      </div>

      <!-- Cards Grid -->
      <div *ngIf="suggestions().length > 0">
         <div class="flex items-center gap-2 mb-4 text-white">
            <span class="material-symbols-outlined text-[#10b77f]">lightbulb</span>
            <h2 class="text-xl font-bold">Sugerencias Generadas</h2>
         </div>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (sug of suggestions(); track sug) {
              <div 
                (click)="toggle(sug)"
                class="group bg-[#1c2624]/70 backdrop-blur border rounded-xl p-5 transition-all hover:-translate-y-1 cursor-pointer"
                [ngClass]="isSelected(sug) ? 'border-[#10b77f] bg-[#10b77f]/5' : 'border-white/5 hover:border-[#10b77f]/40'"
              >
                 <div class="mb-3 flex justify-between">
                    <span class="px-2 py-0.5 rounded-full bg-[#10b77f]/10 text-[#10b77f] text-xs font-bold border border-[#10b77f]/30 flex items-center gap-1">
                       <span class="material-symbols-outlined text-[12px]">auto_awesome</span> IA
                    </span>
                    <span *ngIf="isSelected(sug)" class="material-symbols-outlined text-[#10b77f]">check_circle</span>
                 </div>
                 <div class="h-32 w-full rounded-lg bg-gray-800 mb-4 overflow-hidden">
                    <img [src]="'https://picsum.photos/seed/' + sug + '/400/300'" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="Evidence">
                 </div>
                 <h3 class="text-lg font-bold text-white mb-2 group-hover:text-[#10b77f]">{{ sug }}</h3>
                 <div class="border-t border-white/5 pt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span class="material-symbols-outlined text-[16px]">category</span> Sugerencia de producto
                 </div>
              </div>
            }
         </div>
      </div>

      <div class="flex justify-between items-center pt-8 border-t border-[#283933]">
         <button (click)="state.prevStep()" class="flex items-center gap-2 text-gray-300 font-bold hover:text-white">
             <span class="material-symbols-outlined">arrow_back</span> Atrás
         </button>
         <button (click)="state.nextStep()" [disabled]="!canContinue()" class="flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 disabled:opacity-50">
             Siguiente Paso <span class="material-symbols-outlined">arrow_forward</span>
         </button>
      </div>
    </div>
  `
})
export class Step5EvidenceComponent {
   state = inject(StateService);
   isLoading = signal(false);
   suggestions = signal<string[]>([]);

   async generateSuggestions() {
      this.isLoading.set(true);
      try {
         const resp = await fetch('/api/generate-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               step: 6,
               context: this.state.evaluacion()
            })
         });
         const data = await resp.json();
         if (Array.isArray(data)) {
            this.suggestions.set(data);
         }
      } catch (e) {
         console.error('Error generando sugerencias', e);
      } finally {
         this.isLoading.set(false);
      }
   }

   toggle(sug: string) {
      this.state.toggleEvidence(sug);
   }

   isSelected(sug: string): boolean {
      return this.state.evaluacion().diseno_instruccional.evidencias.includes(sug);
   }

   canContinue(): boolean {
      return this.state.evaluacion().diseno_instruccional.evidencias.length > 0;
   }
}