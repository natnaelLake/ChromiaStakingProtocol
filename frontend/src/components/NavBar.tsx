'use client'
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <nav className="py-2 px-6">
      <ul className="flex justify-between">
        <li>
          <Link href="/" className="text-xl font-extrabold ">
            Staking Dapp
          </Link>
        </li>
        <div className="flex gap-4 font-semibold">
          <li className="nav-item">
            <Link href="/stake" className="nav-link" style={{color:'white'}}>
              Stake Tokens
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/unstake" className="nav-link" style={{color:'white'}}>
              Unstake Tokens
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/claim" className="nav-link" style={{color:'white'}}>
              Claim Yield
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/mystakes" className="nav-link" style={{color:'white'}}>
              My Stakes
            </Link>
          </li>
        </div>
      </ul>
      <style jsx>{`
        .nav-item {
          transition: background-color 0.3s, transform 0.3s;
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background-color: #4a90e2; 
        }

        .nav-item:hover {
          background-color: #3572b1; 
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .nav-link {
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;




