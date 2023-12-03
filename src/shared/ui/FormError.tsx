type FormErrorProps = {
  error?: string | null;
  iconMargin?: boolean;
};
export default function FormError({
  error,
  iconMargin = false,
}: FormErrorProps) {
  if (!error) return null;
  return (
    <div className={`text-red-500 ${iconMargin ? "ml-16" : "ml-5"}`}>
      {error}
    </div>
  );
}
