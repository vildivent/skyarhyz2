import DatesField from "./DatesField";
import GroupNumberField from "./GroupNumberField";
import GroupSizeField from "./GroupSizeField";
import PhoneNumberField from "./PhoneNumberField";
import QueryField from "./QueryField";
import StatusField from "./StatusField";

export default function SearchFields() {
  return (
    <div className="-ml-3 flex flex-col">
      <StatusField />
      <QueryField />
      <GroupSizeField />
      <DatesField />
      <PhoneNumberField />
      <GroupNumberField />
    </div>
  );
}
