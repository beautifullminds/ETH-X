#!/usr/bin/env bash
set -euo pipefail
: "${ETH_MAINNET_RPC_URL:?Set a trusted Ethereum archive RPC URL}"
: "${ETH_FORK_BLOCK:?Set a finalized Ethereum mainnet block number}"
: "${ETH_FORK_HASH:?Set the independently verified block hash}"
[[ "$ETH_FORK_BLOCK" =~ ^[0-9]+$ && "$ETH_FORK_HASH" =~ ^0x[0-9a-fA-F]{64}$ ]]
[[ "$(cast chain-id --rpc-url "$ETH_MAINNET_RPC_URL")" == 1 ]]
actual_hash=$(cast block "$ETH_FORK_BLOCK" --field hash --rpc-url "$ETH_MAINNET_RPC_URL")
[[ "${actual_hash,,}" == "${ETH_FORK_HASH,,}" ]] || {
  echo "Mainnet checkpoint hash mismatch" >&2
  exit 1
}
exec anvil --host 127.0.0.1 --port 8545 --chain-id 54379811 \
  --fork-url "$ETH_MAINNET_RPC_URL" --fork-block-number "$ETH_FORK_BLOCK"
