type Props = React.SVGProps<SVGSVGElement>;

const UnsanitizedBucketIcon = ({ fill }: Props) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.25 13.6364C3.75 13.6364 3.31267 13.4959 2.938 13.2149C2.56267 12.9345 2.34167 12.5784 2.275 12.1466L0.5 0.681824H14.5L12.725 12.1466C12.6583 12.5784 12.4373 12.9345 12.062 13.2149C11.6873 13.4959 11.25 13.6364 10.75 13.6364H4.25Z"
        fill={fill ?? 'currentColor'}
      />
      <path
        d="M9.97917 7.125C9.29861 7.70833 8.47222 8 7.5 8C6.52778 8 5.70139 7.70833 5.02083 7.125C4.34028 6.54167 4 5.83333 4 5V3H6.33333V5C6.33333 5.28333 6.44534 5.52067 6.66934 5.712C6.89256 5.904 7.16944 6 7.5 6C7.83056 6 8.10783 5.904 8.33183 5.712C8.55506 5.52067 8.66667 5.28333 8.66667 5V3H11V5C11 5.83333 10.6597 6.54167 9.97917 7.125Z"
        className="unsanitized-inner-vector"
      />
    </svg>
  );
};

export default UnsanitizedBucketIcon;
