import Footer from "~/components/Footer";
import Navbar from "~/features/Navbar";
import PageContainer from "~/shared/ui/PageContainer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Navbar />
        <PageContainer>{children}</PageContainer>
      </div>
      <Footer />
    </>
  );
}
