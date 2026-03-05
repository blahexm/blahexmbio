import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { Game } from '../types'
import styles from './GameSelectPage.module.css'

const GAMES: Game[] = [
  {
    id: 'bloxfruits',
    name: 'BLOX FRUITS',
    description: 'Advanced monitoring system. Track Bounty, Stats, Money and Fragments in real-time.',
    image: 'https://tr.rbxcdn.com/180DAY-8f5d94f0b7af6b1e7b8b8b8b8b8b8b8b/768/432/Image/Webp/noFilter',
    available: true,
    route: '/dashboard/bloxfruits',
  },
]

const COMING_SOON = [
  { name: 'FISCH', icon: 'fa-fish' },
  { name: 'BLOCK SPINS', icon: 'fa-rotate' },
]

export default function GameSelectPage() {
  const { label, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><i className="fa-solid fa-bolt" /></div>
            <div className={styles.logoText}>HEXZ<span>HUB</span></div>
          </div>
          <span className={styles.headerSub}>ROBLOX BOT DASHBOARD TRACKSTAT</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userPill}>
            <i className="fa-solid fa-user" />
            <div>
              <div className={styles.userName}>{label}</div>
              <div className={styles.userRole}>Developer</div>
            </div>
            <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/login') }}>
              <i className="fa-solid fa-power-off" />
            </button>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className={styles.main}>
        <div className={styles.grid}>
          {GAMES.map(game => (
            <div key={game.id} className={`${styles.gameCard} ${styles.active}`}>
              <div className={styles.cardBg}>
                <div className={styles.cardOverlay} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.gameIcon}><i className="fa-solid fa-dragon" /></div>
                <h2 className={styles.gameName}>{game.name}</h2>
                <p className={styles.gameDesc}>{game.description}</p>
                <button className={styles.openBtn} onClick={() => navigate(game.route)}>
                  OPEN DASHBOARD <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            </div>
          ))}

          {COMING_SOON.map(g => (
            <div key={g.name} className={`${styles.gameCard} ${styles.soon}`}>
              <div className={styles.cardBg} />
              <div className={styles.cardContent}>
                <div className={styles.gameIcon}><i className={`fa-solid ${g.icon}`} /></div>
                <h2 className={styles.gameName}>{g.name}</h2>
                <p className={styles.gameDesc}>Coming soon...</p>
                <button className={styles.openBtn} disabled>COMING SOON</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        © 2026 HEXZHUB. All rights reserved. <strong>PRIVATE PROPERTY.</strong>
      </footer>
    </div>
  )
}
