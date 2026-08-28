// Ficheiro de edição rápida: altere jogadores, semanas, equipas e pontos antes de publicar no GitHub.
export type Player = { name: string; points: number; initials: string; color: string };
export type Team = { name: string; players: string[]; points: number; color: "cyan" | "coral" };
export type Week = { id: string; label: string; date: string; teams: Team[]; champion: string };

export const players: Player[] = [
  { name: "Gabriel", points: 148, initials: "GA", color: "#63f5e7" },
  { name: "Dudu", points: 132, initials: "DU", color: "#ff6b5f" },
  { name: "Du", points: 120, initials: "DO", color: "#f6c65b" },
  { name: "Lucas", points: 98, initials: "LU", color: "#a48cff" },
  { name: "Felipe", points: 84, initials: "FE", color: "#63f5e7" },
  { name: "Rosivaldo", points: 72, initials: "RO", color: "#ff6b5f" },
];

export const weeks: Week[] = [
  { id: "1", label: "Semana 01", date: "18 AGO 2026", champion: "TIME 1", teams: [
    { name: "TIME 1", players: ["Dudu", "Gabriel", "Du"], points: 148, color: "cyan" },
    { name: "TIME 2", players: ["Rosivaldo", "Lucas", "Felipe"], points: 10, color: "coral" },
  ]},
  { id: "2", label: "Semana 02", date: "25 AGO 2026", champion: "TIME 2", teams: [
    { name: "TIME 1", players: ["Lucas", "Dudu", "Rosivaldo"], points: 96, color: "cyan" },
    { name: "TIME 2", players: ["Gabriel", "Du", "Felipe"], points: 121, color: "coral" },
  ]},
];
