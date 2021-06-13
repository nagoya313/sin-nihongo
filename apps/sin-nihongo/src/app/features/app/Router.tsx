import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Home } from '../home/Home';
import { NotFound } from '../error/404';
import { Glyphs } from '../glyphs/Glyphs';
import { Index as Glyphwiki } from '../glyphwiki/Index';
import { Kanjis } from '../kanjis/Kanjis';
import { Index as Radicals } from '../radicals/Index';
import { RadicalKanjis } from '../radicals/RadicalKanjis';
import { GlyphCreate } from '../glyphs/GlyphCreate';
import { BuhinProvider } from '../../components/Buhin';

export const Router: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/glyphwiki" component={Glyphwiki} />
      <Route exact path="/radicals" component={Radicals} />
      {/*
      <Route
        exact
        path="/kanjis"
        render={() => (
          <BuhinProvider>
            <Kanjis />
          </BuhinProvider>
        )}
      />
      <Route
        exact
        path="/glyphs"
        render={() => (
          <BuhinProvider>
            <Glyphs />
          </BuhinProvider>
        )}
      />
      <Route exact path="/radicals/:id/kanjis" component={RadicalKanjis} />
        {isAuthenticated && <Route exact path="/glyphs/new" component={GlyphCreate} />}*/}
      <Route component={NotFound} />
    </Switch>
  );
};
