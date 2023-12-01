import PageHeading from "~/shared/ui/PageHeading";
import authCheck from "~/shared/utils/authCheck";

export const metadata = {
  title: "Мои отзывы | SkyArhyz",
  description: "Мои отзывы",
};

export default async function MyReviews() {
  await authCheck("/my-reviews");
  return <PageHeading>Мои отзывы</PageHeading>;
}
