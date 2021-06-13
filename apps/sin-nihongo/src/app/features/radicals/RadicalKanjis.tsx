import React from 'react';
import { useParams } from 'react-router-dom';
import { Kanjis } from '../kanjis/Kanjis';

type ParamProps = { id: string };

export const RadicalKanjis: React.VFC = () => {
  const { id } = useParams<ParamProps>();
  return <Kanjis radicalId={parseInt(id)} />;
};
