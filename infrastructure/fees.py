#!/usr/bin/env python3
"""Compare EIP-1559 base fees under identical offered gas demand."""

import argparse
import csv
import sys


def next_base_fee(base_fee, used, target):
    if used > target:
        return base_fee + max(base_fee * (used - target) // target // 8, 1)
    return base_fee - base_fee * (target - used) // target // 8


def simulate(demand, target, initial_fee):
    backlog = 0
    base_fee = initial_fee
    for offered in demand:
        backlog += offered
        included = min(backlog, 2 * target)
        backlog -= included
        yield base_fee, included, backlog
        base_fee = next_base_fee(base_fee, included, target)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--baseline-target", type=int, required=True)
    parser.add_argument("--candidate-target", type=int, required=True)
    parser.add_argument("--initial-base-fee", type=int, default=1_000_000_000)
    parser.add_argument("demand", type=int, nargs="+", help="Offered gas per block")
    args = parser.parse_args()
    if min(args.baseline_target, args.candidate_target) <= 0:
        parser.error("Gas targets must be positive")
    if min(args.initial_base_fee, *args.demand) < 0:
        parser.error("Base fee and offered gas must be nonnegative")

    writer = csv.writer(sys.stdout)
    writer.writerow(["block", "scenario", "offered_gas", "included_gas",
                     "pending_gas", "base_fee_wei_per_gas"])
    for name, target in [("baseline", args.baseline_target),
                         ("candidate", args.candidate_target)]:
        results = simulate(args.demand, target, args.initial_base_fee)
        for block, (base_fee, included, backlog) in enumerate(results, start=1):
            writer.writerow([block, name, args.demand[block - 1], included,
                             backlog, base_fee])


if __name__ == "__main__":
    main()
