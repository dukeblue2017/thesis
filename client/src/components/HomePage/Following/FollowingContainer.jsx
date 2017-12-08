import React from 'react';
import { Button } from 'semantic-ui-react';
import Following from './Following';


const FollowingContainer = () => (
  <div style={{ float: 'right' }} >
    <Button.Group vertical >
      <Button disabled >Following</Button>
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
      <Following />
    </Button.Group>
  </div>
);

export default FollowingContainer;