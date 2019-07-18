import React, { Component } from "react";
import { Header, Image, Segment, Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <div>
      <Menu>
        <Menu.Item>
          Open
        </Menu.Item>
      </Menu>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={visible}
          width='thin'
        >
          <Menu.Item as='a'>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <Header as='h3'>Application Content</Header>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}
export default Navbar;