import PropTypes from 'prop-types';

import css from '../FeedbackWidget/FeedbackWidget.module.scss';

const Notification = ({ message }) => (
  <p className={css.notification}>{message}</p>
);

export default Notification;

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
