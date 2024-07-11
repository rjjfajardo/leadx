import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import InfoDisplay from '@/components/parts/InfoDisplay';
import { BookFormValues } from '@/components/templates/Leads/LeadCreateDialog/BookForm/hooks';
import { BookDetail } from '@/components/templates/Leads/LeadCreateDialog/hooks';

export const BookAccordion = ({ book }: { book: BookFormValues }) => {
  const [firstBookDetail, ...restOfBookDetail] = book?.details || [];

  return (
    <Accordion
      sx={{
        boxShadow: 0,
        border: 1,
        borderColor: 'divider',
        flexGrow: 1,
      }}
    >
      <Summary title={book?.title} isbn={firstBookDetail?.isbn} />
      <AccordionDetails>
        <InfoDisplay
          label="Book Link"
          values={[book.bookLink ?? '']}
          sx={{ mb: 1 }}
        />
        <BookPublisher
          bookFormat={firstBookDetail?.bookFormat}
          publisherName={firstBookDetail?.publisher?.name}
          year={firstBookDetail?.year}
        />
        {restOfBookDetail.length > 0 && (
          <Typography fontSize="small" sx={{ mt: 3 }}>
            Other Details:
          </Typography>
        )}
        <Stack gap={2} mt={1}>
          {restOfBookDetail?.map((_detail, index) => (
            <Stack key={`${_detail.isbn}-${index}`} gap={1}>
              <InfoDisplay label="ISBN" values={[_detail?.isbn ?? '-']} />
              <BookPublisher
                bookFormat={_detail?.bookFormat}
                publisherName={_detail?.publisher?.name}
                year={_detail?.year}
              />
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export const BookDetailAccordion = ({ detail }: { detail: BookDetail }) => {
  return (
    <Accordion
      sx={{
        boxShadow: 0,
        border: 1,
        borderColor: 'divider',
        flexGrow: 1,
      }}
    >
      <Summary isbn={detail?.isbn} />
      <AccordionDetails sx={{ pt: 0 }}>
        <BookPublisher
          bookFormat={detail?.bookFormat}
          publisherName={detail.publisher?.name}
          year={detail?.year}
        />
      </AccordionDetails>
    </Accordion>
  );
};

type BookPublisher = {
  bookFormat?: string;
  publisherName?: string;
  year?: number;
};

const BookPublisher = ({ bookFormat, publisherName, year }: BookPublisher) => {
  return (
    <Stack
      gap={1}
      direction="row"
      sx={{
        '&>*': { flex: 1 },
      }}
    >
      <InfoDisplay
        label="Book Format"
        values={[bookFormat?.split('_').join(' ') ?? '-']}
      />
      <InfoDisplay label="Publisher" values={[publisherName ?? '-']} />
      <InfoDisplay
        label="Year Published"
        values={[year ? String(year) : '-']}
      />
    </Stack>
  );
};

const Summary = ({ title, isbn }: { title?: string; isbn?: string }) => {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{
        '& .MuiAccordionSummary-content': {
          display: 'flex',
          gap: 5,
          my: 0,
        },
        minHeight: '50px',
      }}
    >
      {title && (
        <InfoDisplay label="Title" values={[title ?? '-']} direction="row" />
      )}
      <InfoDisplay label="ISBN" values={[isbn ?? '-']} direction="row" />
    </AccordionSummary>
  );
};
