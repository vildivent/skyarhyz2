import Container from "~/shared/ui/Container";
import { api } from "~/trpc/server";
import DatesInfo from "./components/DatesInfo";
import Form from "./components/Form";

export default async function OrderCreateForm() {
  const user = await api.user.forOrder.query();
  return (
    <Container className="max-w-[30rem]">
      <Form user={user} datesInfo={<DatesInfo />} />
    </Container>
  );
}
