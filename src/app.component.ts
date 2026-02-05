import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar.component';
import { StateService } from './services/state.service';
import { Step1InstitutionalComponent } from './components/step-1-institutional.component';
import { Step2ContextComponent } from './components/step-2-context.component';
import { Step3CurriculumComponent } from './components/step-3-curriculum.component';
import { Step4SituationComponent } from './components/step-4-situation.component';
import { Step5EvidenceComponent } from './components/step-5-evidence.component';
import { Step6GamificationComponent } from './components/step-6-gamification.component';
import { Step7RubricComponent } from './components/step-7-rubric.component';
import { Step8AnalysisComponent } from './components/step-8-analysis.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarComponent,
    Step1InstitutionalComponent,
    Step2ContextComponent,
    Step3CurriculumComponent,
    Step4SituationComponent,
    Step5EvidenceComponent,
    Step6GamificationComponent,
    Step7RubricComponent,
    Step8AnalysisComponent
  ],
  template: `
    <div class="flex h-screen overflow-hidden bg-[#0f172a] text-slate-200">
      <!-- Sidebar -->
      <app-sidebar class="hidden md:block flex-shrink-0"></app-sidebar>
      
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto relative scroll-smooth">
        <!-- Background Decor -->
        <div class="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
           <div class="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen"></div>
           <div class="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div class="relative z-10 p-4 md:p-8 h-full flex flex-col">
           <!-- Mobile Header (Hidden on Desktop) -->
           <div class="md:hidden flex items-center gap-3 mb-6 p-4 bg-[#111318] rounded-xl border border-slate-800">
             <span class="material-symbols-outlined text-[#2b6cee]">school</span>
             <h1 class="font-bold text-white">SIED-Móvil</h1>
           </div>

           @switch (state.currentStep()) {
             @case (1) { <app-step-1 /> }
             @case (2) { <app-step-2 /> }
             @case (3) { <app-step-3 /> }
             @case (4) { <app-step-4 /> }
             @case (5) { <app-step-5 /> }
             @case (6) { <app-step-6 /> }
             @case (7) { <app-step-7 /> }
             @case (8) { <app-step-8 /> }
           }
        </div>
      </main>
    </div>
  `
})
export class AppComponent {
  state = inject(StateService);
}