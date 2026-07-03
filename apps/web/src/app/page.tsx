"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

interface HealthResponse {
  status: string;
  timestamp: string;
}

export default function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<HealthResponse>("/health")
      .then(setHealth)
      .catch((err) => setError(err.message));
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">Marketplace platform</h1>

      {health && (
        <p className="text-green-600">
              Welcome! Connected to API — status: {health.status} (checked at{" "}
          {new Date(health.timestamp).toLocaleTimeString()})
        </p>
      )}

      {error && (
        <p className="text-red-600">
          ❌ Could not reach the API. Is it running? ({error})
        </p>
      )}

      {!health && !error && <p>Checking connection to API…</p>}
    </main>
  );
}
