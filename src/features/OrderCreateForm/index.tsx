import Container from "~/shared/ui/Container";
import { api } from "~/trpc/server";
import DatesInfo from "./components/DatesInfo";
import Form from "./components/Form";
import Success from "./components/Success";

export default async function OrderCreateForm() {
  const user = await api.user.forOrder.query();
  return (
    <Container className="w-full max-w-[33rem]">
      <Form user={user} datesInfo={<DatesInfo />} success={<Success />} />
    </Container>
  );
}
