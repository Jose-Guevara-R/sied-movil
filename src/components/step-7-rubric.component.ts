import { Component, inject, signal } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-step-7',
   standalone: true,
   imports: [CommonModule, FormsModule],
   template: `
    <div class="max-w-[1200px] mx-auto flex flex-col gap-8 py-8 px-4 animate-fade-in-up">
       <!-- Header -->
       <div class="flex flex-wrap justify-between items-end gap-4 border-b border-[#283928] pb-6">
          <div class="max-w-2xl">
             <h1 class="text-4xl font-black text-white mb-2">Rúbrica de Evaluación</h1>
             <p class="text-[#9db99d]">Generado automáticamente basado en tus Misiones de la Fase 3.</p>
          </div>
          <div class="flex gap-3">
             <button 
              (click)="generateRubric()"
              [disabled]="isLoading()"
              class="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#1c271c] hover:bg-[#283928] text-white border border-[#283928] text-sm font-bold disabled:opacity-50">
                <span class="material-symbols-outlined text-[20px]">{{ isLoading() ? 'sync' : 'autorenew' }}</span>
                {{ isLoading() ? 'Generando...' : 'Generar / Regenerar (IA)' }}
             </button>
             <button class="flex items-center gap-2 h-10 px-4 rounded-lg bg-[#1c271c] hover:bg-[#283928] text-white border border-[#283928] text-sm font-bold">
                <span class="material-symbols-outlined text-[20px]">add</span> Añadir Criterio
             </button>
          </div>
       </div>

       <!-- Table Toolbar -->
       <div class="flex justify-between items-center text-sm text-[#9db99d] px-1">
          <span>{{ state.evaluacion().instrumento_evaluacion.length }} criterios definidos</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#13ec13]"></span> Guardado automático</span>
       </div>

       <!-- Empty State -->
       <div *ngIf="state.evaluacion().instrumento_evaluacion.length === 0 && !isLoading()" 
            class="bg-[#1c271c] border border-dashed border-[#283928] rounded-xl p-20 text-center">
            <span class="material-symbols-outlined text-6xl text-[#283928] mb-4">table_chart</span>
            <h2 class="text-xl font-bold text-[#9db99d]">Presiona "Generar con IA" para crear la rúbrica</h2>
       </div>

       <!-- Loading State -->
       <div *ngIf="isLoading()" class="bg-[#1c271c] border border-[#283928] rounded-xl p-20 text-center animate-pulse">
            <span class="material-symbols-outlined text-6xl text-[#13ec13] mb-4 spin">hourglass_empty</span>
            <h2 class="text-xl font-bold text-white">La IA está diseñando los niveles de logro...</h2>
       </div>

       <!-- Table -->
       <div *ngIf="state.evaluacion().instrumento_evaluacion.length > 0 && !isLoading()" 
            class="w-full overflow-hidden rounded-xl border border-[#283928] bg-[#1c271c] shadow-2xl">
          <div class="overflow-x-auto">
             <table class="w-full min-w-[1000px] border-collapse">
                <thead>
                   <tr class="bg-[#151f15] border-b border-[#283928]">
                      <th class="sticky left-0 bg-[#151f15] border-r border-[#283928] p-4 text-left w-[25%] text-white text-xs uppercase tracking-widest font-black">Criterio / Misión</th>
                      <th class="p-4 text-left w-[25%] border-r border-[#283928]/50">
                         <div class="flex items-center gap-2 mb-1 text-white font-bold"><span class="material-symbols-outlined text-red-400 text-sm">sentiment_dissatisfied</span> Inicio (C)</div>
                      </th>
                      <th class="p-4 text-left w-[25%] border-r border-[#283928]/50">
                         <div class="flex items-center gap-2 mb-1 text-white font-bold"><span class="material-symbols-outlined text-yellow-400 text-sm">sentiment_neutral</span> Proceso (B)</div>
                      </th>
                      <th class="p-4 text-left w-[25%]">
                         <div class="flex items-center gap-2 mb-1 text-white font-bold"><span class="material-symbols-outlined text-[#13ec13] text-sm">sentiment_satisfied</span> Logro (A/AD)</div>
                      </th>
                   </tr>
                </thead>
                <tbody class="divide-y divide-[#283928]">
                   @for (row of state.evaluacion().instrumento_evaluacion; track $index) {
                     <tr class="group hover:bg-white/5 transition-colors">
                        <td class="sticky left-0 bg-[#1c271c] group-hover:bg-[#233023] border-r border-[#283928] p-4 align-top">
                           <span class="text-[#13ec13] text-[10px] font-black uppercase tracking-tighter block mb-1">Criterio {{ $index + 1 }}</span>
                           <textarea 
                              class="w-full bg-transparent border-none text-white font-bold text-sm resize-none focus:outline-none" 
                              [ngModel]="row.criterio"
                              (ngModelChange)="updateRow($index, {criterio: $event})"
                              rows="2"
                           ></textarea>
                        </td>
                        <td class="p-4 border-r border-[#283928]/30">
                          <textarea 
                            class="w-full bg-transparent border-none text-slate-400 text-xs leading-relaxed resize-none focus:outline-none" 
                            [ngModel]="row.nivel_inicio"
                            (ngModelChange)="updateRow($index, {nivel_inicio: $event})"
                            rows="4"
                          ></textarea>
                        </td>
                        <td class="p-4 border-r border-[#283928]/30">
                          <textarea 
                            class="w-full bg-transparent border-none text-slate-400 text-xs leading-relaxed resize-none focus:outline-none" 
                            [ngModel]="row.nivel_proceso"
                            (ngModelChange)="updateRow($index, {nivel_proceso: $event})"
                            rows="4"
                          ></textarea>
                        </td>
                        <td class="p-4 bg-[#13ec13]/5">
                          <textarea 
                            class="w-full bg-transparent border-none text-[#13ec13] font-medium text-xs leading-relaxed resize-none focus:outline-none" 
                            [ngModel]="row.nivel_logro"
                            (ngModelChange)="updateRow($index, {nivel_logro: $event})"
                            rows="4"
                          ></textarea>
                        </td>
                     </tr>
                   }
                </tbody>
             </table>
          </div>
       </div>

       <div class="flex justify-end gap-4 mt-4">
          <button class="flex items-center gap-2 h-12 px-6 rounded-lg bg-[#1c271c] border border-[#13ec13]/30 text-[#13ec13] font-bold">
             <span class="material-symbols-outlined">description</span> Exportar a Word
          </button>
          <button (click)="state.nextStep()" class="flex items-center gap-2 h-12 px-8 rounded-lg bg-[#13ec13] text-[#102210] font-bold hover:bg-[#11d111]">
             Finalizar Diseño <span class="material-symbols-outlined">check_circle</span>
          </button>
       </div>
    </div>

    <style>
      .spin { animation: spin 2s linear infinite; }
      @keyframes spin { 100% { transform:rotate(360deg); } }
    </style>
  `
})
export class Step7RubricComponent {
   state = inject(StateService);
   isLoading = signal(false);

   async generateRubric() {
      this.isLoading.set(true);
      try {
         const resp = await fetch('/api/generate-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               step: 8,
               context: this.state.evaluacion()
            })
         });
         const data = await resp.json();
         if (Array.isArray(data)) {
            this.state.setRubrica(data);
         }
      } catch (e) {
         console.error('Error generando rúbrica', e);
      } finally {
         this.isLoading.set(false);
      }
   }

   updateRow(index: number, changes: any) {
      const current = [...this.state.evaluacion().instrumento_evaluacion];
      current[index] = { ...current[index], ...changes };
      this.state.setRubrica(current);
   }
}