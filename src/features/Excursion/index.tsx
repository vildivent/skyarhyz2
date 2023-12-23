import type { Excursion } from "~/trpc/shared";
import GroupsContent from "./components/GroupsContent";
import Animation from "./components/Animation";

export default function Excursion({ excursion }: { excursion: Excursion }) {
  return (
    <Animation>
      <GroupsContent excursionGroups={excursion?.excursionGroups} />
    </Animation>
  );
}
