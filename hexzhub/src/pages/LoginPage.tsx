import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [key, setKey] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) navigate('/select', { replace: true })
  }, [isLoggedIn])

  const handleSubmit = async () => {
    if (!key.trim()) return
    setLoading(true)
    setErr('')
    const error = await login(key.trim(), remember)
    if (error) {
      setErr(error)
      setLoading(false)
    } else {
      navigate('/select')
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.noise} />
      <div className={styles.wrap}>
        <div className={styles.logoRow}>
          <div className={styles.logoIcon}>
            <i className="fa-solid fa-bolt" />
          </div>
          <div className={styles.logoText}>HEXZ<span>HUB</span></div>
        </div>
        <p className={styles.sub}>ROBLOX BOT DASHBOARD</p>

        <div className={styles.card}>
          <label className={styles.label}>ACCESS KEY</label>
          <div className={styles.inputWrap}>
            <i className="fa-solid fa-key" />
            <input
              type={show ? 'text' : 'password'}
              placeholder="enter key..."
              value={key}
              onChange={e => setKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoComplete="off"
            />
            <button className={styles.eyeBtn} onClick={() => setShow(!show)}>
              <i className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>

          <label className={styles.remember}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
            <span>Remember on this device</span>
          </label>

          <button
            className={`${styles.submitBtn} ${loading ? styles.loading : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <><i className="fa-solid fa-circle-notch fa-spin" /> Verifying...</> : 'INITIALIZE'}
          </button>

          {err && <div className={styles.err}><i className="fa-solid fa-triangle-exclamation" /> {err}</div>}
        </div>
      </div>
    </div>
  )
}
