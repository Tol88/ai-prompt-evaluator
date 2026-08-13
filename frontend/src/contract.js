import { createClient } from "genlayer-js";
import { testnetBradbury } from "genlayer-js/chains";
import { TransactionStatus } from "genlayer-js/types";

// =====================================================
// CONTRACT ADDRESSES
// =====================================================

export const V1_CONTRACT_ADDRESS =
  "0x162A4472a300E5FC555e51Bf556Db2fe06C19b13";

export const V2_CONTRACT_ADDRESS =
  "0x0B305D3CB1A26b1Be2c8A820d76d522554F73886";

// =====================================================
// READ CLIENT
// =====================================================

export const readClient = createClient({
  chain: testnetBradbury,
});

// =====================================================
// PROVIDER
// =====================================================

function getProvider() {
  if (!window.ethereum) {
    throw new Error(
      "MetaMask tidak ditemukan. Silakan install MetaMask."
    );
  }

  return window.ethereum;
}

// =====================================================
// WRITE CLIENT
// =====================================================

async function getWriteClient(walletAddress) {
  const provider = getProvider();

  const chainId = await provider.request({
    method: "eth_chainId",
  });

  if (chainId !== "0x107d") {
    throw new Error(
      "Wrong network. Please switch MetaMask to GenLayer Bradbury."
    );
  }

  return createClient({
    chain: testnetBradbury,
    account: walletAddress,
    provider,
  });
}

// =====================================================
// V1 EVALUATION
// =====================================================

export async function evaluateV1(
  prompt,
  walletAddress
) {
  const writeClient = await getWriteClient(
    walletAddress
  );

  const txHash = await writeClient.writeContract({
    address: V1_CONTRACT_ADDRESS,
    functionName: "evaluate_prompt",
    args: [prompt],
    value: BigInt(0),
  });

  const receipt =
    await writeClient.waitForTransactionReceipt({
      hash: txHash,
      status: TransactionStatus.ACCEPTED,
    });

  return {
    txHash,
    receipt,
  };
}

// =====================================================
// V2 EVALUATION
// =====================================================

export async function evaluateV2(
  prompt,
  walletAddress
) {
  const writeClient = await getWriteClient(
    walletAddress
  );

  const txHash = await writeClient.writeContract({
    address: V2_CONTRACT_ADDRESS,
    functionName: "evaluate_prompt",
    args: [prompt],
    value: BigInt(0),
  });

  const receipt =
    await writeClient.waitForTransactionReceipt({
      hash: txHash,
      status: TransactionStatus.ACCEPTED,
    });

  return {
    txHash,
    receipt,
  };
}

// =====================================================
// GENERIC READ
// =====================================================

async function readContract(
  address,
  functionName
) {
  return await readClient.readContract({
    address,
    functionName,
    args: [],
  });
}

// =====================================================
// V1 READ FUNCTIONS
// =====================================================

export async function getV1Score() {
  return readContract(
    V1_CONTRACT_ADDRESS,
    "get_last_score"
  );
}

export async function getV1Feedback() {
  return readContract(
    V1_CONTRACT_ADDRESS,
    "get_last_feedback"
  );
}

export async function getV1Prompt() {
  return readContract(
    V1_CONTRACT_ADDRESS,
    "get_last_prompt"
  );
}

// =====================================================
// V2 READ FUNCTIONS
// =====================================================

export async function getV2Score() {
  return readContract(
    V2_CONTRACT_ADDRESS,
    "get_last_score"
  );
}

export async function getV2Clarity() {
  return readContract(
    V2_CONTRACT_ADDRESS,
    "get_last_clarity"
  );
}

export async function getV2Specificity() {
  return readContract(
    V2_CONTRACT_ADDRESS,
    "get_last_specificity"
  );
}

export async function getV2Context() {
  return readContract(
    V2_CONTRACT_ADDRESS,
    "get_last_context"
  );
}

export async function getV2Usefulness() {
  return readContract(
    V2_CONTRACT_ADDRESS,
    "get_last_usefulness"
  );
}

export async function getV2Feedback() {
  return readContract(
    V2_CONTRACT_ADDRESS,
    "get_last_feedback"
  );
}

export async function getV2ImprovedPrompt() {
  return readContract(
    V2_CONTRACT_ADDRESS,
    "get_last_improved_prompt"
  );
}