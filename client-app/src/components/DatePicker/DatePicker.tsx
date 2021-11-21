import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { RefCallBack } from 'react-hook-form';
import './DatePicker.css';

type DatePickerProps = ReactDatePickerProps & {
  ref?: RefCallBack;
};

function DatePicker({ ref, ...props }: DatePickerProps) {
  return <ReactDatePicker ref={ref} {...props} />;
}

export default DatePicker;
