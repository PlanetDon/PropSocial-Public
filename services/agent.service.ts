import { apiClient } from "@/lib/api";

export interface AgentProfile {
  id: string;
  name: string;
  company: string;
  location: string;
  yearsExperience: number;
  rating: number;
  verified: boolean;
  listingsVerified: number;
  escrowComplianceRate: number;
}

const fallbackAgent: AgentProfile = {
  id: "agent-001",
  name: "John Doe Realty",
  company: "PropSocial Partners",
  location: "Lagos, Nigeria",
  yearsExperience: 8,
  rating: 4.7,
  verified: true,
  listingsVerified: 45,
  escrowComplianceRate: 98
};

export async function fetchAgentProfile(agentId: string): Promise<AgentProfile> {
  try {
    return await apiClient<AgentProfile>(`/agents/${agentId}`);
  } catch {
    return { ...fallbackAgent, id: agentId };
  }
}
