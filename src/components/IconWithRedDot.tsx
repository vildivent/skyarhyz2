import RedDot from "~/shared/ui/RedDot";

export default function IconWithRedDot({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="relative">
      {icon}
      <RedDot className="absolute -right-2 -top-1" />
    </div>
  );
}
