import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font  = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex flex-col h-full items-center justify-center bg-anime bg-cover">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
           🔐Auth 
        </h1>
        <p className="text-white">
          A simple authentication template
        </p>
      </div>
    </main>
  );
}
