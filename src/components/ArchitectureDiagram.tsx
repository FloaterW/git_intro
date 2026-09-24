export default function ArchitectureDiagram({
  steps,
}: {
  steps: { label: string; detail: string; note?: string }[];
}) {
  return (
    <ol className="grid gap-6 md:auto-cols-fr md:grid-flow-col">
      {steps.map((step) => (
        <li
          key={step.label}
          className="relative flex after:absolute after:-bottom-5.5 after:left-1/2 after:-translate-x-1/2 after:text-accent after:content-['↓'] last:after:hidden md:after:top-1/2 md:after:-right-4.5 md:after:bottom-auto md:after:left-auto md:after:translate-x-0 md:after:-translate-y-1/2 md:after:content-['→']"
        >
          <div
            className={`flex w-full flex-col justify-center rounded-lg border bg-card px-3 py-3 text-center ${
              step.note ? "border-accent/60" : "border-line"
            }`}
          >
            {step.note && <p className="mb-1 text-xs font-medium text-accent">{step.note}</p>}
            <p className="text-small font-medium">{step.label}</p>
            <p className="mt-0.5 text-sm text-muted">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
