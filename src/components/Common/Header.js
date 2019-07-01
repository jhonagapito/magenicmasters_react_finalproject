// 'use strict';

// // Bootstrap Components
// import React from 'react';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import { IndexLinkContainer } from 'react-router-bootstrap'

// import PriorityTasksMenu from '../priorityTasks/priorityTasksMenu.js';

// // Component
// const Header = () => {
//   return (
//     <div className="navigation-bar">
//       <Navbar inverse collapseOnSelect fixedTop>
//         <Navbar.Header>
//           <Navbar.Brand>
//             <a href="#/">Brian's Assignment</a>
//           </Navbar.Brand>
//           <Navbar.Toggle />
//         </Navbar.Header>
//         <Navbar.Collapse>
//           <Nav>
//             <IndexLinkContainer to="/">
//               <NavItem>Tomato Timer</NavItem>
//             </IndexLinkContainer>
//             <IndexLinkContainer to="/Tasks">
//               <NavItem>Tasks</NavItem>
//             </IndexLinkContainer>
//             <IndexLinkContainer to="/Kanban">
//               <NavItem>Kanban</NavItem>
//             </IndexLinkContainer>
//           </Nav>
//           <Nav pullRight>
//             <NavDropdown title="MMR" id="basic-nav-dropdown">
//               <IndexLinkContainer to="/TomatoTimer">
//                 <MenuItem>Assignment #1</MenuItem>
//               </IndexLinkContainer>
//               <IndexLinkContainer to="/Tasks">
//                 <MenuItem>Assignment #2</MenuItem>
//               </IndexLinkContainer>
//               <MenuItem divider />
//               <MenuItem>About</MenuItem>
//             </NavDropdown>
//           </Nav>
//           <Nav pullRight>
//               <PriorityTasksMenu />
//                 {/*<div>{this.state.task.name}</div>
//                 <h6 className="task-description">{this.state.task.description}</h6>*/}
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </ div>
//   );
// };

// export default Header;