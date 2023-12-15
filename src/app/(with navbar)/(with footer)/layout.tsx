import Footer from "~/components/Footer";

export default function WithFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full flex-1 justify-center">{children}</div>
      <Footer />
    </>
  );
}
