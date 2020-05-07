import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NotificationsModal from 'components/NotificationsModal'
import Badge from '@material-ui/core/Badge'

const playlistOrderNotificationText = `The C13 “Binge Mode” player now supports publishing your playlist in chronological order.  Choose your playlist order, either Serial (start from the beginning) or Latest (start from the latest episode and work your way back).  You make the call! Simply choose the “Playlist Order” in the player builder, and you’ll be off and running.`

// TODO: get notifications from API
const notifications = [
  { timestamp: 1583962083238, id: '1', title: 'Enhanced Playlists are here!', text: playlistOrderNotificationText },
  {
    timestamp: 1583962083238,
    id: '2',
    title: '“Mixtape” Playlists are here!',
    text:
      "You can use the C13 “Binge Mode” player to create your own custom playlists: a “best of” or “mixtape” of your franchise(s). If you're interested, please drop us a line: analytics@cadence13.com and we'll be happy to help you create your custom playlist!"
  },
  {
    timestamp: 1576528537885,
    id: '3',
    title: 'New download sources are available!',
    text:
      'We have added tracking support for new sources that include: Apple Watch, Apple Podcasts (new desktop app on macOS Catalina), Apple HomePod, Pandora, Luminary, Radio.com, Amazon Fire Tablets, Amazon Silk Browser, Roku, Sonos'
  },
  {
    timestamp: 1566593072308,
    id: '4',
    title: 'The C13 dashboard is now mobile friendly! ',
    text:
      'The C13 dashboard is now mobile friendly! You can view the C13 dashboard on your favorite mobile device and stay up to date on your podcast’s performance even while you’re on the go. Please be sure to let us know what kind device you’re using if you run into any display issues.  Enjoy!'
  },
  {
    timestamp: 1566593072308,
    id: '5',
    title: 'Welcome to the new Notification Center!',
    text:
      'This will be the home of all new feature announcements, tips, tricks and anything else that will help improve your dashboard experience. Be sure to keep an eye out for new notifications to stay up to date. Thanks for clicking and reading!'
  }
]

let numUnreadNotifications = notifications.length

// get local storage, figure out how many notifications defined above are 'unread'
//
if (localStorage) {
  let notificationsLastViewed = localStorage.getItem('c13-notifications-last-viewed')
  if (notificationsLastViewed) {
    notifications.forEach(n => {
      if (n.timestamp <= +notificationsLastViewed) {
        numUnreadNotifications--
      }
    })
  }
}

const SidebarNotifications = ({ icon, text, onClick, open }) => {
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(numUnreadNotifications)
  const [notificationList, setNotifications] = useState(notifications)
  const Icon = icon

  const toggleNotificationsModal = e => {
    if (e) {
      e.stopPropagation()
    }
    setShowNotificationsModal(!showNotificationsModal)
    setUnreadNotificationsCount(0)
    localStorage.setItem('c13-notifications-last-viewed', Date.now())
  }
  return (
    <ListItem button onClick={toggleNotificationsModal}>
      <ListItemIcon>
        <Badge variant={open ? 'standard' : 'dot'} badgeContent={unreadNotificationsCount} color="secondary">
          <Icon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary={text} />
      <NotificationsModal
        title={`Notifications`}
        show={showNotificationsModal}
        notifications={notifications}
        handleHide={toggleNotificationsModal}
      />
    </ListItem>
  )
}

export default SidebarNotifications
