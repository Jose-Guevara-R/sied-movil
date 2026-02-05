import { Component, inject, computed } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-step-3',
   standalone: true,
   imports: [CommonModule],
   template: `
    <div class="max-w-[1400px] mx-auto h-full flex flex-col gap-6 animate-fade-in-up">
      <!-- Header -->
      <div class="flex justify-between items-end">
        <div>
           <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">Fase 2: Alineamiento Curricular</h1>
           <div class="flex items-center gap-2 text-slate-400 capitalize">
             <span class="material-symbols-outlined text-[#3c3cf6]">school</span>
             <span>{{ areaLabel }}</span>
             <span class="w-1 h-1 rounded-full bg-slate-500"></span>
             <span>Ciclo {{ state.evaluacion().meta_institucional.ciclo }}</span>
           </div>
        </div>
        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3c3cf6]/10 border border-[#3c3cf6]/20 text-[#3c3cf6] text-sm font-medium">
           <span class="material-symbols-outlined text-lg">info</span>
           <span>Seleccione una o más competencias</span>
        </div>
      </div>

      <!-- Split View -->
      <div class="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
         <!-- Left: List -->
         <div class="flex-1 flex flex-col bg-[#1a1a24] rounded-2xl border border-[#282839] overflow-hidden">
            <div class="p-5 border-b border-[#282839] bg-[#1a1a24]/50">
               <h3 class="text-lg font-bold text-white">Selecciona las Competencias</h3>
            </div>
            <div class="overflow-y-auto p-4 space-y-3">
               @for (comp of competencias; track comp.id) {
                 <div 
                   (click)="toggle(comp.id)"
                   class="group relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all"
                   [ngClass]="isSelected(comp.id) ? 'border-[#3c3cf6] bg-[#3c3cf6]/10' : 'border-[#282839] hover:border-[#3c3cf6]/50 hover:bg-[#282839]'"
                 >
                    <div class="flex items-center h-6">
                       <span class="material-symbols-outlined" [ngClass]="isSelected(comp.id) ? 'text-[#3c3cf6]' : 'text-slate-500'">
                         {{ isSelected(comp.id) ? 'check_box' : 'check_box_outline_blank' }}
                       </span>
                    </div>
                    <div class="flex-1">
                       <div class="flex justify-between items-start mb-1">
                          <span class="font-bold" [ngClass]="isSelected(comp.id) ? 'text-white' : 'text-slate-300 group-hover:text-white'">
                            {{ comp.label }}
                          </span>
                          <span class="text-xs font-mono px-2 py-0.5 rounded" [ngClass]="isSelected(comp.id) ? 'bg-[#3c3cf6] text-white' : 'bg-[#282839] text-slate-400'">
                            {{ comp.id }}
                          </span>
                       </div>
                       <p class="text-sm" [ngClass]="isSelected(comp.id) ? 'text-slate-200' : 'text-slate-500'">
                         {{ comp.desc }}
                       </p>
                    </div>
                 </div>
               }
            </div>
         </div>

         <!-- Right: Preview -->
         <div class="flex-1 flex flex-col bg-[#15151e] rounded-2xl border border-[#282839] overflow-hidden relative">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#3c3cf6]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div class="p-6 border-b border-[#282839] flex justify-between items-center bg-[#1a1a24]/50 backdrop-blur-sm z-10">
                <h3 class="text-lg font-bold text-white flex items-center gap-2">
                   <span class="material-symbols-outlined text-[#3c3cf6]">menu_book</span>
                   Estándar de Aprendizaje (CNEB)
                </h3>
                <div class="flex gap-2">
                   <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800">
                     Nivel {{ state.evaluacion().meta_institucional.ciclo === 'VI' ? '6' : '7' }}
                   </span>
                </div>
            </div>
            <div class="flex-1 p-8 overflow-y-auto z-10">
                <h4 class="text-[#3c3cf6] text-xl font-bold mb-4">Descripción del Nivel</h4>
                <p class="text-slate-300 text-lg leading-8 font-light">
                   {{ estandar }}
                </p>
                <div class="my-6 h-px bg-[#282839] w-full"></div>
                <h5 class="text-white font-bold mb-2">Capacidades Asociadas:</h5>
                <ul class="space-y-3 mt-4">
                   <li class="flex gap-3 items-start">
                      <span class="material-symbols-outlined text-[#3c3cf6] text-sm mt-1">check_circle</span>
                      <span class="text-slate-400">Problematiza situaciones.</span>
                   </li>
                   <li class="flex gap-3 items-start">
                      <span class="material-symbols-outlined text-[#3c3cf6] text-sm mt-1">check_circle</span>
                      <span class="text-slate-400">Diseña estrategias para hacer indagación.</span>
                   </li>
                </ul>
            </div>
         </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center py-2">
         <button (click)="state.prevStep()" class="flex items-center gap-2 px-6 h-12 rounded-full border border-[#3b3b54] text-white font-bold hover:bg-[#282839]">
            <span class="material-symbols-outlined">arrow_back</span> Anterior
         </button>
         <button (click)="state.nextStep()" [disabled]="!canContinue" class="flex items-center gap-2 px-8 h-12 rounded-full bg-[#3c3cf6] text-white font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25">
            Siguiente <span class="material-symbols-outlined">arrow_forward</span>
         </button>
      </div>
    </div>
  `
})
export class Step3CurriculumComponent {
   state = inject(StateService);

   competencias = this.state.getCompetenciasPorArea();
   estandar = this.state.getEstandarActual();

   get areaLabel(): string {
      const area = this.state.evaluacion().meta_institucional.area;
      const areas: Record<string, string> = {
         'cyt': 'Ciencia y Tecnología',
         'matematica': 'Matemática',
         'comunicacion': 'Comunicación',
         'ccss': 'Ciencias Sociales'
      };
      return areas[area] || area;
   }

   get canContinue(): boolean {
      return this.state.evaluacion().diseno_curricular.competencias_seleccionadas.length > 0;
   }

   isSelected(id: string): boolean {
      return this.state.evaluacion().diseno_curricular.competencias_seleccionadas.includes(id);
   }

   toggle(id: string) {
      this.state.toggleCompetencia(id);
      // Auto-update the standard when selecting competencies (for demo simplicity, using current cycle's standard)
      if (this.state.evaluacion().diseno_curricular.estandar === '') {
         this.state.updateCurricular({ estandar: this.estandar });
      }
   }
}