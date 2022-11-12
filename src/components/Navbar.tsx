import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { colors } from '../constants';
import SearchIcon from '../assets/icons/search.svg';
import MenuIcon from '../assets/icons/menu-round.png';
import closeIcon from '../assets/icons/close.svg';

interface INavbarProps {
  handleSetSearch: (val: string) => void;
  handleOverlay: () => void;
}

const Navbar = ({ handleSetSearch, handleOverlay }: INavbarProps) => {
  const navigate = useNavigate();

  const [searchvalue, setSearchValue] = useState<string>('');
  const [isMobileNav, setIsMobileNav] = useState<boolean>(false);

  const handleSearchValueChange = (e: any) => {
    if (e.target.value === '') {
      handleSetSearch('');
    }
    setSearchValue(e.target.value);
  };

  const searchProduct = () => {
    handleSetSearch(searchvalue);
  };

  const handleMobileNavbar = () => {
    handleOverlay();
    setIsMobileNav(!isMobileNav);
  };
  return (
    <div>
      <NavbarContainer>
        <Menu src={MenuIcon} onClick={handleMobileNavbar} />
        <NavbarTitle onClick={() => navigate('/')}>Shoppy</NavbarTitle>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Search products"
            onChange={(e) => handleSearchValueChange(e)}
          />
          <SearchBtn
            src={SearchIcon}
            style={{ height: '20px', width: '20px' }}
            onClick={searchProduct}
          />
        </SearchWrapper>

        <NavItems>
          <NavLink to="products">
            <NavItem>All Products</NavItem>
          </NavLink>
        </NavItems>
      </NavbarContainer>

      {isMobileNav && (
        <MobileNavList>
          <CancelBtn src={closeIcon} onClick={handleMobileNavbar} />

          <MobileNavItems>
            <NavLink to="products">
              <MobileNavItem onClick={handleMobileNavbar}>
                All Products
              </MobileNavItem>
            </NavLink>
          </MobileNavItems>
        </MobileNavList>
      )}
    </div>
  );
};

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  -webkit-transition: opacity 200ms;
  transition: opacity 200ms;
  opacity: 1;
  z-index: 99;
`;

const CancelBtn = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 35px;
  cursor: pointer;
`;

const NavbarContainer = styled.nav`
  width: 100vw;
  height: 80px;
  background: ${colors.primary};
  display: flex;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  z-index: 99;
  box-shadow: 0px 2px 7px #000;
  @media (max-width: 500px) {
    justify-content: inherit;
    gap: 20px;
  }
`;

const Menu = styled.img`
  height: 30px;
  width: 30px;
  display: none;
  @media (max-width: 500px) {
    display: block;
  }
`;

const NavbarTitle = styled.h1`
  color: #fff;
  font-family: 'Monoton', cursive;
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 30px;
  cursor: pointer;
`;

const MobileNavList = styled.div`
  height: 100vh;
  width: 70%;
  background: ${colors.primary};
  position: fixed;
  z-index: 999;
`;

const MobileNavItems = styled.div`
  margin-top: 60px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
`;

const MobileNavItem = styled.div`
  color: #fff;
  font-size: 20px;
  padding: 0px 18px;
  letter-spacing: 0.4px;
  font-family: 'Roboto';
`;

const SearchWrapper = styled.div`
  position: relative;
  @media (max-width: 500px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  height: 40px;
  border-radius: 20px;
  width: 320px;
  border: 0;
  padding: 0 20px;
  &:focus {
    outline: none;
  }
`;

const SearchBtn = styled.img`
  height: 20px;
  width: 20px;
  position: absolute;
  right: 14px;
  top: 10px;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: block;
  @media (max-width: 500px) {
    display: none;
  }
`;

const NavItem = styled.span`
  color: #fff;
  font-family: 'Roboto';
`;

const NavLink = styled(Link)`
  text-decoration: none;
  transition: border-bottom 250ms ease-in-out;
  &:hover {
    border-bottom: 2px solid #fff;
    padding-bottom: 2px;
  }
  @media (max-width: 500px) {
    &:hover {
      border-bottom: 0px solid #fff;
    }
  }
`;

export default Navbar;
