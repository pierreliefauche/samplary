import { Box } from '@atlaskit/primitives'
import Heading from '@atlaskit/heading';
import { PropsWithChildren } from 'react';

export const Outer = Box

export const Title = (props: Required<PropsWithChildren>) => (
  <Heading size='large' {...props}/>
)