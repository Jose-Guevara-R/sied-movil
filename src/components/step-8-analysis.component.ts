import { Component, inject, computed } from '@angular/core';
import { StateService } from '../services/state.service';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-step-8',
   standalone: true,
   imports: [CommonModule],
   template: `
    <div class="max-w-[1400px] mx-auto flex flex-col gap-8 py-8 px-4 animate-fade-in-up">
       <!-- Header -->
       <div class="flex justify-between items-start mb-4 border-b border-white/5 pb-6">
          <div class="max-w-2xl">
             <h1 class="text-4xl font-black text-white tracking-tight mb-2">Finalización y Análisis</h1>
             <p class="text-slate-400">Revisa el diseño completo de tu evaluación diagnóstica y genera los entregables.</p>
          </div>
          <div class="flex gap-4">
             <button 
               (click)="exportToWord()"
               class="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2b6cee] hover:bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-95"
             >
                <span class="material-symbols-outlined">download</span> 
                Exportar Todo a Word (.doc)
             </button>
          </div>
       </div>

       <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left: Summary Stats & Matrix -->
          <div class="lg:col-span-2 space-y-6">
             <div class="bg-[#1c2333] rounded-2xl border border-white/5 p-6 shadow-xl">
                <h3 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#2b6cee]">analytics</span>
                  Matriz de Resultados (Simulación)
                </h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                       <thead class="bg-[#151a25] text-slate-400 font-bold uppercase text-xs">
                          <tr>
                             <th class="p-4 border-b border-[#2d3648]">Estudiante</th>
                             <th class="p-4 border-b border-[#2d3648]">Reto 1</th>
                             <th class="p-4 border-b border-[#2d3648]">Reto 2</th>
                             <th class="p-4 border-b border-[#2d3648]">Global</th>
                          </tr>
                       </thead>
                       <tbody class="divide-y divide-[#2d3648] text-white">
                          <tr class="hover:bg-white/5 transition-colors">
                             <td class="p-4 font-medium">Maria Alvarez</td>
                             <td class="p-4"><span class="px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20 font-bold">AD</span></td>
                             <td class="p-4"><span class="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold">A</span></td>
                             <td class="p-4 font-bold text-blue-400">AD/A</td>
                          </tr>
                          <tr class="hover:bg-white/5 transition-colors">
                             <td class="p-4 font-medium">Juan Benitez</td>
                             <td class="p-4"><span class="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 font-bold">B</span></td>
                             <td class="p-4"><span class="px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/20 font-bold">C</span></td>
                             <td class="p-4 font-bold text-yellow-400">B/C</td>
                          </tr>
                       </tbody>
                    </table>
                </div>
             </div>

             <div class="bg-gradient-to-br from-[#1c2333] to-[#111827] rounded-2xl border border-[#2b6cee]/20 p-6 relative overflow-hidden group">
                <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-[#2b6cee]/10 rounded-full blur-3xl"></div>
                <h3 class="text-lg font-bold text-white mb-4">Análisis Pedagógico (IA)</h3>
                <p class="text-slate-300 leading-relaxed mb-6 italic">
                   "Se observa que un 65% de los estudiantes muestra dificultades en la competencia de indagación, específicamente en la formulación de hipótesis. Se recomienda reforzar el pensamiento crítico mediante experimentos simples antes de la evaluación final."
                </p>
                <div class="flex gap-2">
                   <span class="px-3 py-1 rounded-full bg-[#2b6cee]/10 text-[#2b6cee] text-xs font-bold border border-[#2b6cee]/20 uppercase">Fortaleza: Compromiso</span>
                   <span class="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20 uppercase">Oportunidad: Análisis</span>
                </div>
             </div>
          </div>

          <!-- Right: Report Health -->
          <div class="space-y-6">
             <div class="bg-[#1c2333] rounded-2xl border border-white/5 p-6 shadow-xl">
                <h3 class="text-lg font-bold text-white mb-6">Estado del Reporte</h3>
                <div class="space-y-6">
                   <div class="flex flex-col gap-2">
                      <div class="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                         <span>Avance del Diseño</span>
                         <span class="text-[#2b6cee]">100%</span>
                      </div>
                      <div class="h-2 w-full bg-[#111827] rounded-full overflow-hidden">
                         <div class="h-full bg-[#2b6cee]" style="width: 100%"></div>
                      </div>
                   </div>

                   <div class="grid grid-cols-2 gap-3 text-sm">
                      <div class="bg-[#111827] p-4 rounded-xl border border-white/5">
                         <p class="text-slate-500 mb-1">Competencias</p>
                         <p class="text-2xl font-black text-white">{{ state.evaluacion().diseno_curricular.competencias_seleccionadas.length }}</p>
                      </div>
                      <div class="bg-[#111827] p-4 rounded-xl border border-white/5">
                         <p class="text-slate-500 mb-1">Misiones</p>
                         <p class="text-2xl font-black text-white">{{ state.evaluacion().diseno_instruccional.ficha_gamificada.misiones.length }}</p>
                      </div>
                   </div>
                </div>
             </div>

             <div class="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                <div class="flex gap-3 items-start">
                   <span class="material-symbols-outlined text-amber-500">warning</span>
                   <div>
                      <h4 class="font-bold text-amber-500 mb-1 text-sm">Nota de Exportación</h4>
                      <p class="text-xs text-amber-200/70 leading-relaxed">
                         Al exportar a Word, el archivo incluirá tanto la <b>Ficha del Estudiante</b> como el <b>Instrumento de Evaluación</b> en páginas separadas.
                      </p>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <!-- Footer -->
       <div class="flex justify-between items-center py-6 border-t border-white/5">
          <button (click)="state.prevStep()" class="text-slate-400 hover:text-white font-bold flex items-center gap-2">
             <span class="material-symbols-outlined">arrow_back</span> Atrás
          </button>
          <div class="flex items-center gap-3 text-slate-500 text-sm italic">
             <span class="material-symbols-outlined text-[16px]">cloud_done</span> 
             Última sincronización: {{ lastSyncTime }}
          </div>
       </div>
    </div>
  `
})
export class Step8AnalysisComponent {
   state = inject(StateService);

   get lastSyncTime(): string {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   }

   exportToWord() {
      const evalData = this.state.evaluacion();

      // Header for the document
      const hie = evalData.meta_institucional;
      const situation = evalData.diseno_curricular.situacion_significativa;
      const gamification = evalData.diseno_instruccional.ficha_gamificada;
      const rubric = evalData.instrumento_evaluacion;

      let html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Sied Report</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; }
          .header { text-align: center; border-bottom: 2px solid #2b6cee; padding-bottom: 10px; margin-bottom: 20px; }
          .title { font-size: 24pt; font-weight: bold; color: #2b6cee; margin: 10pt 0; }
          .section-title { font-size: 16pt; font-weight: bold; background: #f0f4ff; padding: 5pt; border-left: 5pt solid #2b6cee; margin: 15pt 0; }
          table { width: 100%; border-collapse: collapse; margin: 10pt 0; }
          th, td { border: 1px solid #ddd; padding: 8pt; text-align: left; vertical-align: top; }
          th { background-color: #f7f7f7; font-weight: bold; }
          .mission-card { border: 1px solid #eee; padding: 10pt; margin: 10pt 0; background: #fafafa; }
          .mission-title { font-weight: bold; font-size: 14pt; color: #1337ec; }
          .footer { font-size: 9pt; color: #888; text-align: center; border-top: 1px solid #ddd; margin-top: 50pt; padding-top: 10pt; }
        </style>
      </head>
      <body>
        <div class="header">
          <p>MODALIDAD: Secundaria | ÁREA: ${hie.area.toUpperCase()} | GRADO: ${hie.grado}° | CICLO: ${hie.ciclo}</p>
          <h1 class="title">I.E. ${hie.nombre_ie}</h1>
        </div>

        <div class="section-title">1. SITUACIÓN SIGNIFICATIVA</div>
        <p>${situation}</p>

        <br clear=all style='page-break-before:always'>

        <div class="header" style="border-color: #1337ec;">
          <h1 class="title" style="color: #1337ec;">FICHA DEL ESTUDIANTE</h1>
          <h2 style="margin:0; color: #d00;">OPERACIÓN: ${gamification.titulo_epico}</h2>
        </div>

        <div class="section-title" style="border-color: #1337ec; background: #edf0ff;">CONTEXTO DE LA MISIÓN</div>
        <p><i>"${gamification.historia_contexto}"</i></p>

        <div class="section-title" style="border-color: #1337ec; background: #edf0ff;">TUS RETOS</div>
        ${gamification.misiones.map((m: any, i: number) => `
          <div class="mission-card">
            <span class="mission-title">RETO ${i + 1}: ${m.titulo}</span>
            <p>${m.consigna}</p>
            <div style="height: 100pt; border: 1px dashed #ccc; background: white; margin-top: 10pt; text-align: center; color: #ccc; padding-top: 40pt;">
               ${m.tipo_respuesta === 'dibujo' ? '[ ESPACIO PARA DIBUJOS ]' : m.tipo_respuesta === 'cuadricula' ? '[ ESPACIO PARA CÁLCULOS / CUADRÍCULA ]' : '[ ESPACIO PARA RESPUESTA ESCRITA ]'}
            </div>
          </div>
        `).join('')}

        <br clear=all style='page-break-before:always'>

        <div class="section-title">INSTRUMENTO DE EVALUACIÓN (RÚBRICA)</div>
        <table>
          <thead>
            <tr>
              <th style="width: 25%">Criterio</th>
              <th style="width: 25%">Inicio (C)</th>
              <th style="width: 25%">Proceso (B)</th>
              <th style="width: 25%">Logro (A/AD)</th>
            </tr>
          </thead>
          <tbody>
            ${rubric.map((r: any) => `
              <tr>
                <td><b>${r.criterio}</b></td>
                <td>${r.nivel_inicio}</td>
                <td>${r.nivel_proceso}</td>
                <td>${r.nivel_logro}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          Generado automáticamente por SIED-Móvil // 2026 Ministerio de Educación (Simulación)
        </div>
      </body>
      </html>
    `;

      const blob = new Blob(['\ufeff', html], {
         type: 'application/msword'
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `SIED_Evaluacion_${hie.nombre_ie.replace(/\s/g, '_')}_${hie.area}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   }
}