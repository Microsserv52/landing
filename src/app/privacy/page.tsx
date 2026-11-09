"use client";
import { useState } from "react";
import { Button, Alert } from "@mui/material";
import { Shell } from "@/components/shell";
export default function Privacy() {
  const [disabled, setDisabled] = useState(false);
  return (
    <Shell>
      <article className="container narrow">
        <p className="section-label">PRIVACY & DIAGNOSTICS</p>
        <h1>Your demo data.</h1>
        <p>
          The cart stores only selected product IDs and quantities on this
          device. The API uses an HttpOnly session cookie to keep you signed in.
          Demo orders are saved to your account.
        </p>
        <h2>Optional telemetry</h2>
        <p>
          Grafana Faro and Umami are integrated for diagnostics and usage
          events. Collection is disabled until deployment endpoints and the
          collection policy are configured. Admin usage analytics are excluded.
          No payment details are collected, because this store has no real
          transactions.
        </p>
        <p>
          Use fictitious details for demo accounts. Avoid entering personal
          information that is unnecessary for testing.
        </p>
        {disabled ? (
          <Alert severity="success">
            Optional analytics are disabled on this browser. Reload the page to
            stop any active collector.
          </Alert>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.setItem("ms52-analytics", "off");
              setDisabled(true);
            }}
          >
            Disable optional analytics on this browser
          </Button>
        )}
        <p>
          For project ownership and data handling questions, see the{" "}
          <a href="https://github.com/Microsserv52">source organization</a>.
        </p>
      </article>
    </Shell>
  );
}
