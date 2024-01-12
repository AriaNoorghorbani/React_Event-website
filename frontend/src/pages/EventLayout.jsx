import { Outlet } from "react-router-dom"

import EventNavigator from '../components/EventsNavigation'

export default function EventLayout(){
    return <>
    <EventNavigator />
    <Outlet /></>
}