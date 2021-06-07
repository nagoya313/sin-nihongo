import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Home } from '../home/Home';
import { NotFound } from '../error/404';
import { Glyphs } from '../glyphs/Glyphs';
import { Glyphwiki } from '../glyphwiki/Glyphwiki';
import { Kanjis } from '../kanjis/Kanjis';
import { Radicals } from '../radicals/Radicals';
import { RadicalKanjis } from '../radicals/RadicalKanjis';
import { GlyphCreate } from '../glyphs/GlyphCreate';

export const Router: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/glyphwiki" component={Glyphwiki} />
      <Route exact path="/radicals" component={Radicals} />
      <Route exact path="/kanjis" component={Kanjis} />
      <Route exact path="/glyphs" component={Glyphs} />
      <Route exact path="/radicals/:id/kanjis" component={RadicalKanjis} />
      {isAuthenticated ? <Route exact path="/glyphs/new" component={GlyphCreate} /> : null}
      <Route component={NotFound} />
    </Switch>
  );
};
