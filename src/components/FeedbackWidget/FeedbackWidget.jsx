import { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

import css from './FeedbackWidget.module.scss';

const FeedbackWidget = () => {
  const [feedbacks, setFeedbacks] = useState({ good: 0, neutral: 0, bad: 0 });

  const onLeaveFeedback = name => {
    setFeedbacks(prevState => {
      const value = prevState[name];

      return { ...prevState, [name]: value + 1 };
    });
  };

  const total = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  const countPositiveFeedbackPercentage = propName => {
    if (!total) {
      return 0;
    }
    const value = feedbacks[propName];
    const result = Math.round((value * 100) / total);
    return Number(result);
  };
  const statePropNames = Object.keys(feedbacks);
  const { good, neutral, bad } = feedbacks;

  const positivePercentage = countPositiveFeedbackPercentage('good');

  return (
    <>
      <Section className={css.wrapper} title={'Please leave feedback'}>
        <FeedbackOptions
          options={statePropNames}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      {!!total ? (
        <Section className={css.wrapper} title={'Statistics'}>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
};

export default FeedbackWidget;
