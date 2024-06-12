'use client';
import React from 'react';
import Link from 'next/link';
import './styles/NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar-container">
      <Link href="/" className="nav-title">Staking Dapp</Link>
      <div className="nav-links">
        <Link href="/stake" className="nav-item">Stake Tokens</Link>
        <Link href="/unstake" className="nav-item">Unstake Tokens</Link>
        <Link href="/claim" className="nav-item">Claim Yield</Link>
        <Link href="/mystakes" className="nav-item">My Stakes</Link>
      </div>
    </nav>
  );
};

export default NavBar;
