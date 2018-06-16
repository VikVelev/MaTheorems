import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import '../styles/Navbar.css'

export default class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu className="navbar">
                <Menu.Item name='Theorems' active={activeItem === 'Theorems'} onClick={this.handleItemClick} />
                <Menu.Item
                    icon='plus'
                    name='Add'
                    active={activeItem === 'Add'}
                    onClick={this.handleItemClick}
                />
                <Menu.Header position='center' content="MaTheorems" className="navHead"/>
                <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={this.handleItemClick}
                />
                </Menu.Menu>
            </Menu>
        )
    }
}
