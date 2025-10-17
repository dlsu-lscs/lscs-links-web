export type Committee = {
  id: string; // CommitteeID
  name: string; // CommitteeName
  divisionId: string; // DivisionID.String
};

export const COMMITTEES: Committee[] = [
  { id: "ACADS", name: "Academics", divisionId: "INT" },
  { id: "CORE", name: "Core", divisionId: "CORE" },
  { id: "CORPREL", name: "Corporate Relations", divisionId: "EXT" },
  { id: "DOCULOGI", name: "Documentation and Logistics", divisionId: "OPS" },
  { id: "FIN", name: "Finance", divisionId: "OPS" },
  { id: "HRD", name: "Human Resource Development", divisionId: "INT" },
  { id: "MEM", name: "La Salle Computer Society", divisionId: "INT" },
  { id: "PUBLI", name: "Publications", divisionId: "EXT" },
  { id: "PUBS", name: "Publicity", divisionId: "EXT" },
  { id: "RND", name: "Research and Development", divisionId: "INT" },
  { id: "SOCIOCIVIC", name: "Socio-Civic", divisionId: "EXT" },
  { id: "TND", name: "Training and Development", divisionId: "INT" },
  { id: "UNIVREL", name: "University Relations", divisionId: "EXT" },
];

export type CommitteeId = (typeof COMMITTEES)[number]["id"]; 

export const COMMITTEE_MAP: Record<string, Committee> = COMMITTEES.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<string, Committee>
);

export function getCommitteeName(id: string | null | undefined): string {
  if (!id) return "Personal";
  return COMMITTEE_MAP[id]?.name ?? id;
}

export function isValidCommitteeId(id: string | null | undefined): id is CommitteeId {
  return !!id && id in COMMITTEE_MAP;
}

export function normalizeCommitteeId(id: string | null | undefined): string | null {
  if (!id) return null;
  const up = id.trim().toUpperCase();
  return COMMITTEE_MAP[up] ? up : null;
}
