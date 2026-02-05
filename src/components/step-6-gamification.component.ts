import { Component, inject, signal } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-step-6',
   standalone: true,
   imports: [CommonModule],
   template: `
    <div class="max-w-[1200px] mx-auto px-4 py-8 animate-fade-in-up">
       <div class="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div class="max-w-2xl">
             <h1 class="text-4xl font-black text-white tracking-tight mb-2">Ficha de Estudiante (Gamificada)</h1>
             <p class="text-slate-400">Transforma el diseño técnico en una experiencia motivadora. La IA actuará como "Diseñadora de Juegos".</p>
          </div>
          <div class="flex gap-3">
            <button 
              (click)="generateGamification()"
              [disabled]="isLoading()"
              class="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1337ec] hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/20 disabled:opacity-50"
            >
               <span class="material-symbols-outlined">{{ isLoading() ? 'sync' : 'auto_awesome' }}</span>
               {{ isLoading() ? 'Gamificando...' : 'Generar con IA' }}
            </button>
            <button class="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#2d3142] text-slate-300 hover:bg-white/5 font-bold">
               <span class="material-symbols-outlined">description</span> Exportar .DOCX
            </button>
          </div>
       </div>

       <!-- Dossier Placeholder when no data -->
       <div *ngIf="!state.evaluacion().diseno_instruccional.ficha_gamificada.titulo_epico && !isLoading()" 
            class="bg-[#1a1d2d] border border-dashed border-[#2d3142] rounded-xl p-20 text-center">
            <span class="material-symbols-outlined text-6xl text-[#2d3142] mb-4">sports_esports</span>
            <h2 class="text-xl font-bold text-slate-400">Presiona "Generar con IA" para crear la misión</h2>
       </div>

       <!-- Loading State -->
       <div *ngIf="isLoading()" class="bg-[#1a1d2d] border border-[#2d3142] rounded-xl p-20 text-center animate-pulse">
            <span class="material-symbols-outlined text-6xl text-[#1337ec] mb-4 spin">hourglass_empty</span>
            <h2 class="text-xl font-bold text-white">La IA está diseñando la narrativa épica...</h2>
       </div>

       <!-- Dossier -->
       <div *ngIf="state.evaluacion().diseno_instruccional.ficha_gamificada.titulo_epico && !isLoading()" 
            class="relative bg-[#1a1d2d] border border-[#2d3142] rounded-xl shadow-2xl overflow-hidden">
          <div class="h-2 w-full bg-gradient-to-r from-[#1337ec] via-blue-400 to-[#1337ec]"></div>
          <div class="p-10">
             <!-- Header -->
             <div class="flex flex-col md:flex-row justify-between items-start border-b border-dashed border-[#2d3142] pb-8 mb-8 gap-6">
                <div>
                   <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 text-red-500 text-xs font-bold tracking-wider mb-4 border border-red-500/20">
                      <span class="material-symbols-outlined text-[14px]">lock</span> CONFIDENCIAL // NIVEL 5
                   </div>
                   <h2 class="text-5xl font-black text-white uppercase tracking-tighter mb-2">OPERACIÓN: {{ state.evaluacion().diseno_instruccional.ficha_gamificada.titulo_epico }}</h2>
                   <div class="flex items-center gap-2 text-slate-400 text-sm font-mono">
                      <span>REF: {{ state.evaluacion().meta_institucional.area | uppercase }}-{{ state.evaluacion().meta_institucional.grado }}-2026</span> • <span>SECTOR  Peru-Edu</span>
                   </div>
                </div>
                <div class="w-24 h-24 rounded-lg bg-[#12141f] border border-[#2d3142] flex items-center justify-center">
                   <span class="material-symbols-outlined text-5xl text-[#3b3f54]">security</span>
                </div>
             </div>

             <!-- Context -->
             <div class="mb-10">
                <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Contexto de la Misión</h3>
                <div class="relative bg-[#12141f] rounded-lg p-6 border-l-4 border-[#1337ec]">
                   <span class="material-symbols-outlined absolute top-4 right-4 text-[#2d3142] text-4xl">format_quote</span>
                   <p class="text-slate-200 text-lg leading-relaxed relative z-10 font-medium italic">
                      [TRANSMISIÓN ENTRANTE] {{ state.evaluacion().diseno_instruccional.ficha_gamificada.historia_contexto }}
                   </p>
                </div>
             </div>

             <!-- Grid -->
             <div>
                <div class="flex justify-between items-center mb-4">
                   <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest">Objetivos Activos</h3>
                   <span class="text-xs font-mono text-[#1337ec] bg-[#1337ec]/10 px-2 py-1 rounded">TOTAL XP: 1000</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                   @for (mision of state.evaluacion().diseno_instruccional.ficha_gamificada.misiones; track $index) {
                     <div class="flex gap-4 p-4 rounded-lg bg-[#222536] border border-[#2d3142] hover:border-[#1337ec]/50 transition-colors group">
                        <div class="w-12 h-12 rounded flex items-center justify-center border transition-all"
                             [ngClass]="mision.tipo_respuesta === 'dibujo' ? 'bg-amber-500/20 text-amber-400 border-amber-500/20 group-hover:bg-amber-500' : 
                                       mision.tipo_respuesta === 'cuadricula' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500' : 
                                       'bg-indigo-500/20 text-indigo-400 border-indigo-500/20 group-hover:bg-indigo-500'">
                           <span class="material-symbols-outlined text-2xl group-hover:text-white">
                             {{ mision.tipo_respuesta === 'dibujo' ? 'brush' : mision.tipo_respuesta === 'cuadricula' ? 'border_all' : 'description' }}
                           </span>
                        </div>
                        <div class="flex-1">
                           <div class="flex justify-between mb-1">
                              <h4 class="font-bold text-white text-lg">{{ mision.titulo }}</h4>
                              <span class="px-2 py-0.5 rounded text-xs font-bold bg-[#1337ec] text-white">RETO</span>
                           </div>
                           <p class="text-sm text-slate-400">{{ mision.consigna }}</p>
                        </div>
                     </div>
                   }
                </div>
             </div>
          </div>
          <!-- Footer bar -->
          <div class="h-10 bg-[#12141f] border-t border-[#2d3142] flex items-center justify-between px-6">
             <span class="text-[10px] uppercase font-mono text-slate-400">Estado del Sistema: Online // Encriptado AES-256</span>
             <div class="flex gap-1">
                <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <div class="w-2 h-2 rounded-full bg-slate-700"></div>
                <div class="w-2 h-2 rounded-full bg-slate-700"></div>
             </div>
          </div>
       </div>

       <div class="flex justify-between items-center mt-8">
         <button (click)="state.prevStep()" class="flex items-center gap-2 text-slate-400 hover:text-white font-medium">
             <span class="material-symbols-outlined">arrow_back</span> Atrás al Diseño
         </button>
         <button (click)="state.nextStep()" class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1337ec] text-white font-bold hover:bg-blue-600">
             Continuar a Instrumento <span class="material-symbols-outlined">arrow_forward</span>
         </button>
       </div>
    </div>

    <style>
      .spin { animation: spin 2s linear infinite; }
      @keyframes spin { 100% { transform:rotate(360deg); } }
    </style>
  `
})
export class Step6GamificationComponent {
   state = inject(StateService);
   isLoading = signal(false);

   async generateGamification() {
      this.isLoading.set(true);
      try {
         const resp = await fetch('/api/generate-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               step: 7,
               context: this.state.evaluacion()
            })
         });
         const data = await resp.json();
         if (data && data.titulo_epico) {
            this.state.updateFichaGamificada(data);
         }
      } catch (e) {
         console.error('Error gamificando ficha', e);
      } finally {
         this.isLoading.set(false);
      }
   }
}