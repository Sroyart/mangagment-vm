"use client";

import Button from "@/app/components/Button";

export default function Home() {
  const handleClick = async () => {
    await fetch("http://localhost:8081/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button type="button" onClick={handleClick}>
          Create VM
        </Button>
      </div>
    </main>
  );
}
