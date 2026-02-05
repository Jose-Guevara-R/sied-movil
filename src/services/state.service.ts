import { Injectable, signal, effect } from '@angular/core';

export type AppStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Evaluacion {
  id: string;
  meta_institucional: {
    nombre_ie: string;
    area: string;
    grado: number;
    ciclo: 'VI' | 'VII';
  };
  contexto: {
    socioeconomico: string[];
    problematicas: string;
  };
  diseno_curricular: {
    competencias_seleccionadas: string[];
    estandar: string;
    situacion_significativa: string;
  };
  diseno_instruccional: {
    evidencias: string[];
    ficha_gamificada: {
      titulo_epico: string;
      historia_contexto: string;
      misiones: Array<{
        titulo: string;
        consigna: string;
        tipo_respuesta: 'texto' | 'dibujo' | 'cuadricula';
      }>;
    };
  };
  instrumento_evaluacion: Array<{
    criterio: string;
    nivel_inicio: string;
    nivel_proceso: string;
    nivel_logro: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  currentStep = signal<AppStep>(1);

  // Estado de la evaluación basado en el JSON Schema del informe
  evaluacion = signal<Evaluacion>({
    id: crypto.randomUUID(),
    meta_institucional: {
      nombre_ie: 'I.E. Innova Schools',
      area: 'cyt',
      grado: 2,
      ciclo: 'VI'
    },
    contexto: {
      socioeconomico: [],
      problematicas: ''
    },
    diseno_curricular: {
      competencias_seleccionadas: [],
      estandar: '',
      situacion_significativa: ''
    },
    diseno_instruccional: {
      evidencias: [],
      ficha_gamificada: {
        titulo_epico: '',
        historia_contexto: '',
        misiones: []
      }
    },
    instrumento_evaluacion: []
  });

  constructor() {
    // Cargar desde localStorage al iniciar
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sied_evaluacion');
      if (saved) {
        try {
          this.evaluacion.set(JSON.parse(saved));
        } catch (e) {
          console.error('Error cargando evaluación guardada', e);
        }
      }

      // Guardar automáticamente en localStorage cuando cambie el estado
      effect(() => {
        const state = this.evaluacion();
        localStorage.setItem('sied_evaluacion', JSON.stringify(state));
        this.syncWithCloud(state);
      });
    }
  }

  async syncWithCloud(state: Evaluacion) {
    try {
      await fetch('/api/save-evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
    } catch (e) {
      console.warn('Error de sincronización con la nube (posiblemente offline)', e);
    }
  }

  updateMeta(data: Partial<Evaluacion['meta_institucional']>) {
    this.evaluacion.update(curr => ({
      ...curr,
      meta_institucional: { ...curr.meta_institucional, ...data }
    }));
  }

  updateContexto(data: Partial<Evaluacion['contexto']>) {
    this.evaluacion.update(curr => ({
      ...curr,
      contexto: { ...curr.contexto, ...data }
    }));
  }

  updateCurricular(data: Partial<Evaluacion['diseno_curricular']>) {
    this.evaluacion.update(curr => ({
      ...curr,
      diseno_curricular: { ...curr.diseno_curricular, ...data }
    }));
  }

  toggleCompetencia(comp: string) {
    this.evaluacion.update(curr => {
      const selected = curr.diseno_curricular.competencias_seleccionadas;
      const index = selected.indexOf(comp);
      const newSelected = index === -1
        ? [...selected, comp]
        : selected.filter(c => c !== comp);

      return {
        ...curr,
        diseno_curricular: {
          ...curr.diseno_curricular,
          competencias_seleccionadas: newSelected
        }
      };
    });
  }

  toggleEvidence(evidence: string) {
    this.evaluacion.update(curr => {
      const selected = curr.diseno_instruccional.evidencias;
      const index = selected.indexOf(evidence);
      const newSelected = index === -1
        ? [...selected, evidence]
        : selected.filter(e => e !== evidence);

      return {
        ...curr,
        diseno_instruccional: {
          ...curr.diseno_instruccional,
          evidencias: newSelected
        }
      };
    });
  }

  updateFichaGamificada(data: Partial<Evaluacion['diseno_instruccional']['ficha_gamificada']>) {
    this.evaluacion.update(curr => ({
      ...curr,
      diseno_instruccional: {
        ...curr.diseno_instruccional,
        ficha_gamificada: { ...curr.diseno_instruccional.ficha_gamificada, ...data }
      }
    }));
  }

  setRubrica(rubrica: Evaluacion['instrumento_evaluacion']) {
    this.evaluacion.update(curr => ({
      ...curr,
      instrumento_evaluacion: rubrica
    }));
  }

  // Catálogo simplificado para el demo
  getCompetenciasPorArea() {
    const area = this.evaluacion().meta_institucional.area;
    if (area === 'cyt') {
      return [
        { id: 'CYT-C1', label: 'Indaga mediante métodos científicos', desc: 'Construye conocimientos sobre la base de métodos científicos.' },
        { id: 'CYT-C2', label: 'Explica el mundo físico', desc: 'Basado en conocimientos sobre seres vivos, materia y energía.' },
        { id: 'CYT-C3', label: 'Diseña y construye soluciones', desc: 'Tecnológicas para resolver problemas de su entorno.' }
      ];
    }
    return [
      { id: 'GEN-C1', label: 'Competencia Genérica 1', desc: 'Descripción de la competencia.' },
      { id: 'GEN-C2', label: 'Competencia Genérica 2', desc: 'Descripción de la competencia.' }
    ];
  }

  getEstandarActual() {
    const cycle = this.evaluacion().meta_institucional.ciclo;
    if (cycle === 'VI') {
      return "Indaga a partir de preguntas e hipótesis que son verificables de forma experimental o descriptiva con base en su conocimiento científico para explicar las causas o describir el fenómeno identificado.";
    } else {
      return "Indaga a partir de situaciones que presentan desafíos y formula preguntas o hipótesis sobre las causas de un fenómeno identificando las variables que intervienen.";
    }
  }

  toggleSocioeconomico(item: string) {
    this.evaluacion.update(curr => {
      const socio = curr.contexto.socioeconomico;
      const index = socio.indexOf(item);
      if (index === -1) {
        return { ...curr, contexto: { ...curr.contexto, socioeconomico: [...socio, item] } };
      } else {
        return { ...curr, contexto: { ...curr.contexto, socioeconomico: socio.filter(i => i !== item) } };
      }
    });
  }

  setStep(step: AppStep) {
    this.currentStep.set(step);
  }

  nextStep() {
    const current = this.currentStep();
    if (current < 8) {
      this.currentStep.set((current + 1) as AppStep);
    }
  }

  prevStep() {
    const current = this.currentStep();
    if (current > 1) {
      this.currentStep.set((current - 1) as AppStep);
    }
  }
}