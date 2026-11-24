# ETH-X network infrastructure

The root README describes the Next.js frontend, wallet connectivity and Ethereum integration, with a testnet on the roadmap. This directory adds isolated network tooling. The correct repository owner is `beautifullminds`.

| Environment | Purpose | Entry point |
| --- | --- | --- |
| Mainnet-state rehearsal | Read and exercise Ethereum contract state at a pinned block | `infrastructure/rehearse.sh` |
| Fresh proof-of-stake devnet | Run execution and consensus clients together | `infrastructure/devnet.yaml` |
| Fee experiment | Compare capacity settings against identical demand | `infrastructure/fees.py` |
| ETH-X public fork | Continue Ethereum history under independently activated rules | Protocol development required |

## Rehearse against Ethereum state

Install Foundry with Anvil and Cast. Select a finalized Ethereum mainnet block and obtain its hash from an independent provider. Run from the repository root.

```bash
read -rsp "Trusted Ethereum archive RPC URL: " ETH_MAINNET_RPC_URL
echo
read -rp "Finalized Ethereum block number: " ETH_FORK_BLOCK
read -rp "Independently verified block hash: " ETH_FORK_HASH
export ETH_MAINNET_RPC_URL ETH_FORK_BLOCK ETH_FORK_HASH
bash infrastructure/rehearse.sh
```

In another terminal:

```bash
cast chain-id --rpc-url http://127.0.0.1:8545  # expected 54379811
cast block "$ETH_FORK_BLOCK" --field hash --rpc-url http://127.0.0.1:8545
cast block-number --rpc-url http://127.0.0.1:8545
```

Set ETH_FORK_BLOCK in that terminal to the same block number. Compare the response with the independently verified hash. Connect wallets only with disposable accounts. Anvil uses known development keys and reads forked state on demand from the upstream RPC. Keep it loopback-only.

## Start the proof-of-stake devnet

Install Docker and Kurtosis, then run from the repository root:

```bash
kurtosis run --enclave eth-x-devnet github.com/ethpandaops/ethereum-package \
  --args-file infrastructure/devnet.yaml
kurtosis enclave inspect eth-x-devnet
```

The local network uses development chain ID 54379812. Check that each EL RPC returns this ID and produces blocks. Query both consensus clients at `/eth/v1/beacon/states/head/finality_checkpoints` and verify their finalized roots match at the same epoch after finality advances. Before using the setup for shared benchmarks, pin the package revision and client images by digest. Use private networking and generated keys on any shared staging deployment.

## Measure fee changes

```bash
python3 infrastructure/fees.py --baseline-target 30000000 \
  --candidate-target 45000000 30000000 80000000 80000000 70000000 20000000 10000000
```

Both scenarios apply the same EIP-1559 integer adjustment and 2x elasticity. Targets are illustrative. The model treats demand as divisible gas, queues excess demand, and omits bidding, priority fees, and blob fees. Compare pending gas alongside base fee so lower fees are evaluated against inclusion. Benchmark candidate client settings with ERC-20 transfers, swaps, and storage-heavy workloads. Record p50/p95 fees, inclusion delay, propagation and validation time, disk growth, and node resource use on the same hardware. Increase capacity only within measured operator limits. Roll up high-volume app interactions and evaluate blob costs separately. Fees on Ethereum mainnet remain governed by Ethereum.

## Implement the public fork

1. Select and independently verify a finalized Ethereum activation checkpoint, including block hash, execution state root, beacon block root, and finality data. Decide and publish how the fork transitions to an independently operated validator set and how stake and withdrawals are handled. Validate the transition on an isolated rehearsal before publishing a launch checkpoint.
2. Pin upstream execution and consensus client versions. Implement equivalent transition rules across independent client implementations and verify deterministic post-fork roots. Preserve pre-fork execution rules for historical sync and scope new transaction rules to activation. Publish signed build and checkpoint manifests with reproducible artifacts.
3. Assign a distinct public chain ID and network identity, isolate execution and consensus peers, and test replay protection across the split. Reject unprotected legacy transactions after activation. Test chain-bound application signatures and audit inherited contracts, bridges, stablecoins, and oracles. Copied balances and contract state require independent backing and operator support.
4. Operate independent validators, bootnodes, private Engine API links, rate-limited public RPC, and an explorer. Exercise partition recovery, finality, syncing from checkpoint, state growth, upgrade rehearsals, and incident response before launch. Register the wallet configuration after public chain identity is finalized.

## Quantum threat model and release gates

ETH-X targets an Ethereum-derived network that can continue operating when widely used elliptic-curve cryptography is unsafe. Post-quantum cryptography runs on ordinary computers. Security claims apply to explicitly tested threats and protocol components.

| Surface | Quantum exposure | Release requirement |
| --- | --- | --- |
| EOAs and contract authorization | A sufficiently capable quantum computer could recover signing keys from exposed elliptic-curve public keys. ECDSA-only permits, multisigs, and recovery paths inherit this exposure. | Prototype ML-DSA hybrid accounts. Bind signatures to the chain ID, authorization version, account, nonce, expiry and full call intent. Test that every spending and recovery path requires post-quantum authorization after migration. |
| Inherited mainnet state | Existing balances and contract permissions may depend on legacy keys. After a key is compromised, an ECDSA signature alone cannot distinguish the original owner from an attacker. | Specify opt-in enrollment before activation, migration of immutable contracts and unregistered accounts, and governance for unsupported assets. Test eligibility and claims against the fixed fork checkpoint. Publish the handling of unmigrated balances before activation. |
| Validator and sync security | BLS validator keys and signatures protect attestations, finality and light-client updates. | Evaluate PQ signatures and aggregation or proof strategies separately from wallet signatures. Demonstrate finality, slashing, validator rotation, checkpoint sync and light-client verification across independent clients under a published bandwidth budget. |
| Blob availability and proofs | KZG commitments and some proof systems rely on quantum-vulnerable assumptions. | Inventory commitments and proof systems used by clients, rollups and bridges. Evaluate hash-based alternatives and benchmark proof size, availability sampling, verification and storage before replacing or enabling affected paths. |
| Bridges, oracles, administration and infrastructure | External signer sets, upgrade keys, release signing and secure transport may depend on classical cryptography. | Inventory trust dependencies and establish equivalent protection or keep the integration disabled. Verify key rotation, downgrade resistance and artifact verification. |
| Hashes and addresses | Quantum search changes security margins. Truncated address spaces and full-length commitments have different requirements. | Review preimage, second-preimage and collision assumptions for each use. Specify how upgraded account identifiers and existing EVM addresses coexist and test address resolution across wallets and clients. |

Start with a reviewed FIPS 204 ML-DSA implementation and standardized test vectors. Exercise canonical encoding, incorrect and missing signatures, replay across chain IDs and domains, key rotation, and malformed-input resource limits. Benchmark signature bytes, verification time, block propagation, node resource use and fee impact against the existing devnet. Require identical validation across clients, independent review, and a published migration and incident-response plan before scheduling a public activation.

The current devnet uses upstream Ethereum cryptography. The authorization verifier, new validator signatures and commitment changes are research and implementation work.

## References

- [Foundry Anvil](https://getfoundry.sh/reference/anvil/anvil)
- [Ethereum devnet package](https://github.com/ethpandaops/ethereum-package)
- [EIP-155 replay protection](https://eips.ethereum.org/EIPS/eip-155)
- [EIP-1559 fee market](https://eips.ethereum.org/EIPS/eip-1559)
- [EIP-4844 blob fee market](https://eips.ethereum.org/EIPS/eip-4844)
- [NIST FIPS 204](https://csrc.nist.gov/pubs/fips/204/final)
- [Ethereum post-quantum security roadmap](https://ethereum.org/roadmap/security/quantum-resistance/)
