import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { SubSubTitle } from '../../components/Typography';

export const InternalError: React.VFC<FallbackProps> = () => <SubSubTitle>エラーが発生しました。</SubSubTitle>;
