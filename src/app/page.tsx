"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { Shell } from "@/components/shell";
import { ProductCard } from "@/components/product-card";
import { Loading, Failure, Empty } from "@/components/feedback";
import { api } from "@/lib/api";
import { productsSchema } from "@/lib/contracts";
import { track } from "@/components/telemetry";
import "./landing.css";

export default function Landing() {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => api("/products", productsSchema, { signal }),
  });
  return (
    <Shell>
      <section className="container landing-intro">
        <div>
          <p className="section-label">THE MICROSSERV52 DEMO STORE</p>
          <h1>
            A little browsing.
            <br />A lot of learning.
          </h1>
          <p className="intro-copy">
            Browse a real service-backed catalog, fill a demo cart, and see how
            an order comes together. All the experience, without a real
            purchase.
          </p>
          <Button
            href="/store/"
            variant="contained"
            size="large"
            onClick={() => track("demo_store_opened")}
          >
            Browse demo catalog
          </Button>
          <p className="muted intro-note">
            No payments. No shipping. Just a working demo.
          </p>
        </div>
        <aside className="intro-aside">
          <span className="aside-mark" aria-hidden="true">
            52
          </span>
          <div>
            <p className="section-label">BUILT TO BE UNDERSTOOD</p>
            <h2>
              One storefront.
              <br />
              Independent services.
            </h2>
            <p>
              Products, accounts and orders work together behind the scenes.
              Take a look around, then follow the request in the project
              documentation.
            </p>
            <a href="https://microsserv52.github.io/platform/">
              Read how the platform works
            </a>
          </div>
        </aside>
      </section>
      <section
        className="container catalog-preview"
        aria-labelledby="catalog-title"
      >
        <div className="section-heading">
          <div>
            <p className="section-label">FROM THE CATALOG</p>
            <h2 id="catalog-title">Take a closer look.</h2>
          </div>
          <a href="/store/">View all demo products</a>
        </div>
        {products.isPending ? (
          <Loading label="Loading catalog…" />
        ) : products.error ? (
          <Failure
            error={products.error}
            retry={() => void products.refetch()}
          />
        ) : !products.data.length ? (
          <Empty title="The catalog is waiting.">
            <p>Demo products will appear here when they are added.</p>
          </Empty>
        ) : (
          <div className="product-grid">
            {products.data.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <section className="container demo-explainer" id="demo-guide">
        <div>
          <p className="section-label">WHAT HAPPENS WHEN YOU ORDER?</p>
          <h2>
            A demo order.
            <br />A real request.
          </h2>
        </div>
        <div>
          <p>
            The cart stores your selected products on this device. When you sign
            in and create a demo order, the Order service looks up current
            product prices and saves your order for this account.
          </p>
          <p>
            <strong>No payment is taken. Nothing is shipped.</strong> There are
            no payment details or delivery addresses to enter. Use the
            experience to test the platform and inspect your own demo order
            history.
          </p>
          <Button variant="outlined" href="/store/register/">
            Create a demo account
          </Button>
        </div>
      </section>
    </Shell>
  );
}
