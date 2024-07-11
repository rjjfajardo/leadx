import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

const Loading = (props: CircularProgressProps) => {
  const { color = 'primary', size = 24, ...rest } = props;

  return <CircularProgress color={color} size={size} {...rest} />;
};

export default Loading;
