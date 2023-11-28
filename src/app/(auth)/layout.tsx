import PageContainer from "~/shared/ui/PageContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="min-h-[100lvh] justify-center">
      {children}
    </PageContainer>
  );
}
