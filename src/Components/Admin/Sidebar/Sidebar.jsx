import React from 'react'
import { FileText, Grid, LogOut } from 'lucide-react'
import './Sidebar.scss'
import { NavLink } from 'react-router-dom'

const items = [
  { name: 'Projects', path: '/admin/projects', icon: <FileText size={18} /> },
  { name: 'Blogs', path: '/admin/blogs', icon: <Grid size={18} /> },
]

export const Sidebar = ({ compact = false, open = false }) => {
  return (
    <aside className={`admin-sidebar ${compact ? 'compact' : ''} ${open ? 'open' : ''}`}>
      <div className="brand">MD<span>SHIMUL</span></div>
      <nav className="side-nav">
        <ul>
          {items.map((it) => (
            <li key={it.path}>
              <NavLink to={it.path} className={({isActive}) => isActive ? 'active' : ''}>
                <span className="icon">{it.icon}</span>
                <span className="label">{it.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={16} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
