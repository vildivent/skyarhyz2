import Image, { type StaticImageData } from "next/image";
import User from "../shared/ui/Skeleton/User";

type UserAvatarProps = {
  src?: string | StaticImageData | null;
  alt?: string | null;
  size?: number | string;
};

export default function UserAvatar({
  src,
  alt = "user",
  size = "2.5rem",
}: UserAvatarProps) {
  if (!src) return <User />;
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{ height: size, width: size }}
    >
      <Image
        className="rounded-full"
        src={src}
        alt={alt ?? "user"}
        fill
        sizes={typeof size === "number" ? size + "px" : size}
        priority
      />
    </div>
  );
}
