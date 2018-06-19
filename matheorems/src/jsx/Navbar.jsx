import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import '../styles/Navbar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

@connect((store) => {
    return{
        state: store.stateManager
    }
})
export default class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu className="navbar">
                <Menu.Item 
                    name='Theorems'
                    as={Link}
                    to="/"
                    active={activeItem === 'Theorems'}
                    onClick={this.handleItemClick}
                />
                { this.props.state.loggedIn ? 
                <Menu.Item
                    icon='plus'
                    name='Add'
                    as={Link}
                    to="/add"
                    active={activeItem === 'Add'}
                    onClick={this.handleItemClick}
                /> : null }
                <Menu.Header position='center' content="MaTheorems" className="navHead"/>
                <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item
                    name={this.props.state.loggedIn ? 'logout' : 'login'}
                    as={Link}
                    to={this.props.state.loggedIn ? '/logout' : '/login'}
                    active={activeItem === 'logout'}
                    onClick={this.handleItemClick}
                />
                </Menu.Menu>
            </Menu>
        )
    }
}
