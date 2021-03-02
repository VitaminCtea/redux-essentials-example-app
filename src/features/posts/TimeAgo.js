import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''
    if (timestamp) timeAgo = `${ formatDistanceToNow(parseISO(timestamp)) } ago`
    return (
        <span title={ timestamp }>
            &nbsp; <i>{ timeAgo }</i>
        </span>
    )
}