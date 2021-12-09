import React from 'react'
import "./menu.scss"

export default function Menu({menuOpen, setMenuOpen}) {
  return (
    <div className={"menu "+(menuOpen && "active")}>
      <ul>
        <li>
          <a>Sign In</a>
        </li>
        <li>
          <a>About Topics</a>
        </li>
        <li>
          <a>Q & A</a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>About</a>
        </li>
      </ul>
    </div>
  )
}