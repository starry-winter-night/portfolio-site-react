import React, { memo } from 'react';

const Logo = memo(({ logo }) => (
  <div className={logo}>
    <a href="https://smpark.dev">
      web <br />
      developer <br />
      smpark
    </a>
  </div>
));

export default Logo;
