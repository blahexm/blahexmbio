import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { BloxAccount } from '../types'
import styles from './DashboardPage.module.css'

const fmt = (n: number | null | undefined): string => {
  if (n == null) return '—'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return n.toLocaleString()
}

const now = () => new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

type Tab = 'dashboard' | 'monitor' | 'trackstat'

export default function DashboardPage() {
  const { label, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [accounts, setAccounts] = useState<BloxAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [lastSync, setLastSync] = useState('—')
  const [toast, setToast] = useState('')
  const [toDelete, setToDelete] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2200)
  }

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('blox_stats')
      .select('*')
      .order('updated_at', { ascending: false })
    if (data) setAccounts(data)
    setLastSync(now())
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
    const ch = supabase.channel('rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blox_stats' }, () => {
        load()
      }).subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [load])

  const handleDelete = async (username: string) => {
    await supabase.from('blox_stats').delete().eq('username', username)
    setAccounts(prev => prev.filter(a => a.username !== username))
    setToDelete(null)
    showToast('Deleted ✓')
  }

  const online = accounts.filter(a => a.online)
  const offline = accounts.filter(a => !a.online)

  return (
    <div className={styles.root}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sbLogo}>
          <div className={styles.sbLogoIcon}><i className="fa-solid fa-bolt" /></div>
          <div className={styles.sbLogoText}>HEXZ<span>HUB</span></div>
        </div>

        <div className={styles.sbSection}>BLOX FRUITS</div>
        <button className={`${styles.navItem} ${tab === 'dashboard' ? styles.active : ''}`} onClick={() => setTab('dashboard')}>
          <i className="fa-solid fa-gauge" /> Dashboard
        </button>
        <button className={`${styles.navItem} ${tab === 'monitor' ? styles.active : ''}`} onClick={() => setTab('monitor')}>
          <i className="fa-solid fa-desktop" /> Money Monitor
        </button>
        <button className={`${styles.navItem} ${tab === 'trackstat' ? styles.active : ''}`} onClick={() => setTab('trackstat')}>
          <i className="fa-solid fa-chart-line" /> Trackstat
        </button>

        <div className={styles.sbSection}>TOOLS</div>
        <button className={styles.navItem} onClick={() => navigate('/select')}>
          <i className="fa-solid fa-grid-2" /> Home Hub
        </button>

        <div className={styles.sbSpacer} />
        <div className={styles.sbUser}>
          <div className={styles.sbUserCard}>
            <div className={styles.sbAvatar}>{label?.charAt(0).toUpperCase()}</div>
            <div>
              <div className={styles.sbName}>{label}</div>
              <div className={styles.sbRole}>Developer</div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/login') }}>
            <i className="fa-solid fa-right-from-bracket" /> LOGOUT
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={styles.main}>
        {/* Topbar */}
        <div className={styles.topbar}>
          <div className={styles.topbarTitle}>
            {tab === 'dashboard' && <><i className="fa-solid fa-gauge" /> Blox Fruits — Dashboard</>}
            {tab === 'monitor' && <><i className="fa-solid fa-desktop" /> Money Monitor</>}
            {tab === 'trackstat' && <><i className="fa-solid fa-chart-line" /> Trackstat</>}
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.statusPill}>
              <span className={`${styles.dot} ${online.length > 0 ? styles.online : ''}`} />
              {online.length} Online
            </div>
            <button className={styles.tbBtn} onClick={load} disabled={loading}>
              <i className={`fa-solid fa-arrows-rotate ${loading ? styles.spin : ''}`} /> Refresh
            </button>
            <button className={`${styles.tbBtn} ${styles.danger}`} onClick={() => { logout(); navigate('/login') }}>
              <i className="fa-solid fa-right-from-bracket" /> Logout
            </button>
          </div>
        </div>

        {/* Panel */}
        <div className={styles.panel}>
          {tab === 'dashboard' && (
            <>
              {/* Stat Cards */}
              <div className={styles.statCards}>
                <div className={styles.statCard}>
                  <div className={styles.scLabel}><i className="fa-solid fa-users" /> Total Accounts</div>
                  <div className={styles.scVal}>{accounts.length}</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.scLabel}><i className="fa-solid fa-circle-dot" /> Active</div>
                  <div className={`${styles.scVal} ${styles.green}`}>{online.length}</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.scLabel}><i className="fa-solid fa-circle-xmark" /> Inactive</div>
                  <div className={`${styles.scVal} ${styles.red}`}>{offline.length}</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.scLabel}><i className="fa-solid fa-clock" /> Last Sync</div>
                  <div className={`${styles.scVal} ${styles.small}`}>{lastSync}</div>
                </div>
              </div>

              {/* PC Monitor */}
              <div className={styles.sectionHead}>
                <div className={styles.sectionTitle}><i className="fa-solid fa-desktop" /> PC Monitor</div>
              </div>
              <div className={styles.pcGrid}>
                {['PC-01', 'PC-02'].map((pc, i) => {
                  const pcAccs = accounts.slice(
                    i === 0 ? 0 : Math.ceil(accounts.length / 2),
                    i === 0 ? Math.ceil(accounts.length / 2) : accounts.length
                  )
                  const pcOn = pcAccs.filter(a => a.online).length
                  return (
                    <div key={pc} className={styles.pcCard}>
                      <div className={styles.pcLeft}>
                        <div className={styles.pcIcon}><i className="fa-solid fa-desktop" /></div>
                        <div>
                          <div className={styles.pcName}>{pc}</div>
                          <div className={styles.pcSub}>Blox Fruits</div>
                        </div>
                      </div>
                      <div className={styles.pcStats}>
                        <div className={styles.pcStat}>
                          <div className={`${styles.pcVal} ${styles.green}`}>{pcOn}</div>
                          <div className={styles.pcLbl}>ON</div>
                        </div>
                        <div className={styles.pcStat}>
                          <div className={`${styles.pcVal} ${styles.red}`}>{pcAccs.length - pcOn}</div>
                          <div className={styles.pcLbl}>OFF</div>
                        </div>
                        <div className={styles.pcStat}>
                          <div className={`${styles.pcVal} ${styles.dim}`}>{pcAccs.length}</div>
                          <div className={styles.pcLbl}>TOT</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Accounts Table */}
              <div className={styles.sectionHead}>
                <div className={styles.sectionTitle}><i className="fa-solid fa-list" /> Active Accounts</div>
                <div className={styles.sectionBadge}>synced {lastSync}</div>
              </div>

              {accounts.length === 0 ? (
                <div className={styles.empty}>
                  <i className="fa-solid fa-inbox" />
                  <p>No data yet<br /><span>Run script then click Refresh</span></p>
                </div>
              ) : (
                <div className={styles.accountList}>
                  {accounts.map(acc => (
                    <div key={acc.username} className={styles.accountRow}>
                      <div className={styles.accLeft}>
                        <div className={styles.accAvatar}>
                          <i className="fa-solid fa-user" />
                        </div>
                        <div>
                          <div className={styles.accName}>{acc.username}</div>
                          {acc.pc && <div className={styles.accPc}>{acc.pc}</div>}
                        </div>
                      </div>

                      <span className={`${styles.badge} ${acc.online ? styles.badgeOnline : styles.badgeOffline}`}>
                        <span className={styles.bd} />
                        {acc.online ? 'Online' : 'Offline'}
                      </span>

                      <div className={styles.accStat}>
                        <div className={styles.accStatLabel}><i className="fa-solid fa-trophy" /> Level</div>
                        <div className={`${styles.accStatVal} ${styles.cyan}`}>{fmt(acc.level)}</div>
                      </div>

                      <div className={styles.accStat}>
                        <div className={styles.accStatLabel}>Bounty</div>
                        <div className={styles.bountyWrap}>
                          <div className={`${styles.bRow} ${styles.marine}`}>
                            <i className="fa-solid fa-shield" />
                            {fmt(acc.bounty)}
                          </div>
                          <div className={`${styles.bRow} ${styles.pirate}`}>
                            <i className="fa-solid fa-skull-crossbones" />
                            —
                          </div>
                        </div>
                      </div>

                      <div className={styles.accStat}>
                        <div className={styles.accStatLabel}>Currency</div>
                        <div className={styles.currWrap}>
                          <div className={`${styles.cRow} ${styles.beli}`}>
                            <i className="fa-solid fa-coins" />
                            {fmt(acc.money)}
                          </div>
                          <div className={`${styles.cRow} ${styles.frag}`}>
                            <i className="fa-solid fa-bolt" />
                            {fmt(acc.fragments)}
                          </div>
                        </div>
                      </div>

                      <div className={styles.accTime}>
                        {new Date(acc.updated_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>

                      <button className={styles.delBtn} onClick={() => setToDelete(acc.username)}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {(tab === 'monitor' || tab === 'trackstat') && (
            <div className={styles.comingSoon}>
              <div className={styles.csIcon}>
                <i className={`fa-solid ${tab === 'monitor' ? 'fa-desktop' : 'fa-chart-line'}`} />
              </div>
              <div className={styles.csTitle}>{tab === 'monitor' ? 'Money Monitor' : 'Trackstat'}</div>
              <div className={styles.csSub}>coming soon</div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {toDelete && (
        <div className={styles.overlay} onClick={() => setToDelete(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalIcon}><i className="fa-solid fa-trash" /></div>
            <div className={styles.modalTitle}>Delete account?</div>
            <div className={styles.modalSub}>Data for <strong>{toDelete}</strong> will be permanently removed.</div>
            <div className={styles.modalBtns}>
              <button className={styles.mBtn} onClick={() => setToDelete(null)}>Cancel</button>
              <button className={`${styles.mBtn} ${styles.mDanger}`} onClick={() => handleDelete(toDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  )
}
