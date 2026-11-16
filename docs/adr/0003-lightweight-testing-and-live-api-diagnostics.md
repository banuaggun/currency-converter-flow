# 3. Lightweight Unit & Live API Integration Diagnostics

## Date

2026-11-16

## Status

Accepted

## Context

Financial calculation tools require strict mathematical accuracy and reliable external API connectivity. While heavy testing frameworks (such as Jest or Vitest with full DOM environments) add configuration and dependency overhead for a lightweight client-side application, leaving core calculation logic and third-party API health unverified creates silent failure risks.

## Decision

We decided to implement a zero-dependency, custom diagnostic test suite (`src/utils/math.test.ts`) covering both deterministic unit tests and live API integration checks.

The key motivations behind this decision are:

1. **Core Math Verification:** Isolating and validating currency conversion logic (`calculateResult`) against edge cases such as zero-amount inputs and decimal precision.
2. **Live API Health Checks:** Implementing an asynchronous integration test (`runLiveApiIntegrationTest`) that dynamically queries the Frankfurter v2 API across randomized currency bases to verify endpoint availability and response payload structure.
3. **Zero Configuration Overhead:** Keeping test execution fast, transparent, and directly runnable within the TypeScript runtime without bloating the project dependencies.

## Consequences

- Core financial calculations and external API contract stability can be verified on demand without external test runner setup.
- Potential API schema changes or network failures are caught early with clear, structured diagnostic logs.
