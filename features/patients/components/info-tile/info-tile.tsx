interface InfoTileProps {
  label: string;
  value: string;
}

/**
 * Renders a labelled key-value tile used across the patient detail cards.
 */
export const InfoTile = ({ label, value }: InfoTileProps) => (
  <div className="rounded-none border border-border/70 bg-muted/55 p-4">
    <p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.18em]">
      {label}
    </p>
    <p className="mt-2 font-medium text-foreground text-sm leading-6">
      {value}
    </p>
  </div>
);
