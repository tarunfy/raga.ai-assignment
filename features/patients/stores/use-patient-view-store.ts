"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PatientView } from "@/features/patients/types";

interface PatientViewState {
  setView: (view: PatientView) => void;
  view: PatientView;
}

/**
 * Persists the preferred patient roster layout across refreshes.
 */
export const usePatientViewStore = create<PatientViewState>()(
  persist(
    (set) => ({
      setView: (view) => set({ view }),
      view: "grid",
    }),
    {
      name: "patient-view-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
