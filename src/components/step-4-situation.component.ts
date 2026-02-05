import { Component, inject, computed } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-step-4',
   standalone: true,
   imports: [CommonModule, FormsModule],
   template: `
    <div class="max-w-[1280px] mx-auto flex flex-col gap-6 animate-fade-in-up h-full">
      <div class="flex flex-col gap-3 pb-2 border-b border-[#283928]">
        <div class="flex justify-between items-center">
           <h1 class="text-3xl font-bold text-white font-display">Diseño de la Situación Significativa</h1>
           <span class="text-[#13ec13] font-mono">Paso 4/8</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-[#6a8a6a] bg-[#1a261a] p-3 rounded-lg border border-[#283928]">
           <span class="material-symbols-outlined">info</span>
           <p><span class="font-semibold">Competencias seleccionadas:</span> {{ selectedCompetenciesSummary }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
         <!-- Editor -->
         <div class="lg:col-span-8 flex flex-col gap-4">
            <div class="relative group flex-1 flex flex-col min-h-[400px]">
               <div class="bg-[#1a261a] rounded-t-xl px-4 py-2 flex items-center justify-between border border-[#283928]">
                  <div class="flex gap-2">
                     <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                     <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                     <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span class="text-xs text-slate-400 font-mono">editor_situacion.txt</span>
                  <div class="text-xs text-[#13ec13] flex items-center gap-1 opacity-80">
                      <span class="material-symbols-outlined text-[14px]">wifi_tethering</span> Cloud Sync Active
                  </div>
               </div>
               <textarea 
                  class="w-full flex-1 bg-[#111811] text-slate-200 p-6 rounded-b-xl border border-t-0 border-[#283928] focus:border-[#13ec13] focus:ring-1 focus:ring-[#13ec13] font-mono text-base leading-relaxed resize-none focus:outline-none"
                  placeholder="Escribe aquí la narrativa del problema..."
                  [ngModel]="state.evaluacion().diseno_curricular.situacion_significativa"
                  (ngModelChange)="updateSituation($event)"
               ></textarea>
            </div>
         </div>

         <!-- AI Widget -->
         <div class="lg:col-span-4 flex flex-col gap-6">
            <div class="bg-[#162e16] rounded-2xl border border-[#283928] p-5 relative overflow-hidden">
               <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#13ec13]/10 rounded-full blur-3xl pointer-events-none"></div>
               <div class="flex items-center gap-2 border-b border-[#283928] pb-3 mb-4">
                  <span class="material-symbols-outlined text-[#13ec13] animate-pulse">auto_awesome</span>
                  <h3 class="text-white font-bold">Sugerencias Contextuales</h3>
               </div>
               
               <p class="text-xs text-[#9db99d] uppercase tracking-wider mb-2 font-semibold">Palabras Clave</p>
               <div class="flex flex-wrap gap-2 mb-6">
                  <button (click)="addKeyword('Región Andina')" class="bg-[#1a261a] hover:bg-[#13ec13]/20 hover:text-[#13ec13] border border-[#3b543b] text-slate-300 text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1">
                     Región Andina <span class="material-symbols-outlined text-[14px]">add</span>
                  </button>
                  <button (click)="addKeyword('Salud Pública')" class="bg-[#1a261a] hover:bg-[#13ec13]/20 hover:text-[#13ec13] border border-[#3b543b] text-slate-300 text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1">
                     Salud Pública <span class="material-symbols-outlined text-[14px]">add</span>
                  </button>
                  <button (click)="addKeyword('Costumbres Locales')" class="bg-[#1a261a] hover:bg-[#13ec13]/20 hover:text-[#13ec13] border border-[#3b543b] text-slate-300 text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1">
                     Costumbres Locales <span class="material-symbols-outlined text-[14px]">add</span>
                  </button>
               </div>

               <div class="bg-[#13ec13]/10 rounded-lg p-3 border border-[#13ec13]/20">
                  <div class="flex gap-2 items-start">
                     <span class="material-symbols-outlined text-[#13ec13] text-sm mt-0.5">lightbulb</span>
                     <p class="text-xs text-slate-200">
                        <span class="font-bold text-[#13ec13]">Tip IA:</span> Intenta conectar el problema con una costumbre local para aumentar la relevancia.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div class="flex justify-between items-center pt-4">
         <button (click)="state.prevStep()" class="flex items-center gap-2 text-slate-300 hover:text-white">
            <span class="material-symbols-outlined">arrow_back</span> Atrás
         </button>
         <button (click)="state.nextStep()" [disabled]="!isSituationValid" class="flex items-center gap-2 px-8 py-3 rounded-full bg-[#13ec13] text-black hover:bg-green-400 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(19,236,19,0.4)]">
            Guardar y Continuar <span class="material-symbols-outlined">arrow_forward</span>
         </button>
      </div>
    </div>
  `
})
export class Step4SituationComponent {
   state = inject(StateService);

   selectedCompetenciesSummary = computed(() => {
      const selected = this.state.evaluacion().diseno_curricular.competencias_seleccionadas;
      if (selected.length === 0) return 'Ninguna seleccionada';
      return selected.join(', ');
   });

   get isSituationValid(): boolean {
      return (this.state.evaluacion().diseno_curricular.situacion_significativa || '').length > 20;
   }

   updateSituation(val: string) {
      this.state.updateCurricular({ situacion_significativa: val });
   }

   addKeyword(keyword: string) {
      const current = this.state.evaluacion().diseno_curricular.situacion_significativa || '';
      this.updateSituation(current + (current ? ' ' : '') + keyword);
   }
}