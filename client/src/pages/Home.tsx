// Direção visual: Arena Neon — placar sports-tech assimétrico, Space Grotesk + IBM Plex Mono, ciano elétrico, coral e dourado.
import { useMemo, useState } from "react";
import { players, weeks, type Player } from "@/data/championship";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  ChevronDown,
  CircleHelp,
  Dices,
  Flame,
  Gamepad2,
  History,
  Medal,
  RefreshCw,
  Settings2,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const rankMedals = ["01", "02", "03"];

function PlayerAvatar({ player, small = false }: { player: Player; small?: boolean }) {
  return (
    <span className={small ? "player-avatar small" : "player-avatar"} style={{ background: player.color }}>
      {player.initials}
    </span>
  );
}

export default function Home() {
  const [selectedWeek, setSelectedWeek] = useState("1");
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawResult, setDrawResult] = useState<string | null>(null);
  const [drawnTeams, setDrawnTeams] = useState<[string[], string[]] | null>(null);
  const week = weeks.find((item) => item.id === selectedWeek) ?? weeks[0];
  const maxPoints = Math.max(...players.map((player) => player.points));
  const weekWinner = week.teams.find((team) => team.name === week.champion);

  const sortedPlayers = useMemo(() => [...players].sort((a, b) => b.points - a.points), []);

  function spinWheel() {
    if (isSpinning) return;
    setIsSpinning(true);
    setDrawResult(null);
    setDrawnTeams(null);
    window.setTimeout(() => {
      const shuffled = [...players].sort(() => Math.random() - 0.5);
      const teamOne = shuffled.slice(0, 3).map((player) => player.name);
      const teamTwo = shuffled.slice(3).map((player) => player.name);
      setDrawResult(shuffled[0].name);
      setDrawnTeams([teamOne, teamTwo]);
      setIsSpinning(false);
      toast.success("Equipas sorteadas!", { description: `${teamOne.join(", ")} contra ${teamTwo.join(", ")}.` });
    }, 1500);
  }

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <div className="brand-mark" aria-label="Campeonato dos 6">
          <span>6</span>
        </div>
        <div className="rail-divider" />
        <nav className="rail-nav" aria-label="Navegação principal">
          <button className="rail-button active" title="Dashboard"><Gamepad2 size={19} /></button>
          <button className="rail-button" title="Histórico" onClick={() => toast("Histórico em construção") }><History size={19} /></button>
          <button className="rail-button" title="Participantes" onClick={() => toast("Participantes em construção") }><Users size={19} /></button>
        </nav>
        <button className="rail-button bottom" title="Configurações" onClick={() => toast("Edite os dados diretamente no ficheiro do projeto") }><Settings2 size={19} /></button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="mini-mark">✦</div>
            <div>
              <p className="eyebrow">CAMPEONATO DOS 6</p>
              <p className="brand-subtitle">ranking semanal entre amigos</p>
            </div>
          </div>
          <div className="top-actions">
            <span className="live-pill"><span className="live-dot" /> AO VIVO</span>
            <button className="icon-button" aria-label="Ajuda" onClick={() => toast("Escolha a semana e acompanhe quem está no topo.")}><CircleHelp size={18} /></button>
          </div>
        </header>

        <section className="hero-grid">
          <div className="hero-copy">
            <div className="section-kicker"><Zap size={14} /> PLACAR GERAL</div>
            <h1>A tabela<br /><span>não mente.</span></h1>
            <p>Seis nomes. Uma tabela. Toda semana, uma nova história para contar.</p>
            <div className="hero-stat-row">
              <div><strong>06</strong><span>jogadores</span></div>
              <div><strong>{weeks.length.toString().padStart(2, "0")}</strong><span>semanas</span></div>
              <div><strong>R$ 200</strong><span>em prémios</span></div>
            </div>
          </div>
          <div className="prize-panel">
            <div className="prize-grid-line" />
            <div className="prize-head"><span>PRÉMIO DA TEMPORADA</span><Sparkles size={16} /></div>
            <div className="prize-total">R$ 200<span>,00</span></div>
            <div className="prize-list">
              <div><span className="prize-rank gold">01</span><span>CAMPEÃO</span><strong>R$ 100</strong></div>
              <div><span className="prize-rank silver">02</span><span>VICE</span><strong>R$ 70</strong></div>
              <div><span className="prize-rank bronze">03</span><span>TERCEIRO</span><strong>R$ 30</strong></div>
            </div>
            <Trophy className="prize-trophy" size={82} strokeWidth={1.15} />
          </div>
        </section>

        <section className="toolbar-row">
          <div>
            <p className="eyebrow muted">VISUALIZAR RESULTADOS</p>
            <label className="week-select-wrap">
              <select value={selectedWeek} onChange={(event) => setSelectedWeek(event.target.value)} aria-label="Selecionar semana">
                {weeks.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.date}</option>)}
              </select>
              <ChevronDown size={17} />
            </label>
          </div>
          <Button className="draw-button" onClick={spinWheel} disabled={isSpinning}><Dices size={18} /> {isSpinning ? "A girar..." : "Sortear equipas"}</Button>
        </section>

        <section className="dashboard-grid">
          <Card className="ranking-card">
            <div className="card-header"><div><p className="eyebrow muted">PONTUAÇÃO ACUMULADA</p><h2>Ranking geral</h2></div><Badge className="season-badge">TEMPORADA 01</Badge></div>
            <div className="ranking-list">
              {sortedPlayers.map((player, index) => (
                <div className={`ranking-row ${index < 3 ? "podium-row" : ""}`} key={player.name}>
                  <span className={`rank-number ${index < 3 ? "podium-number" : ""}`}>{rankMedals[index] ?? String(index + 1).padStart(2, "0")}</span>
                  <PlayerAvatar player={player} />
                  <div className="rank-player"><strong>{player.name}</strong><span>{index === 0 ? "na liderança" : index === 1 ? "na cola do líder" : "em jogo"}</span></div>
                  <div className="progress-track"><span style={{ width: `${(player.points / maxPoints) * 100}%`, background: player.color }} /></div>
                  <strong className="rank-points">{player.points}<small> pts</small></strong>
                </div>
              ))}
            </div>
          </Card>

          <Card className="wheel-card">
            <div className="card-header"><div><p className="eyebrow muted">MODO ALEATÓRIO</p><h2>Roleta dos 6</h2></div><RefreshCw className={isSpinning ? "spin-icon" : ""} size={18} /></div>
            <div className={`wheel ${isSpinning ? "wheel-spinning" : ""}`}>
              <div className="wheel-segments"><span>GA</span><span>DU</span><span>DO</span><span>LU</span><span>FE</span><span>RO</span></div>
              <div className="wheel-center">{drawResult ? drawResult.slice(0, 2).toUpperCase() : "6"}</div>
            </div>
            <div className="wheel-pointer" />
            <p className="wheel-caption">{drawnTeams ? <>O destino formou <strong>duas equipas</strong>.</> : "Quem vai ser o próximo a decidir o destino?"}</p>
            {drawnTeams && <div className="drawn-teams"><div><span>TIME 1</span><strong>{drawnTeams[0].join(" · ")}</strong></div><div><span>TIME 2</span><strong>{drawnTeams[1].join(" · ")}</strong></div></div>}
            <Button variant="outline" className="wheel-action" onClick={spinWheel} disabled={isSpinning}>{isSpinning ? "A montar equipas" : "Sortear duas equipas"} <Dices size={15} /></Button>
          </Card>
        </section>

        <section className="week-result-section">
          <div className="section-heading"><div><div className="section-kicker"><Flame size={14} /> ÚLTIMA BATALHA</div><h2>Resultado da {week.label.toLowerCase()}</h2></div><span className="date-stamp">{week.date}</span></div>
          <div className="teams-grid">
            {week.teams.map((team) => (
              <Card className={`team-card ${team.color} ${team.name === week.champion ? "winner" : ""}`} key={team.name}>
                <div className="team-topline"><span className="team-dot" /> <span>{team.name}</span>{team.name === week.champion && <Badge className="champion-badge"><Medal size={13} /> CAMPEÃO</Badge>}</div>
                <div className="team-score">{team.points}<span> pts</span></div>
                <div className="team-members">{team.players.map((name) => <span key={name}>{name}</span>)}</div>
                {team.name === week.champion && <div className="winner-shout">A equipa que veio para jogar.</div>}
              </Card>
            ))}
          </div>
          <div className="footer-note"><span><span className="status-dot" /> dados editáveis no projeto</span><span>próxima rodada: em breve <span className="arrow">↗</span></span></div>
        </section>
      </main>
    </div>
  );
}
