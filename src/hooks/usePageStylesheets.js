import { useEffect } from 'react';

function usePageStylesheets(hrefs) {
  const hrefKey = hrefs.join('|');

  useEffect(() => {
    const links = hrefs.map((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.injectedStylesheet = href;
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, [hrefKey]);
}

export default usePageStylesheets;
