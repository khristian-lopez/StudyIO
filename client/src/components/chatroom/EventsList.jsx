import React, {useState} from 'react';
import EventComponent from './EventComponent.jsx';
import './EventsList.scss';

let EventsList = (props) => {
  const [events, setEvents] = useState([{body: 'First Event'}, {body: 'Second Event'}, {body: 'Third Event'}])

  return (
    <div id='EventsList'>
      <div>Upcoming Events</div>
      <div>
        {events.map(event => <EventComponent {...event}/>)}
      </div>
    </div>
  )
}

export default EventsList;