import type { ReactNode } from "react";

interface PageHeaderProps {
  actions?: ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
}

/**
 * Renders a reusable page intro block with optional actions.
 *
 * @param actions - Optional action area aligned to the right on larger screens
 * @param description - Supporting page description
 * @param eyebrow - Optional small uppercase label above the title
 * @param title - Page heading
 */
export const PageHeader = ({
  actions,
  description,
  eyebrow,
  title,
}: PageHeaderProps) => (
  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div className="space-y-2">
      {eyebrow ? (
        <p className="font-semibold text-primary text-xs uppercase tracking-[0.24em]">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-2">
        <h1 className="font-heading font-semibold text-3xl text-foreground tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-muted-foreground text-sm leading-6 md:text-base">
          {description}
        </p>
      </div>
    </div>
    {actions ? <div className="shrink-0">{actions}</div> : null}
  </div>
);
