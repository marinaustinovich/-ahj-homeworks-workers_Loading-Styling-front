import dayjs from 'dayjs';

const formatTime = (timestamp) => dayjs(timestamp).format('HH:mm DD.MM.YY');

export default formatTime;
