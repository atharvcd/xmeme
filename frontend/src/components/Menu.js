import React, { Component, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {Button, Divider} from '@material-ui/core';
import {SWAGGER_UI} from '../backend';
import styled from "styled-components";
import img from "../assets/home_bg.jpg";
import logo_img from "../assets/xmeme_logo3-removebg.png";
const Navigation = styled.header`
  width: 100%;
  // border-bottom: 10px solid #222;
  z-index: 1;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 100px 0;
  height: 100px;
  margin-bottom: 60px;
  background: #1f1f1f;
  background-image: url(${img});
  z-index : 1

  .logo{
    
    width : 100%;
    height : 100%;
    background-image: url(${logo_img});
    background-repeat : no-repeat;
    background-size : contain;
  }
  .logo a {
    padding-top: 33px;
    display: flex;
    flex-direction: column;
    clear: both;
    padding-bottom: 30px;
    text-decoration: none;

    p {
      width: 500px;
      display: block;
    }
    em {
      font-size: 0.5em;
      float: left;
      display: block;
      img {
        display: inline-block;
        margin-top: 5px;
        width: 15px;
        float: left;
      }
      .letterhead {
        display: inline-block;
        line-height: 260%;
        float: left;
      }
    }
  }
  .gray {
    color: #ffffff;
  }
  a {
    opacity: 1;
    transition: all 0.6s;
    color: #ffffff;
    font-size: 1em;
  }
  a:hover {
    opacity: 1;
    color : #03DAC6;
  }
  .fa-bars {
    display: none;
    color: #ffffff;
    font-size: 2rem;
  }
  nav {
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      margin: 0 15px;
      justify-content: space-between;
      font-size: 1em;
    }
    a {
      font-size: 1.5em;
      font-style : bold;
      
       font-family : 'Sofia',cursive;
      text-decoration: none;
      /* .active {
        color: white;
      } */
    }
    a.active {
      opacity : 1;
      color: #FF0266
    }
  }

  @media only screen and (max-width: 800px) {
    padding: 0px;
    .logo {
      padding-left: 15px;
      padding-top: 0px !important;
    }
  }
  @media only screen and (max-width: 600px) {
    height: auto;
    min-height: 50px;
    display: block;
    position: relative;
    .logo {
      width: 100%;
      display: block;
      padding-top: 20px;
      margin: 0px;
      margin-left: -5px;
      a {
        padding: 20px 0px;
      }
    }
    .fa-bars {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      
    }
    ul.collapsed {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;

      overflow: hidden;
      max-height: 0;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0.4s;
      -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

      &.is-expanded {
        overflow: hidden;
        max-height: 500px; /* approximate max height */
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        transition-duration: 0.4s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
      }
      li {
        padding: 15px 10px;
        margin: 0px 0px;
        width: 100%;
      }
    }
  }
`;

const Menu = () => {
    
  const [isExpanded,setIsExpanded] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  }
  

    return (
      <Navigation>
        <div className="logo">
          <Link to="/">
            {/* <p>React Responsive Navigation</p> */}
            {/* <em>
              <div className="letterhead">
                <span className="name">kentorry</span>
                <span className="gray">.io</span>
                
              </div>
            </em> */}
            
            
          </Link>
        </div>
        <nav className="nav">
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={handleToggle}
          />
          
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
            <NavLink activeClassName="active" exact to="/">
              <li>Home</li>
            </NavLink>
            <Divider/>
            <NavLink activeClassName="active" to="/about">
              <li>About</li>
            </NavLink>
            <Divider/>
            <NavLink activeClassName="active" to="/contact-us">
              <li>Contact</li>
            </NavLink>
            <Divider/>
            
            <Divider/>
          </ul>
        </nav>
      </Navigation>
    );
  }


export default Menu;
