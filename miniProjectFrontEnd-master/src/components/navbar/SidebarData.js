import React from 'react'
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { AiFillHome } from 'react-icons/ai'
import { ImNewspaper } from "react-icons/im"
import { GoGraph, GoChecklist, GoSignOut } from "react-icons/go"
import { SiWhitesource } from "react-icons/si"
import { MdLocalHospital, MdPermContactCalendar } from "react-icons/md"
import { GiThermometerHot } from "react-icons/gi"


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },

    {
        title: 'Statistics',
        path: '/statistics',
        icon: <GoGraph />,
        cName: 'nav-text'
    }, {
        title: 'News',
        path: '/news',
        icon: <ImNewspaper />,
        cName: 'nav-text'

    }
    // ,
    // {
    //     title: 'Symptom checker',
    //     path: '/symptomchecker',
    //     icon: <GoChecklist />,
    //     cName: 'nav-text'

    // }
]
export const adminSideBarData = [{
    title: 'Manage users',
    path: '/manageusers',
    icon: <FaUsers />,
    cName: 'nav-text'

},
{
    title: 'Manage news sources',
    path: '/managenews',
    icon: <SiWhitesource />,
    cName: 'nav-text'

},
{
    title: 'Manage contacts',
    path: '/managecontacts',
    icon: <MdPermContactCalendar />,
    cName: 'nav-text'

}, {
    title: 'Medical centres',
    path: '/institutions',
    icon: <MdLocalHospital />,
    cName: 'nav-text'

}, {
    title: 'Patients',
    path: '/patients',
    icon: <FaUsers />,
    cName: 'nav-text'

}]
export const healthSideBarData = [{
    title: 'Manage patients',
    path: '/managepatients',
    icon: <FaUsers />,
    cName: 'nav-text'

},
{
    title: 'Manage Medical centres',
    path: '/manageinstitution',
    icon: <MdLocalHospital />,
    cName: 'nav-text'

},
{
    title: 'Contacts',
    path: '/contacts',
    icon: <MdPermContactCalendar />,
    cName: 'nav-text'

}]
export const patBscUsrSideBarData = [
    {
        title: 'Nearby Medical centres',
        path: '/nearbyinstitutions',
        icon: <MdLocalHospital />,
        cName: 'nav-text'
    },

    {
        title: 'Nearby patients',
        path: '/nearbypatients',
        icon: <GiThermometerHot />,
        cName: 'nav-text'
    },
    {
        title: 'Contacts',
        path: '/contacts',
        icon: <MdPermContactCalendar />,
        cName: 'nav-text'

    }
]
export const Exceptional = {
    logout: {
        title: 'Logout',
        path: '/signin',
        icon: <GoSignOut />,
        cName: 'nav-text'
    },
    profile: {
        title: 'Profile',
        path: '/profile',
        icon: <FaUserCircle />,
        cName: 'nav-text'

    }

}