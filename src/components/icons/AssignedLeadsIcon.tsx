type Props = React.SVGProps<SVGSVGElement>;

const AssignedLeadsIcon = ({ fill }: Props) => {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 12C6.17 12 5.39 11.8425 4.66 11.5275C3.93 11.2125 3.295 10.785 2.755 10.245C2.215 9.705 1.7875 9.07 1.4725 8.34C1.1575 7.61 1 6.83 1 6C1 5.17 1.1575 4.39 1.4725 3.66C1.7875 2.93 2.215 2.295 2.755 1.755C3.295 1.215 3.93 0.7875 4.66 0.4725C5.39 0.1575 6.17 0 7 0C7.83 0 8.61 0.1575 9.34 0.4725C10.07 0.7875 10.705 1.215 11.245 1.755C11.785 2.295 12.2125 2.93 12.5275 3.66C12.8425 4.39 13 5.17 13 6C13 6.83 12.8425 7.61 12.5275 8.34C12.2125 9.07 11.785 9.705 11.245 10.245C10.705 10.785 10.07 11.2125 9.34 11.5275C8.61 11.8425 7.83 12 7 12ZM7 10.8C8.34 10.8 9.475 10.335 10.405 9.405C11.335 8.475 11.8 7.34 11.8 6C11.8 4.66 11.335 3.525 10.405 2.595C9.475 1.665 8.34 1.2 7 1.2C5.66 1.2 4.525 1.665 3.595 2.595C2.665 3.525 2.2 4.66 2.2 6C2.2 7.34 2.665 8.475 3.595 9.405C4.525 10.335 5.66 10.8 7 10.8ZM7 9.6C6 9.6 5.15 9.25 4.45 8.55C3.75 7.85 3.4 7 3.4 6C3.4 5 3.75 4.15 4.45 3.45C5.15 2.75 6 2.4 7 2.4C8 2.4 8.85 2.75 9.55 3.45C10.25 4.15 10.6 5 10.6 6C10.6 7 10.25 7.85 9.55 8.55C8.85 9.25 8 9.6 7 9.6ZM7 8.4C7.66 8.4 8.225 8.165 8.695 7.695C9.165 7.225 9.4 6.66 9.4 6C9.4 5.34 9.165 4.775 8.695 4.305C8.225 3.835 7.66 3.6 7 3.6C6.34 3.6 5.775 3.835 5.305 4.305C4.835 4.775 4.6 5.34 4.6 6C4.6 6.66 4.835 7.225 5.305 7.695C5.775 8.165 6.34 8.4 7 8.4ZM7 7.2C6.67 7.2 6.3875 7.0825 6.1525 6.8475C5.9175 6.6125 5.8 6.33 5.8 6C5.8 5.67 5.9175 5.3875 6.1525 5.1525C6.3875 4.9175 6.67 4.8 7 4.8C7.33 4.8 7.6125 4.9175 7.8475 5.1525C8.0825 5.3875 8.2 5.67 8.2 6C8.2 6.33 8.0825 6.6125 7.8475 6.8475C7.6125 7.0825 7.33 7.2 7 7.2Z"
        fill={fill ?? 'currentColor'}
      />
      <path
        d="M6.42188 12.75C6.13021 12.75 5.89062 12.6406 5.70312 12.4219C5.51562 12.2031 5.44792 11.9479 5.5 11.6562L5.6875 10.5312C5.77083 10.0833 5.98177 9.71615 6.32031 9.42969C6.65885 9.14323 7.05208 9 7.5 9C7.95833 9 8.35677 9.14323 8.69531 9.42969C9.03385 9.71615 9.24479 10.0833 9.32812 10.5312L9.51562 11.6562C9.56771 11.9479 9.5 12.2031 9.3125 12.4219C9.125 12.6406 8.88542 12.75 8.59375 12.75H6.42188ZM1.9375 13.3594C1.69792 13.3698 1.49219 13.3229 1.32031 13.2188C1.14844 13.1146 1.03646 12.9531 0.984375 12.7344C0.963542 12.6406 0.958333 12.5469 0.96875 12.4531C0.979167 12.3594 1.00521 12.2708 1.04688 12.1875C1.04688 12.1979 1.04167 12.1771 1.03125 12.125C1.01042 12.1042 0.958333 11.9792 0.875 11.75C0.854167 11.625 0.869792 11.5052 0.921875 11.3906C0.973958 11.276 1.04167 11.1771 1.125 11.0938L1.15625 11.0625C1.17708 10.8646 1.25781 10.6979 1.39844 10.5625C1.53906 10.4271 1.71354 10.3594 1.92188 10.3594C1.95312 10.3594 2.05208 10.3802 2.21875 10.4219L2.26562 10.4062C2.31771 10.3542 2.38542 10.3151 2.46875 10.2891C2.55208 10.263 2.64062 10.25 2.73438 10.25C2.84896 10.25 2.95052 10.2682 3.03906 10.3047C3.1276 10.3411 3.19792 10.3958 3.25 10.4688C3.26042 10.4688 3.26823 10.4714 3.27344 10.4766C3.27865 10.4818 3.28646 10.4844 3.29688 10.4844C3.44271 10.4948 3.57031 10.5391 3.67969 10.6172C3.78906 10.6953 3.86979 10.8021 3.92188 10.9375C3.94271 11.0104 3.95052 11.0807 3.94531 11.1484C3.9401 11.2161 3.92708 11.2812 3.90625 11.3438C3.90625 11.3542 3.91146 11.375 3.92188 11.4062C3.99479 11.4792 4.05208 11.5599 4.09375 11.6484C4.13542 11.737 4.15625 11.8281 4.15625 11.9219C4.15625 11.9635 4.125 12.0729 4.0625 12.25C4.05208 12.2708 4.05208 12.2917 4.0625 12.3125L4.09375 12.5625C4.09375 12.7813 4.0026 12.9688 3.82031 13.125C3.63802 13.2812 3.41667 13.3594 3.15625 13.3594H1.9375ZM12.5 13.375C12.1562 13.375 11.862 13.2526 11.6172 13.0078C11.3724 12.763 11.25 12.4688 11.25 12.125C11.25 12 11.2682 11.8828 11.3047 11.7734C11.3411 11.6641 11.3906 11.5573 11.4531 11.4531L11.0156 11.0625C10.9115 10.9792 10.8932 10.875 10.9609 10.75C11.0286 10.625 11.125 10.5625 11.25 10.5625H12.5C12.8438 10.5625 13.138 10.6849 13.3828 10.9297C13.6276 11.1745 13.75 11.4688 13.75 11.8125V12.125C13.75 12.4688 13.6276 12.763 13.3828 13.0078C13.138 13.2526 12.8438 13.375 12.5 13.375ZM0 16.5V15.5156C0 15.0573 0.231771 14.6901 0.695313 14.4141C1.15885 14.138 1.76042 14 2.5 14C2.63542 14 2.76562 14.0026 2.89062 14.0078C3.01562 14.013 3.13542 14.026 3.25 14.0469C3.10417 14.2552 2.99479 14.4792 2.92188 14.7188C2.84896 14.9583 2.8125 15.2135 2.8125 15.4844V16.5H0ZM3.75 16.5V15.4844C3.75 14.8073 4.09635 14.2604 4.78906 13.8438C5.48177 13.4271 6.38542 13.2188 7.5 13.2188C8.625 13.2188 9.53125 13.4271 10.2188 13.8438C10.9062 14.2604 11.25 14.8073 11.25 15.4844V16.5H3.75ZM12.5 14C13.25 14 13.8542 14.138 14.3125 14.4141C14.7708 14.6901 15 15.0573 15 15.5156V16.5H12.1875V15.4844C12.1875 15.2135 12.1536 14.9583 12.0859 14.7188C12.0182 14.4792 11.9167 14.2552 11.7812 14.0469C11.8958 14.026 12.013 14.013 12.1328 14.0078C12.2526 14.0026 12.375 14 12.5 14Z"
        fill={fill ?? 'currentColor'}
      />
    </svg>
  );
};

export default AssignedLeadsIcon;
