import CopyButton from "@/components/CopyButton";

export default function CopyEmail({ email }: { email: string }) {
  return (
    <CopyButton
      text={email}
      label="Copy email"
      what="Email address"
      className="inline-flex items-center rounded-md border border-line px-3.5 py-2 text-small font-medium sm:px-4"
    />
  );
}
