// // TODO: Will use this later

// import StatusChip from '@/components/parts/StatusChip';
// import { LeadForFindOne } from '@/store/api/gen/leads';
// import {
//   deepOrange,
//   green,
//   grey,
//   lightBlue,
//   orange,
//   purple,
//   red,
//   yellow,
// } from '@mui/material/colors';
// import Stack from '@mui/material/Stack';

// const LeadTags = {
//   DO_NOT_CALL: 'DO_NOT_CALL',
//   VERIFIED: 'VERIFIED',
//   CALL_BACK: 'CALL_BACK',
//   HOT_LEAD: 'HOT_LEAD',
//   SOLD: 'SOLD',
//   RESOLD: 'RESOLD',
//   UNVERIFIED: 'UNVERIFIED',
//   INTERESTED: 'INTERESTED',
// };

// export const TAG_THEME_COLORS = {
//   RED: red[800],
//   GREY: grey[600],
//   GREEN: green[800],
//   YELLOW: yellow[800],
//   ORANGE: orange[800],
//   PURPLE: purple[800],
//   LIGHT_GREY: grey[400],
//   DARK_GREY: grey[800],
//   LIGHT_BLUE: lightBlue[800],
//   DEEP_ORANGE: deepOrange[800],
// } as const

// export const getLeadStatus = (lead: LeadForFindOne): JSX.Element => {
//   switch (lead.tag.label) {
//     case LeadTags.UNVERIFIED: {
//       return (
//         <StatusChip
//           label={
//             <Stack direction="row" alignItems="center" gap={0.5}>
//               {/* pending icon */}
//               {lead.tag.label}
//             </Stack>
//           }
//           color={TAG_THEME_COLORS.DARK_GREY}
//           sx={{ color: 'white' }}
//         />
//       );
//     }
//     // case LeadTags.DO_NOT_CALL: {
//     //   return (
//     //     <StatusChip
//     //       label={
//     //         <Stack direction="row" alignItems="center" gap={0.5}>
//     //           {/* pending icon */}
//     //           {lead.tag.label}
//     //         </Stack>
//     //       }
//     //       color={lead.tag.colorValue!}
//     //       sx={{ color: 'white' }}
//     //     />
//     //   );
//     // }
//     // case LeadTags.VERIFIED: {
//     //   return (
//     //     <StatusChip
//     //       label={
//     //         <Stack direction="row" alignItems="center" gap={0.5}>
//     //           {/* pending icon */}
//     //           {lead.tag.label}
//     //         </Stack>
//     //       }
//     //       color={lead.tag.colorValue!}
//     //       sx={{ color: 'white' }}
//     //     />
//     //   );
//     // }
//     // case LeadTags.CALL_BACK: {
//     //   return (
//     //     <StatusChip
//     //       label={
//     //         <Stack direction="row" alignItems="center" gap={0.5}>
//     //           {/* pending icon */}
//     //           {lead.tag.label}
//     //         </Stack>
//     //       }
//     //       color={lead.tag.colorValue!}
//     //       sx={{ color: 'white' }}
//     //     />
//     //   );
//     // }
//     // case LeadTags.HOT_LEAD: {
//     //   return (
//     //     <StatusChip
//     //       label={
//     //         <Stack direction="row" alignItems="center" gap={0.5}>
//     //           {/* pending icon */}
//     //           {lead.tag.label}
//     //         </Stack>
//     //       }
//     //       color={lead.tag.colorValue!}
//     //       sx={{ color: 'white' }}
//     //     />
//     //   );
//     // }
//     // case LeadTags.SOLD: {
//     //   return (
//     //     <StatusChip
//     //       label={
//     //         <Stack direction="row" alignItems="center" gap={0.5}>
//     //           {/* pending icon */}
//     //           {lead.tag.label}
//     //         </Stack>
//     //       }
//     //       color={lead.tag.colorValue!}
//     //       sx={{ color: 'white' }}
//     //     />
//     //   );
//     // }
//     // case LeadTags.RESOLD: {
//     //   return (
//     //     <StatusChip
//     //       label={
//     //         <Stack direction="row" alignItems="center" gap={0.5}>
//     //           {/* pending icon */}
//     //           {lead.tag.label}
//     //         </Stack>
//     //       }
//     //       color={lead.tag.colorValue!}
//     //       sx={{ color: 'white' }}
//     //     />
//     //   );
//     // }
//     // case LeadTags.RESOLD: {
//     //   return (
//     //     <StatusChip
//     //       label={
//     //         <Stack direction="row" alignItems="center" gap={0.5}>
//     //           {/* pending icon */}
//     //           {lead.tag.label}
//     //         </Stack>
//     //       }
//     //       color={lead.tag.colorValue!}
//     //       sx={{ color: 'white' }}
//     //     />
//     //   );
//     // }
//     default:
//       return <></>;
//   }
// };
