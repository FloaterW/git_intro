export default function ArchitectureDiagram({
  steps,
}: {
  steps: { label: string; detail: string }[];
}) {
  return (
    <ol className="flex flex-col items-stretch md:flex-row md:items-center">
      {steps.map((step, i) => (
        <li key={step.label} className="flex flex-col items-center md:flex-1 md:flex-row">
          <div className="w-full rounded-lg border border-line bg-card px-3 py-3 text-center">
            <p className="text-small font-medium">{step.label}</p>
            <p className="mt-0.5 text-sm text-muted">{step.detail}</p>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="px-2 py-1 text-accent">
              <span className="md:hidden">&darr;</span>
              <span className="hidden md:inline">&rarr;</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
