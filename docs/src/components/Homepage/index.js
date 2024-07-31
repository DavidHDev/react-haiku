import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import './home.css';


export default function Homepage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  React.useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 50) setMenuOpen(false);
    })

    return () => document.removeEventListener('scroll');
  }, [])

  return (
    <section className='haiku'>
      <div>
        <header className='haiku-header'>
          <nav className='top-nav'>
            <img className='nav-logo' src={useBaseUrl('/img/logo.svg')} alt="react-haiku logo" />
            <div className='nav-links'>
              <Link className="docs-link" to="/docs/intro">Docs</Link>
              <a rel='noreferrer' aria-label='github' target="_blank" href="https://github.com/DavidHDev/react-haiku">
                <img className='nav-img gh' src={useBaseUrl('/img/github.svg')} alt="github octocat logo" />
              </a>
              <a className='supporter-button' rel='noreferrer' target="_blank" aria-label="Be The First" href='https://ko-fi.com/davidhaz'>
                <button className='sponsor'>
                  <img className='nav-img' src={useBaseUrl('/img/sponsor.svg')} alt="sponsor heart" />
                  Support
                </button>
              </a>
            </div>
            <div onClick={() => setMenuOpen(!menuOpen)} className='menu-icon'>
              {menuOpen ? 'Close' : 'Menu'}
            </div>
            <div className={menuOpen ? 'overlay visible' : 'overlay'}>
              <div className='overlay-links'>
                <Link onClick={() => setMenuOpen(false)} to="/docs/intro">Docs</Link>
                <a onClick={() => setMenuOpen(false)} rel='noreferrer' aria-label='github' target="_blank" href="https://github.com/DavidHDev/react-haiku">
                  GitHub
                </a>
                <a onClick={() => setMenuOpen(false)} rel='noreferrer' target="_blank" aria-label="Be The First" href='https://ko-fi.com/davidhaz'>
                  <button>
                    Support
                    <img src={useBaseUrl('/img/sponsor.svg')} alt="sponsor heart" />
                  </button>
                </a>
              </div>
            </div>
          </nav>
        </header>
        <img className='hero-graphic-2' src={useBaseUrl('/img/graphic.svg')} alt="graphic illustration" />

        <div className='hero-container'>
          <img className='hero-graphic' src={useBaseUrl('/img/graphic.svg')} alt="graphic illustration" />
          <div className='haiku-hero'>

            <h1 className='headline'>
              React <span>Hooks</span> & <span>Utilities</span> that <br />
              save time and lines of code
            </h1>
            <div className='button-bar'>
              <Link to="/docs/intro" className='get-started'>
                Get Started
                <img src={useBaseUrl('/img/chevron.svg')} alt="chevron arrow pointing right" />
              </Link>
              <div className='command' onClick={() => copy('npm install react-haiku')}>
                <span>$</span>
                npm install react-haiku
                {copied ? <img src={useBaseUrl('/img/copydone.svg')} alt="copy to clipboard success icon" /> : <img src={useBaseUrl('/img/copy.svg')} alt="copy to clipboard icon" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='features-container'>
        <div className='features'>
          <Link to="/docs/category/hooks" className='feature'>
            <p className='feature-stat'>25</p>
            <p className='feature-title'>Custom Hooks <img src={useBaseUrl('/img/chevron.svg')} alt="chevron arrow pointing right" /></p>
          </Link>
          <Link to="/docs/category/utilities" className='feature'>
            <p className='feature-stat'>4</p>
            <p className='feature-title'>Utility Components <img src={useBaseUrl('/img/chevron.svg')} alt="chevron arrow pointing right" /></p>
          </Link>
          <a href='https://bundlephobia.com/package/react-haiku@2.0.0' target="_blank" rel="noreferrer" className='feature'>
            <p className='feature-stat'>{`< 5 kb`}</p>
            <p className='feature-title'>Minified + Gzipped <img src={useBaseUrl('/img/chevron.svg')} alt="chevron arrow pointing right" /></p>
          </a>
        </div>
      </div>

      <footer className='haiku-footer'>
        Made with <span>&nbsp;❤&nbsp;</span> by David Haz
      </footer>
    </section>
  );
}
