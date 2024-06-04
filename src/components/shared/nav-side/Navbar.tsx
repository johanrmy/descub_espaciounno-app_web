import React from 'react';
import NavbarList from '@components/shared/nav-side/NavbarList';
import NavbarItem from '@components/shared/nav-side/NavbarItem';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiBarcodeReader } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import { TbHammer, TbLockAccess } from "react-icons/tb";
import classNames from 'classnames';
import { useAuth } from '@auth/AuthContext';

interface NavbarProps{
    colorIcons?: string,
}

const Navbar: React.FC<NavbarProps> = ({colorIcons}) => {
    
    const {logOut, user} = useAuth()
    const username = `${user?.full_name}` || 'Admin'
    const profile_photo = `${user?.profile_photo}` || 'photo'

    const iconClass = classNames(
        'w6',
        'h6',
        { [colorIcons ? colorIcons : 'text-unno_sc-500']: colorIcons }
    );

    return (
        <NavbarList onLogout={logOut} userName={username} profile_photo={profile_photo}>
            <NavbarItem href='/dashboard' title='Dashboard' icon={<MdOutlineSpaceDashboard className={iconClass}/>} />
            <NavbarItem href='/' title='Tablas' icon={<TbHammer className={iconClass}/>}>
                <NavbarItem href='/murales' title='Murales' />
                <NavbarItem href='/artistas' title='Artistas' />
                <NavbarItem href='/partnerships' title='Partnership' />
            </NavbarItem>
            <NavbarItem href='/' title='Cupones' icon={<RiCoupon2Line className={iconClass}/>}>
                <NavbarItem href='/paquetes' title='Panel' />
                <NavbarItem href='/generar-cupon' title='Generar cupones' />
            </NavbarItem>
            <NavbarItem href='/lector' title='Lector' icon={<BiBarcodeReader className={iconClass}/>} />
            <NavbarItem href='/' title='Accesos' icon={<TbLockAccess className={iconClass}/>}>
                <NavbarItem href='/usuarios' title='Usuarios' />
                <NavbarItem href='/generar-acceso ' title='Generar acceso' />
            </NavbarItem>
        </NavbarList>
    );
};


export default Navbar;