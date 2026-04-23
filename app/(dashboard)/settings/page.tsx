"use client";

import { SUPPORTED_REGIONS } from "@/lib/constants";
import { getLegalDisclaimer } from "@/lib/globalization";
import { useUiStore } from "@/store/ui-store";

export default function SettingsPage() {
  const { isHighContrast, toggleHighContrast } = useUiStore();
  const selectedRegion = SUPPORTED_REGIONS[0].code;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-600">
          Configure accessibility, region profile, and legal disclosure preferences.
        </p>
      </header>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">Accessibility</h2>
        <label className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm">
          High contrast mode
          <input type="checkbox" checked={isHighContrast} onChange={toggleHighContrast} />
        </label>
      </section>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">Regional legal notice</h2>
        <p className="text-sm text-slate-600">{getLegalDisclaimer(selectedRegion)}</p>
      </section>
    </div>
  );
}
