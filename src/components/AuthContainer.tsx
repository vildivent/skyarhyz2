import Container from "~/shared/ui/Container";
import { LogoAuth } from "~/shared/ui/Logo";

type AuthContainerProps = {
  children: React.ReactNode;
  title: string;
};
export default function AuthContainer({ children, title }: AuthContainerProps) {
  return (
    <Container className="max-w-xl items-center sm:!px-10 sm:!py-10">
      <div className="flex flex-col gap-5">
        <LogoAuth />
        <h1 className="font-p text-2xl font-medium sm:text-3xl">{title}</h1>
        {children}
      </div>
    </Container>
  );
}
