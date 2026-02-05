import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService, AppStep } from '../services/state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="w-72 h-full flex flex-col border-r border-slate-800 bg-[#111318] z-20 transition-all duration-300">
      <!-- Header -->
      <div class="h-20 flex items-center px-6 border-b border-slate-800/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2b6cee] to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <span class="material-symbols-outlined text-2xl">school</span>
          </div>
          <div class="flex flex-col">
            <h1 class="text-lg font-bold leading-none tracking-tight text-white">SIED-Móvil</h1>
            <span class="text-xs text-slate-400 font-medium mt-1">Diseño de Evaluación</span>
          </div>
        </div>
      </div>

      <!-- Navigation List -->
      <div class="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        @for (item of steps; track item.id) {
          <div 
            (click)="selectStep(item.id)"
            class="group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden"
            [ngClass]="{
              'bg-[#2b6cee] shadow-md shadow-blue-500/20 text-white': isActive(item.id),
              'text-slate-500 hover:bg-slate-800': !isActive(item.id)
            }"
          >
            <!-- Connector Line (Visual only, hidden on last item) -->
            @if (item.id !== 8) {
              <div class="absolute left-[1.65rem] top-10 bottom-[-20px] w-[2px] border-l border-dashed border-slate-700 -z-10 group-hover:border-slate-600"></div>
            }

            <div 
              class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              [ngClass]="{
                'bg-white-20 text-white': isActive(item.id),
                'bg-[#0f172a]': !isActive(item.id)
              }"
            >
              <span class="material-symbols-outlined text-[20px]" [class.filled-icon]="isActive(item.id)">
                {{ item.icon }}
              </span>
            </div>
            
            <div class="flex flex-col">
              <span class="text-[10px] uppercase tracking-wider font-semibold opacity-70">Paso {{item.id}}</span>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </div>

            @if (isActive(item.id)) {
              <span class="ml-auto material-symbols-outlined text-white/80 text-sm">arrow_forward_ios</span>
            }
          </div>
          
          <!-- Spacing between items for connector line visibility -->
          @if (item.id !== 8) {
             <div class="h-2 ml-[1.65rem] border-l-2 border-dashed border-slate-800/50"></div>
          }
        }
      </div>

      <!-- User Footer -->
      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
          <div class="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex-shrink-0">
             <img src="https://i.pravatar.cc/150?u=juandocente" alt="User" class="w-full h-full object-cover opacity-80" />
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="text-sm font-semibold text-white truncate">Juan Docente</span>
            <span class="text-xs text-slate-400 truncate">I.E. 2025 • Plan Pro</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .bg-white-20 { background-color: rgba(255,255,255,0.2); }
    .filled-icon { font-variation-settings: 'FILL' 1; }
  `]
})
export class SidebarComponent {
  state = inject(StateService);

  steps: { id: AppStep, label: string, icon: string }[] = [
    { id: 1, label: 'Datos Institucionales', icon: 'domain' },
    { id: 2, label: 'Contexto', icon: 'location_on' },
    { id: 3, label: 'Competencias', icon: 'workspace_premium' },
    { id: 4, label: 'Diseño de Situación', icon: 'psychology' }, // Combined steps for brevity in demo
    { id: 5, label: 'Evidencias', icon: 'folder_open' },
    { id: 6, label: 'Gamificación', icon: 'sports_esports' },
    { id: 7, label: 'Instrumentos', icon: 'design_services' },
    { id: 8, label: 'Resultados', icon: 'analytics' },
  ];

  isActive(id: number): boolean {
    return this.state.currentStep() === id;
  }

  selectStep(id: AppStep) {
    this.state.setStep(id);
  }
}