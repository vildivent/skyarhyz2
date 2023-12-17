import { cookies } from "next/headers";
import Image from "next/image";
import type { ReactNode } from "react";
import "../styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { alegrea, mulish } from "./fonts";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`flex min-h-[100dvh] overflow-x-hidden bg-darkgray font-p text-smoke ${mulish.variable} ${alegrea.variable}`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <BgLayout>{children}</BgLayout>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

const BgLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="fixed inset-0 z-0 opacity-30">
        <Image
          className="object-cover"
          src="/bg.jpg"
          alt="Фон"
          fill
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="z-10 flex flex-1 flex-col items-center">{children}</div>
      <div id="modal" />
    </>
  );
};
