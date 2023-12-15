import PageContainer from "~/shared/ui/PageContainer";

export default function WithContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageContainer>{children}</PageContainer>;
}
