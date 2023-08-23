import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function DetailsHeader() {
  const [favorite, isFavorite] = useState(false);
  return (
    <div>
      <div
        style={ { display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        } }
      >
        <button>
          { '< Voltar '}
        </button>
        <div
          style={ { display: 'flex', justifyContent: 'end' } }
        >
          <button
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt="favorite" />
          </button>
          <button
            data-testid="favorite-btn"
          >
            <img src={ favorite ? blackHeartIcon : whiteHeartIcon } alt="favorite" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
