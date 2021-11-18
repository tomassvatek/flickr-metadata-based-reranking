import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

type DatePickerProps = ReactDatePickerProps;

function DatePicker(props: DatePickerProps) {
  return <ReactDatePicker {...props} />;
}

export default DatePicker;
