import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import { selectAllUsers } from '../users/usersSlice'
import { selectAllNotifications, allNotificationsRead } from './notificationsSlice'

export const NotificationsList = () => {
    const dispatch = useDispatch()
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)

    useEffect(() => {
        dispatch(allNotificationsRead())
    })
    
    const renderedNotifications = notifications.map(notification => {
        const timeAgo = formatDistanceToNow(parseISO(notification.date))
        const user = users.find(user => user.id === notification.user) || { name: 'Unknown User' }
        const notificationClassName = classnames('notification', { new: notification.isNew })
        return (
            <div key={ notification.id } className={ notificationClassName }>
                <div>
                    <b>{ user.name }</b> { notification.message }
                </div>
                <div title={ notification.date }>
                    <i>{ timeAgo } ago</i>
                </div>
            </div>
        )
    })
    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            { renderedNotifications }
        </section>
    )
}