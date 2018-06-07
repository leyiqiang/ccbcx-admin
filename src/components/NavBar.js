import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { ROOT, USER, GROUP } from 'src/data/route/index'
// import _ from 'lodash'

@observer
class NavBar extends Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.onSignOut = this.onSignOut.bind(this)
    this.state = {
      isOpen: false,
    }
  }
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }

  onSignOut() {
    this.props.logout()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>CCBCX Admin</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <Link to={ROOT}>
                <Button>题目</Button>
              </Link>
            </Nav>
            <Nav navbar>
              <Link to={ROOT}>
                <Button>官方消息</Button>
              </Link>
            </Nav>
            <Nav navbar>
              <Link to={GROUP}>
                <Button>队伍</Button>
              </Link>
            </Nav>
            <Nav navbar>
              <Link to={USER}>
                <Button>统计</Button>
              </Link>
            </Nav>
          </Collapse>
          <Button className={'pull-right'} bsStyle='danger' onClick={this.onSignOut}>
            退出
          </Button>
        </Navbar>
      </div>
    )
  }
}

export default NavBar