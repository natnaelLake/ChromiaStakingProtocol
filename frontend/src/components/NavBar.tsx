'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: transparent;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4a90e2;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: #4a90e2;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid #4a90e2;
  transition: color 0.3s, background-color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #4a90e2;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #3572b1;
    border-color: #3572b1;
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <NavTitle href="/">Staking Dapp</NavTitle>
      <NavLinks>
        <NavItem href="/stake">Stake Tokens</NavItem>
        <NavItem href="/unstake">Unstake Tokens</NavItem>
        <NavItem href="/claim">Claim Yield</NavItem>
        <NavItem href="/mystakes">My Stakes</NavItem>
      </NavLinks>
    </NavBarContainer>
  );
};

export default NavBar;
