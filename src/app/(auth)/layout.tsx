import PageContainer from "~/shared/ui/PageContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="flex-1 justify-center">{children}</PageContainer>
  );
}
