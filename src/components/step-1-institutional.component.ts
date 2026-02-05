import { Component, inject, computed } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <!-- Header -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 text-[#2b6cee] font-semibold text-sm tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#2b6cee]"></span>
          Fase 1: Insumos y Configuración
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Datos Institucionales
        </h1>
        <p class="text-lg text-slate-400 max-w-2xl">
          Ingrese la información básica de la institución y el aula para configurar el diseño de evaluación.
        </p>
      </div>

      <!-- Form Card -->
      <div class="glass rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <form class="space-y-8">
          <!-- Institution -->
          <div class="flex flex-col gap-3">
            <label class="text-base font-semibold text-slate-200 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#2b6cee]">domain</span>
              Nombre de la Institución Educativa
            </label>
            <input 
              type="text" 
              class="w-full bg-[#0f172a]/60 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#2b6cee] focus:ring-1 focus:ring-[#2b6cee] transition-all"
              placeholder="Ej. I.E. 1045 Virgen de Fátima"
              [ngModel]="state.evaluacion().meta_institucional.nombre_ie"
              (ngModelChange)="updateMeta({nombre_ie: $event})"
              name="nombre_ie"
            >
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Area -->
            <div class="flex flex-col gap-3 md:col-span-2">
              <label class="text-base font-semibold text-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#2b6cee]">category</span>
                Área Curricular
              </label>
              <div class="relative">
                <select 
                  class="w-full bg-[#0f172a]/60 border border-slate-700 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-[#2b6cee] cursor-pointer"
                  [ngModel]="state.evaluacion().meta_institucional.area"
                  (ngModelChange)="updateMeta({area: $event})"
                  name="area"
                >
                  <option value="" disabled>Seleccione un área...</option>
                  <option value="matematica">Matemática</option>
                  <option value="comunicacion">Comunicación</option>
                  <option value="cyt">Ciencia y Tecnología</option>
                  <option value="ccss">Ciencias Sociales</option>
                </select>
                <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </div>

            <!-- Cycle -->
            <div class="flex flex-col gap-3">
              <label class="text-base font-semibold text-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#2b6cee]">update</span>
                Ciclo
              </label>
              <div class="relative">
                <select 
                  class="w-full bg-[#0f172a]/60 border border-slate-700 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-[#2b6cee] cursor-pointer"
                  [ngModel]="state.evaluacion().meta_institucional.ciclo"
                  (ngModelChange)="updateMeta({ciclo: $event})"
                  name="ciclo"
                >
                  <option value="VI">Ciclo VI</option>
                  <option value="VII">Ciclo VII</option>
                </select>
                <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </div>

            <!-- Grade -->
            <div class="flex flex-col gap-3">
              <label class="text-base font-semibold text-slate-200 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#2b6cee]">class</span>
                Grado
              </label>
              <div class="relative">
                <select 
                  class="w-full bg-[#0f172a]/60 border border-slate-700 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-[#2b6cee] cursor-pointer"
                  [ngModel]="state.evaluacion().meta_institucional.grado"
                  (ngModelChange)="updateMeta({grado: +$event})"
                  name="grado"
                >
                  <option value="1">1° Grado</option>
                  <option value="2">2° Grado</option>
                  <option value="3">3° Grado</option>
                  <option value="4">4° Grado</option>
                  <option value="5">5° Grado</option>
                </select>
                <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>

          <div class="pt-6 flex justify-end">
            <button 
              (click)="nextStep()" 
              type="button" 
              [disabled]="!isFormValid()"
              class="px-8 py-3.5 bg-[#2b6cee] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              Siguiente
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Helper -->
      <div class="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm">
        <span class="material-symbols-outlined text-[#2b6cee] flex-shrink-0 mt-0.5">info</span>
        <p>Asegúrese de seleccionar el ciclo correcto, ya que esto determinará las competencias disponibles en el siguiente paso.</p>
      </div>
    </div>
  `
})
export class Step1InstitutionalComponent {
  state = inject(StateService);

  isFormValid = computed(() => {
    const meta = this.state.evaluacion().meta_institucional;
    return meta.nombre_ie.length > 3 && meta.area !== '';
  });

  updateMeta(data: any) {
    this.state.updateMeta(data);
  }

  nextStep() {
    this.state.nextStep();
  }
}