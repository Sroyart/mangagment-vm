"use client";

import Button from "@/app/components/Button";
// import createVm from "@/lib/utils/createVm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button type="button" onClick={() => console.log("test")}>
          Create VM
        </Button>
      </div>
    </main>
  );
}
