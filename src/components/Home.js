import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import PollCardList from "./PollCardList";

const Home = () => {
  const authedUserAnswers = useSelector(
    (state) => ({
      ids: Object.keys(state.users[state.authedUser].answers),
    }),
    shallowEqual
  );

  const polls = useSelector(
    (state) => ({
      answered: Object.values(state.questions)
        .filter((poll) => authedUserAnswers.ids.includes(poll.id))
        .sort((a, b) => b.timestamp - a.timestamp),
      unanswered: Object.values(state.questions)
        .filter((poll) => !authedUserAnswers.ids.includes(poll.id))
        .sort((a, b) => b.timestamp - a.timestamp),
    }),
    shallowEqual
  );

  console.log("rendering home");

  return (
    <div className='text-center'>
    <Tabs
      fill
      variant="tabs"
      defaultActiveKey="unanswered"
      id="tabs"
      className="mb-3"
      style={{ margin: "auto", width: "40%" }}
    >
      <Tab eventKey="unanswered" title="Unanswered">
      {polls.unanswered.map(poll => (
            <PollCardList answered={false} id={poll.id} key={poll.id} />
          ))}
      </Tab>
      <Tab className="text-center" eventKey="answered" title="Answered">
      {polls.answered.map(poll => (
            <PollCardList answered={true} id={poll.id} key={poll.id} />
          ))}
      </Tab>
    </Tabs>
    </div>
  );
};

export default Home;
