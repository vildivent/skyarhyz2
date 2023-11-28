type FormErrorProps = {
  error?: string | null;
};
export default function FormError({ error }: FormErrorProps) {
  if (!error) return null;
  return <div className="ml-5 text-red-500">{error}</div>;
}
