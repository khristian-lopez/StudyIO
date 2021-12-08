import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TopicCard from './componets/topicCard.jsx';

const mock = [{topic: 'test1', pic: 'url1', topic_id: 0},{topic: 'test2', pic: 'url2', topic_id: 1}]

const TopicsPage = (props) => {
  const [topics, setTopics] = useState(mock);
  const clickTopic = (id) => {
    console.log(id) // open room modal
  }

  return (
    <Container>
      Topics Page
      {topics.map((topic) => (
        <TopicCard
          topic={topic.topic}
          pic={topic.pic}
          key={topic.topic_id}
          clickHandler={() => clickTopic(topic.topic_id)}
        />
      ))}
    </Container>
  )
}

export default TopicsPage;