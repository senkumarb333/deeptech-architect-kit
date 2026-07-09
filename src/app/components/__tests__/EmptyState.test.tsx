import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "@/app/components/EmptyState";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="No items" description="Nothing here yet." />);
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.getByText("Nothing here yet.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders primary action button", () => {
    render(<EmptyState title="X" action={{ label: "Create" }} />);
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
});
